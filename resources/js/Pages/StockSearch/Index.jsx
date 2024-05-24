import Pagination from '@/Components/Pagination'
import TableHeading from '@/Components/TableHeading'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import React from 'react'

export default function Index({ auth, stocksearch, totalitems, totalitems1, paginationLinks, queryParams = null }) {

  queryParams = queryParams || {};

  const searchFieldChanged = (name, value, ) => {
    if(value){
      queryParams[name] = value;
    }
    else{
      delete queryParams[name];
    }
    // change the url path everytime option changes
    router.get(route('stocksearch.index'), queryParams)
  };

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
};
const sortChanged = (name) => { 
  if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
          queryParams.sort_direction = 'desc';
      }else {
          queryParams.sort_direction = "asc";
      }
  } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
  }
  router.get(route("stocksearch.index"), queryParams)
};
  return (
    <Authenticated
    user={auth.user}
    header={
      <div className="flex justify-between categories-center relative">
        <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">Search Item</h2>
      
     
      </div>
  }
    >
      
      <Head title="Delivery Receipt" />
    <div className="py-12">
        <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 ">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <div className="overflow-auto">

                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                  <tr className="text-nowrap ">
                                      <TableHeading className="pr-10" name="item"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>ITEM</TableHeading>
                                      <TableHeading className="pr-10" name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>QUANTITY</TableHeading>
                                  </tr>
                          </thead>
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                  <tr className="text-nowrap ">
                                        <th className="px-3 py-3 w-full" >
                                        <TextInput  className="w-[500px]" 
                                  defaultValue={queryParams.name}
                                  placeholder="Search Item Name Here" 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                        </th>
                                        
                                        <th className="px-3 py-3"></th>
                                        
                                        
                                  </tr>
                          </thead>
                          <tbody>
                            {totalitems.map((totalitem)=>(
                              <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={totalitems.name}>
                                <td className="px-3 py-2">{totalitem.name}</td>
                                <td className="px-3 py-2">{totalitem.total_quantity} {totalitem.uom}</td>
                              </tr>
                            ))}
                          </tbody>  
                  </table>

                  </div>
                </div>
                   <Pagination links={paginationLinks} />
            </div>
        </div>
    </div>
    </Authenticated>
  )
}
