import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ITEM_STATUS_CLASS_MAP, ITEM_STATUS_TEXT_MAP } from "@/constants";
import {Head, Link}  from "@inertiajs/react";
export default function Show({auth, item}){
    console.log(item)
    return(
        <AuthenticatedLayout 
        user={auth.user}
        header={
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight capitalize">
            {`Item Entry - ${item.name} `}
            </h2>
            
           
            </div>
            }
        >
        <Head title={`Item "${item.name}" `}/>
        <div className="py-6 capitalize">
            <div className="w-5/6 mx-auto sm:px-6 lg:px-8 grid grid-cols-3 font-bold gap-2 bg-white overflow-hidden shadow-sm sm:rounded-lg">
         
                {/* card #1 */}
                <div className="col-span-2 ">
              
                        <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-row justify-between">
                            <div className="flex flex-col pb-3 mt-2">
                            <label
                            className="font-bold text-lg"
                            htmlFor="ItemId"></label>
                            <span className="text-2xl font-semibold ">{item.name ?? "No Item Name"}</span>
                            </div>
                            <div className="flex flex-col gap-3 items-end">
                                <div>
                                <label className="font-light text-md">Item ID: </label>
                                <span className="font-light">{item.id ?? "No Item ID"}</span>
                                </div>       
                            </div>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Description :</dt>
                            <dd className="text-lg font-light">{item.description ?? "No Description"}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Specifications : </dt>
                            <dd className="text-lg font-light">{item.specs ?? "No Specs"}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Brand : </dt>
                            <dd className="text-lg font-light">{item.brand && item.brand.name  ? item.brand.name :"No Brand NAme" }</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Serial No. : </dt>
                            <dd className="text-lg font-light">{item.serial_no ?? "No Serial Number"}</dd>
                            </div>
                            
                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Model No. : </dt>
                            <dd className="text-lg font-light">{item.model_no ?? "No Model Number"}</dd>
                            </div>                            

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Part No. : </dt>
                            <dd className="text-lg font-light">{item.part_no ?? "No Part Number"}</dd>
                            </div>

                        </dl>
                        
                        
                </div>
                {/* card #2 */}
                <div className="col-span-1">
                    <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">

                            <div  className="flex flex-row justify-between items-center">
                           
                                <div className="flex flex-row pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">SKU : </dt>
                                <dd className="text-lg font-light uppercase ml-2">{item.sku_prefix ?? "No Sku Prefix"}-{item.sku ?? "No Sku"}</dd>
                                
                                </div>
                                <div><Link href={route('item.edit', item.id)} className="bg-blue-500 py-2 px-6 text-white rounded shadow transition-all hover:bg-blue-700">
                                    Edit Entry
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Status : </dt>
                            <dd className="text-lg font-light"> 
                                <span className={`px-2 py-1 font-semibold tracking-wide rounded ${ITEM_STATUS_CLASS_MAP[item.statuses] || 'bg-gray-300'} ${item.statuses ? 'text-white' : 'text-black'}`}>
                                    {ITEM_STATUS_TEXT_MAP[item.statuses] || 'No Item Status'}
                                </span>
                            </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Qty : </dt>
                            <dd className="text-lg font-light"><span className="">{item.quantity ?? "No Quantity"}<span>{item.uom ?? "No UOM"}</span></span></dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Category : </dt>
                            <dd className="text-lg font-light">{item.category ? item.category.name : 'Not belong on any Category'}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Location : </dt>
                            <dd className="text-lg font-light">{item.location && item.location.name ? item.location.name : "No Location Name"}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Created by : </dt>
                            <dd className="text-lg font-light">{item.created_by?? "No User"}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Created Date : </dt>
                            <dd className="text-lg font-light">{item.created_at ?? "No Updated Date"}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Updated by : </dt>
                            <dd className="text-lg font-light">{item.updated ?? "Not yet Updated by anyone"}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Assigned Employee : </dt>
                            <dd className="text-lg font-light">{item.employee && item.employee.name ? item.employee.name : "No Assigned Employee"}</dd>
                            </div>        
                    
                    </dl>
                </div>
                {/* card #3 */}
                <div className="col-span-3">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-2 h-[200px]">
                            <div className="p-6 ">
                                    <label
                                    className="font-light text-md"
                                    htmlFor="ItemId">Remarks :</label>  <span>{item.remark}</span>
                            </div>
                        </div>
                                    
                </div>
    

            </div>
        </div>
        </AuthenticatedLayout>
    )
}