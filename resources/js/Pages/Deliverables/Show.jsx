import { DONE_STATUS_CLASS_MAP, DONE_TEXT_MAP } from '@/constants';
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
             
             <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight capitalize">
                    {`Delivery Receipt - ${deliverable.dr_no} `}
               </h2>
              
            
            </div>
            }
    >
      <Head title={`DR ${deliverable.id} `}/>

      <div className="py-6 capitalize">
      
      <div className="w-full mx-auto sm:px-6 lg:px-8 grid grid-cols-4 font-bold gap-2 ">
      
          {/* card #1 */}
          <div className="col-span-1 bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col justify-start h-fit relative">
              <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">

              <div className="">

<div className="flex flex-row gap-2 items-center">
    <div className="min-w-8">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Upload-Square--Streamline-Sharp"><desc>Upload Square Streamline Icon: https://streamlinehq.com</desc><g id="upload-square--arrow-download-internet-network-server-square-up-upload"><path id="Rectangle 645" fill="#8fbffa" d="M1 1h22v22H1z" stroke-width="1"></path><path id="Union" fill="#2859c5" fill-rule="evenodd" d="M7.5 11 12 6.5l4.5 4.5v1h-3v5.5h-3V12h-3v-1Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>
    </div>
    <div className="flex flex-col pb-3 mt-2">
        <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
            DR No.:
        </dt>
        <span className="text-4xl font-semibold ">
            {deliverable.dr_no ??
                "No DR Number"}
        </span>
    </div>
</div>

</div>


<div className="flex flex-col pb-3 mt-2">
<dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">Project : </dt>
<dd className="text-lg font-bold">{deliverable.client.name ?? "No Client Name"}</dd>
                  </div>

                  <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Address :
                                </dt>
                                <dd className="text-base font-light">
                      {deliverable.address ?? "No Address Available"}</dd>
                  </div>

                  <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Status :
                                </dt>
                                <dd className="text-lg font-light">
                                    {deliverable.status ?? "No Status"}
                                    {/* <span
                                        className={`px-2 py-1 font-semibold tracking-wide rounded ${
                                            ITEM_STATUS_CLASS_MAP[
                                                item.statuses
                                            ] || "bg-gray-300"
                                        } ${
                                            item.statuses
                                                ? "text-white"
                                                : "text-black"
                                        }`}
                                    >
                                        {ITEM_STATUS_TEXT_MAP[item.statuses] ||
                                            "No Item Status"}
                                    </span> */}
                                </dd>
                            </div>
                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Status :
                                </dt>
                                <dd className="text-lg font-light">
                                    <span
                                            className={`px-3 py-1 font-semibold tracking-wide rounded-full text-white ${DONE_STATUS_CLASS_MAP[deliverable.is_done]}`}>
                                        {DONE_TEXT_MAP[deliverable.is_done] ?? "Not Done/Pending"}
                                    </span>
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    RS No. :{" "}
                                </dt>
                                <dd className="text-lg font-light">
                                    <span className="">
                                    {deliverable.stockrequest.rs_no ?? "No RS Number"}
                                    </span>
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Date. :{" "}
                                </dt>
                                <dd className="text-lg font-light">
                                    <span className="">
                                    {new Date(deliverable.created_at ?? "No DR Date" ).toLocaleDateString()}
                                    </span>
                                </dd>
                            </div>

                            <div className="flex flex-col gap-3 items-end">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    DR ID:{" "}
                                    <span className="font-bold">
                                        {deliverable.id ?? "No DR ID"}
                                    </span>
                                </dt>
                            </div>
                            
                </dl>

                <Link
                            href={route("deliverables.edit", deliverable.id)}
                            className="bg-blue-500 py-2 px-4 font-light text-white shadow transition-all hover:bg-blue-700 text-center"
                        >
                            Edit
                        </Link>

                        <Link
                           href={route('deliverable.myDeliverable', deliverable.id)} 
                            className="bg-blue-300 py-2 px-4 font-light text-white shadow transition-all hover:bg-blue-700 text-center"
                        > Print
                
                        </Link>

                        <Link
                           href={route('deliverable.myDeliverable', deliverable.id)} 
                            className="absolute right-2 top-2 py-2 px-2 font-light text-white rounded transition-all hover:bg-gray-300 text-center w-8"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Shredder--Streamline-Sharp"><desc>Shredder Streamline Icon: https://streamlinehq.com</desc><g id="shredder--device-electronics-shred-paper-cut-destroy-remove-delete"><path id="Rectangle 743" fill="#2859c5" d="M5 1h14v7H5V1Z" stroke-width="1"></path><path id="Subtract" fill="#8fbffa" fill-rule="evenodd" d="M23 8H1v10h5v-4h12v4h5V8Z" clip-rule="evenodd" stroke-width="1"></path><path id="Union" fill="#2859c5" fill-rule="evenodd" d="M13 14.25h1.5V20a3 3 0 0 0 3 3h1v-2h-1a1 1 0 0 1 -1 -1v-5.75H20v-1.5H4v1.5h3.5V20a1 1 0 0 1 -1 1h-1v2h1a3 3 0 0 0 3 -3v-5.75H11V23h2v-8.75Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>
                        </Link>

          </div>
          
          {/* card #2 */}

          <div className="w-full mx-auto bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-3">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col min-h-[540px] justify-between relative">
                            <div className="py-6 px-2 text-gray-900 dark:text-gray-100">
                                <div className="overflow-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap ">
                                    <th class="w-[60px] border text-center px-1 py-4">
                                                    #
                                                </th>
                                                <th class="w-[60px] border text-left px-8 py-4">
                                                    QTY
                                                </th>
                                                <th class="w-[60px] border text-left px-8 py-4">
                                                    Unit
                                                </th>
                                                <th class=" border text-left px-8 py-4">
                                                    Item Name
                                                </th>
                                                <th class=" border text-left px-8 py-4">
                                                    Description
                                                </th>
                        </tr>
                      </thead>

                      <tbody>
                        {deliverables_items && deliverables_items.length !== 0 && (
                          <>
                          {deliverables_items.map((deliverable_item, index)=>(
                          
                              <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={deliverable_item.id}>
                                  <td className="px-3 py-2 text-center">
                                  {index + 1}
                                  </td>
                                  <td className="px-3 py-2 text-nowrap text-right">
                                    {deliverable_item.qty_out ?? "No Quantity for this Item"}
                                  </td>
                                  <td className="px-3 py-2 text-nowrap text-left">
                                    {deliverable_item.uom ?? "UOM not Available"}
                                  </td>
                                   <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                    <Link href={route('item.show', deliverable_item.id)}>
                                    {deliverable_item.name ?? "No Item Name Available"}
                                    </Link>
                                  </th> 
                                  <td className="px-3 py-2 text-wrap">
                                    {deliverable_item.description ?? "No Item Description"}
                                  </td>
                              </tr>
                          ))}
                          </>
                         )}
                      </tbody>
                  </table>
                
                </div> 
           </div>
           <div className="px-6 flex flex-col gap-3">
                    <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                    Remarks :
                    <span className="font-light">
                    {deliverable.remarks ?? "No Remarks"}
                    </span>
                         
                         </dt>
                     </div>               
          </div>
        </div>
              
        </div>
         
          </div>
          
      
 

    </Authenticated>
  )
}

export default Show