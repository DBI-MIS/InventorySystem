
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import { Alert} from "@material-tailwind/react";
// import React, { useEffect, useRef, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head,Link, router} from "@inertiajs/react" ;
export default function Index({auth,receivingItems,receiving_item_ids,reference_nos,success,items,queryParams}) {
console.log(receivingItems)
console.log(reference_nos)
console.log( receiving_item_ids)
// foreach ( reference_nos as  reference_no) {
//   return  reference_nos;
// }
queryParams = queryParams || {};
  const searchFieldChanged = (name, value, ) => {
    if(value){
      queryParams[name] = value;
    }
    else{
      delete queryParams[name];
    }
    // change the url path everytime option changes
    router.get(route('item.index'), queryParams)
  };

  const onKeyPress = (name, e) => {
    if(e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
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
  router.get(route('receivingItem.index'), queryParams)
}
console.log(receivingItems)
  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <div className="flex justify-between receivings-center">
        <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Receiving Item</h2>
              <Link href={route('receivingItem.create')} className="flex flex-nowrap gap-2 font-semibold bg-green-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-green-700">
                 Add New
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
            </Link>
             
             
   
      </div>
  }
    >
      {/* head displayed together with the appname */}
       <Head title="Receivings" />
      <div className="py-12">
          <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 relative">
          {success && (
                 <Alert
                 className=" absolute z-50 px-4 py-4 mb-5 rounded text-slate-800 bg-green-100 ring-2 ring-green-800"
                 open={open}
                 onClose={() => setOpen(false)}
                 animate={{
                   mount: { y: 0 },
                   unmount: { y: 100 },
                 }}
               > {success}</Alert>
            )}
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                              <TableHeading name="id" className="pr-10" >ID</TableHeading>
                              <TableHeading name="item_id"  className="pr-10" >ITEM ID</TableHeading>
                              <TableHeading name="ref_id"  className="pr-10" >Ref ID</TableHeading>
                              {/* <TableHeading name="item_id"  className="pr-10" >Receiving Id</TableHeading> */}
                              <TableHeading name="item_id"  className="pr-10" >Reference No</TableHeading>
                              <TableHeading name="item_id"  className="pr-10" >LIST OF IDS</TableHeading>
                              </tr>
                            </thead>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                
                                <th className="px-3 py-3 text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                         
                              {receivingItems.data.map((receivingItem)=>(
                              
                                   <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={receivingItem.id}>
                                      <td className="px-3 py-2">
                                      <Link href={route('receivingItem.show', receivingItem.id)}>
                                      {receivingItem.id}
                                        </Link>
                                         
                                      </td>
                                      <td className="px-3 py-2">
                                          {receivingItem.item_id}
                                      </td>
                                      <td className="px-3 py-2">
                                          {receivingItem.ref_id}
                                      </td>
                                      <td className="px-3 py-2">
                                          {receivingItem.reference_no}
                                      </td>
                                      <td className="px-3 py-2">
                                          {receivingItem.receiving_item_ids}
                                      </td>
                                     
                                     
                                  </tr>
                              ))}
                            </tbody>
                        </table>
                      </div> 
                      
              
                 </div>
                 {/* pagination not visible */}
                 <Pagination links={receivingItems.meta.links} />
              </div>

              {/*  */}
{/*              
              <div>
                {receivingItems.data.map((receivingItem) => (
                  <div>
                    <h2>Id: {receivingItem.id}</h2>

                    {receivingItem.
                    reference_no.data.map((ref_no) => (
                      <div>
                        <h2>ref_no {ref_no}</h2>
                      </div>
                    ))}

                    <hr />
                  </div>
                ))}
            </div> */}
             {/* <div className="bg-white mt-10 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                              <TableHeading  className="pr-10"  name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>ID</TableHeading>
                              <TableHeading  className="pr-10"  name="sku"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Sku </TableHeading>
                                <TableHeading  className="pr-10"   name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Name</TableHeading>
                                <TableHeading  className="pr-2"   name="brand_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Brand</TableHeading>
                                <TableHeading className="pr-10"  name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Category</TableHeading>
                                <TableHeading  className="pr-10"  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Qty</TableHeading>
                                <TableHeading className="px-3 py-3 text-right">Actions</TableHeading>
                              </tr>
                            </thead>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3 w-full" >
                                  <TextInput  className="max-w-full" 
                                  defaultValue={queryParams.name}
                                  placeholder="Item Name " 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                </th>
                              <th className="px-3 py-3">
                              </th>
                            
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3 text-right"></th>
                              
                              </tr>
                            </thead>
                            <tbody>
                              {receiving_item_ids.map((receiving_item_id)=>(
                                   <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={receiving_item_id.id}>
                                      <td className="px-3 py-2">
                                          {receiving_item_id.id}
                                      </td>
                                      <td className="px-3 py-2">
                                      
                                        {receiving_item_id.sku}
                                      </td>
                                      <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                        <Link href={route('item.show', receiving_item_id.id)}>
                                        {receiving_item_id.name}
                                        </Link>
                                      </th>
                                      <td className="px-3 py-2">{receiving_item_id.brand_id}</td>
                                      <td className="px-3 py-2">{receiving_item_id.category_id}</td>
                                      <td className="px-3 py-2">{receiving_item_id.quantity} {receiving_item_id.uom} </td>
                                      <td className="px-3 py-2 text-nowrap">
                                          <div className="flex">
                                              <Link href={route('item.edit', receiving_item_id.id)} className="p-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white hover: rounded-full hover:underline mx-1"> 
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                  </svg>
                                              </Link>
                                              <button 
                                                  onClick={(e) =>deleteItem(receiving_item_id)}
                                                  className="font-medium text-red-600 p-2 hover:bg-red-600 hover:text-white hover: rounded-full  hover:underline mx-1"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
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
                 
              </div> */}
              <div>
                {/* add form */}
                     
              
                     
                  </div>
          </div>
          {/* <button onClick={()=>handleAdd()}
             className="font-medium text-red-600 p-2 hover:bg-red-600 hover:text-white hover: rounded-full  hover:underline mx-1"> 
             Add
            </button> */}
            {/* {val.map((data,i)=>{
                return(
                <div>
                     <input
                     name="fname" value={data.fname} onChange={e=>handleChange(e,i)} />
                                 
                     <button
                     onClick={()=>handleDelete(i)}
                    
                    >remove</button>
                </div>
               )
              })} */}
      </div>
    </AuthenticatedLayout>
  )
}
