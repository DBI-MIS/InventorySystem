import Pagination from '@/Components/Pagination'
import TableHeading from '@/Components/TableHeading'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import React from 'react'

export default function Index({ auth, deliverables, items, queryParams = null, }) {

  queryParams = queryParams || {};

  const searchFieldChanged = (name, value, ) => {
    if(value){
      queryParams[name] = value;
    }
    else{
      delete queryParams[name];
    }
    // change the url path everytime option changes
    router.get(route('deliverables.index'), queryParams)
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
  router.get(route("deliverables.index"), queryParams)
};

const nameQuantities = {};

items.data.forEach((item) => {
  if (nameQuantities[item.name]) {
    // If the name exists in nameQuantities, add the quantity to the existing total
    nameQuantities[item.name].total += item.quantity;
  } else {
    // If the name is not yet in nameQuantities, add it with the quantity
    nameQuantities[item.name] = { total: item.quantity, processed: false };
  }
});

  return (
    <Authenticated
    user={auth.user}
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
                                      <TableHeading className="pr-10" name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>ID</TableHeading>
                                      <TableHeading className="pr-10" name="item"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>ITEM</TableHeading>
                                      <TableHeading className="pr-10" name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>QUANTITY</TableHeading>
                                  </tr>
                          </thead>
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                  <tr className="text-nowrap ">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3 w-full" >
                                          <TextInput  className="max-w-full" defaultValue={queryParams.name} placeholder="Item Name " onBlur={(e) => searchFieldChanged('name', e.target.value)} onKeyPress={(e) => onKeyPress('name', e )}/>
                                        </th>
                                        
                                        <th className="px-3 py-3"></th>
                                        
                                        
                                  </tr>
                          </thead>
                          <tbody>
                            {items.data.filter((item, index, self) => index === self.findIndex((t) => (
                              t.name === item.name
                            ))
                          )
                          .map((item)=>(
                              <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                <td className="px-3 py-2">{item.id}</td>
                                <td className="px-3 py-2">{item.name}</td>
                                <td className="px-3 py-2">{nameQuantities{item.quantity}}</td>
                              </tr>
                            ))}
                          </tbody>  
                  </table>

                  </div>
                </div>
                <Pagination links={items.meta.links} />
            </div>
        </div>
    </div>
    </Authenticated>
  )
}
