import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React from 'react'

function Show({ auth , deliverable, deliverables_items , queryParams }) {

  console.log(deliverable);

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
  };

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
    router.get(route('deliverables.index'), queryParams)
  }

  return (
    <Authenticated
    user={auth.user}
        header={
            <div className="flex receivings-centerjustify-between">
               <div className="flex justify-between items-center">
                  
               </div>
              <div>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Delivery Receipt No. " ${deliverable.id} " `}
               </h2>
              </div>
            
            </div>
            }
    >
      <Head title={`Deliverables "${deliverable.id}" `}/>

      <div className="py-2capitalize">
      
      <div className=" max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3  gap-2">
      
          {/* card #1 */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2 ">
              <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col pb-3 mt-2">
                      <label
                      className="font-bold text-lg"
                      htmlFor="ReceivingId"></label>
                    </div>
                    <div className="w-[90px]">
                        <label className="font-light text-md"
                        >Delivery Receipt: </label>
                        <span className="font-light">{deliverable.id}</span>
                    </div>
                  </div>
                  <div className="flex flex-col pb-3 mt-2">
                    <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">PROJECT : </dt>
                    <dd className="text-lg font-light">{deliverable.project}</dd>
                  </div>
                  <div className="flex flex-col pb-3 mt-2">
                    <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">ADDRESS : </dt>
                    <dd className="text-lg font-light">{deliverable.address}</dd>
                  </div>
                  <div className="flex flex-col pb-3 mt-2">
                    <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">REMARKS : </dt>
                    <dd className="text-lg font-light">{deliverable.remarks}</dd>
                  </div>
                </dl>
          </div>
          {/* card #2 */}
          <div className="bg-white  dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ml-2 col-span-1">
              <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                     <div className="flex float-end mb-5 px-10 gap-2 ">
                        <Link href={route('deliverable.myDeliverable', deliverable.id)} className="bg-blue-500 py-2 px-6 text-white rounded shadow transition-all hover:bg-blue-700">
                            Print DR
                        </Link>
                    </div>
                      <div className="flex flex-col pb-3 mt-2">
                      <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">DR NO.:  </dt>
                      <dd className="text-lg font-light">{deliverable.dr_no}</dd>
                      </div>

                      <div className="flex flex-col pb-3 mt-2">
                      <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">RS NO.: </dt>
                      <dd className="text-lg font-light">{deliverable.rs_no}</dd>
                      </div>
                      <div className="flex flex-row pb-3 mt-2">
                      <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">DATE: </dt>
                      <dd className="text-lg font-light uppercase ml-2">{deliverable.dr_date}</dd>
                      </div>
              
              </dl>
          </div>
          {/* card #3 */}
          {/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-3">
                    
                  <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-2 h-[200px]">
                  <div className="p-6 ">
                              <label
                              className="font-light text-md"
                              htmlFor="ReceivingId">Address :</label>  <span>{receiving.address}</span>
                      </div>
                      <div className="px-6 py-2 ">
                              <label
                              className="font-light text-md"
                              htmlFor="ReceivingId">Remarks :</label>  <span>{receiving.remarks}</span>
                      </div>
                  </div>
          </div> */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-3">
                   <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="overflow-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap ">
                          <th class=" border text-left px-8 py-4">ID #</th>
                          <th class=" border text-left px-8 py-4">QTY</th>
                          <th class=" border text-left px-8 py-4">UNIT</th>
                          <th class=" border text-left px-8 py-4">ITEM NAME</th>
                          <th class=" border text-left px-8 py-4">ITEM DESCRIPTION</th>
                        </tr>
                      </thead>
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap ">
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3"></th>
                          <th className="px-3 py-3 text-right"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliverables_items && deliverables_items.length !== 0 && (
                          <>
                          {deliverables_items.map((deliverable_item)=>(
                          
                              <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={deliverable_item.id}>
                                  <td className="px-3 py-2">
                                      {deliverable_item.id}
                                  </td>
                                  <td className="px-3 py-2 text-nowrap">
                                    {deliverable_item.quantity}
                                  </td>
                                  <td className="px-3 py-2 text-nowrap">
                                    {deliverable_item.uom}
                                  </td>
                                   <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                    <Link href={route('item.show', deliverable_item.id)}>
                                    {deliverable_item.name}
                                    </Link>
                                  </th> 
                                  <td className="px-3 py-2 text-wrap">
                                    {deliverable_item.description}
                                  </td>
                              </tr>
                          ))}
                          </>
                         )}
                      </tbody>
                  </table>
                
                </div> 
           </div>
        </div>
              
        </div>
      </div>
  </div>

    </Authenticated>
  )
}

export default Show