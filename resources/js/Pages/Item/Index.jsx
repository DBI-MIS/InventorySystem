
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { Alert} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head,Link, router} from "@inertiajs/react" ;
import SelectInput from "@/Components/SelectInput";
export default function Index({auth,items, queryParams = null, success}) {

const [open, setOpen] = useState(true);
  
// useEffect(() => {
//   const timer = setTimeout(() => {
//     setOpen(false); // Hide the success
//   }, 2000);

//   return () => clearTimeout(timer); // Clear the timeout 
// }, [success]);

console.log(items)
queryParams = queryParams || {};
  const searchFieldChanged = (name, value, ) => {

    const lowerCaseName = name.toLowerCase();

    if (name === "brand_id" || name === 'category_id') {
      if (value) {
        queryParams[name] = value;
      } else {
        delete queryParams[name];
      }
    } else {
      if (value) {
        queryParams[lowerCaseName] = value;
      } else {
        delete queryParams[lowerCaseName];
      }
    }

    // if(value){
    //   queryParams[lowerCaseName] = value;
    // }
    // else{
    //   delete queryParams[lowerCaseName];
    // }

    // change the url path everytime option changes
    router.get(route('item.index'), queryParams)
  };

  const onKeyPress = (name, e) => {

    const lowerCaseName = name.toLowerCase();

    if(e.key !== 'Enter') return;

    searchFieldChanged(lowerCaseName, e.target.value);
  }

  const showAll = ()=>{

    if(value == 'all'){

    }
  }
// sorting functions
  const sortChanged = (name) => {
    if(name === queryParams.sort_field) {
      if(queryParams.sort_direction === 'desc'){
        queryParams.sort_direction ='asc'
      }else{
        queryParams.sort_direction = 'desc'

      }
    }
    // sorting the different fields
    else{
        queryParams.sort_field = name;
        queryParams.sort_direction = "desc";
    }
    router.get(route('item.index'), queryParams)
  }

  // const uniqueCategories = Array.from(new Set(items.data.map(category => category.id)))
  //       .map(uniqueId => items.data.find(category => category.id === uniqueId));

const deleteItem = (item) => {
  // console.log(item)
  if(!window.confirm("Are you sure you want to delete  the item")){
    return;
  }
  router.delete(route('item.destroy', item.id))
}


  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">Inventory</h2>   
      </div>
  }
    >
      {/* head displayed together with the appname */}
       <Head title="Items" />
      <div className="py-5">
          <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 relative">
            <div className="max-w-5/6">
              {success && (
                  <Alert
                  className=" absolute z-50 w-11/12 px-4 py-4 mb-5 rounded text-slate-800 bg-green-100 ring-2 ring-green-800"
                  open={open}
                  onClose={() => setOpen(false)}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                  }}
                > {success}</Alert>
              )}
            </div>
         
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <div className="w-full flex flex-row justify-between items-center mb-2">
                          <div>
                          <Link href={route('item.create')} className="flex flex-nowrap gap-2 font-semibold bg-blue-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-blue-700">
                 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg> New Item
            </Link></div>
                          <div className="flex flex-row items-center relative">
                          <div className="absolute pointer-events-none right-2"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                          </div>
                          {/* <SelectInput className="w-[300px] mx-2"
                          defaultValue={queryParams.category.id}
                            onChange={(e) => {
                            const value = e.target.value;
                            if (value === "reset") {
                            // Logic to reset the query parameter
                            searchFieldChanged('category.id', '');
                            } else {
                          searchFieldChanged('category.id', value);
                            }
                              }}
                                >
                                    <option value=" ">Select Category</option>
                                    <option value="reset">All</option>
                                    {uniqueCategories.map((item) => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))}
                                </SelectInput> */}


                          <TextInput  className="w-[500px]" 
                                  defaultValue={queryParams.name}
                                  placeholder="Search Item Name Here" 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                  
                                
                          </div>

                            
                          
                          </div>
                    
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="">
                              <TableHeading  className=""  name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>ID</TableHeading>
                              <TableHeading  className=""  name="sku"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Sku </TableHeading>
                                <TableHeading  className=""   name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Name</TableHeading>
                                <TableHeading  className=""   name="brand_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Brand</TableHeading>
                                <TableHeading className=""  name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Category</TableHeading>
                                <TableHeading  className=""  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Qty</TableHeading>
                                <div className="text-right">Actions</div>
                              </tr>
                            </thead>
                        
                            <tbody>
                              {items.data.map((item)=>(
                                   <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                      <td className="w-[50px] py-2">
                                          {item.id}
                                      </td>
                                      <td className="w-[200px] py-2 text-nowrap">
                                        {item.sku_prefix}-{item.sku}
                                      </td>
                                      <th className="w-[800px] py-2 text-gray-600  hover:underline">
                                        <Link href={route('item.show', item.id)}>
                                        {item.name}
                                        </Link>
                                      </th>
                                      <td className="w-[300px] py-2">{item.brand.name}</td>
                                      <td className="w-[300px] py-2">{item.category ? item.category.name : 'N/A'}</td>
                                      <td className="w-[100px] py-2 text-nowrap">{item.quantity} {item.uom} </td>
                                      <td className="w-[100px] py-2 text-nowrap">
                                          <div className="flex flex-row justify-end items-center">
                                              <Link href={route('item.edit', item.id)} 
                                              className="text-blue-600 mx-1 hover:text-gray-600"> 
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                  </svg>
                                              </Link>
                                              <button 
                                                  onClick={(e) =>deleteItem(item)}
                                                  className="text-red-600 mx-1 hover:text-gray-600"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                </svg>
                                              </button>
                                          </div>
                                    </td>
                                  </tr>
                              ))}
                            </tbody>
                        </table>
                      </div> 
                 </div>
                 {/* pagination not visible */}
                 <Pagination links={items.meta.links} />
              </div>
          </div>
      </div>
    </AuthenticatedLayout>
  )
}
