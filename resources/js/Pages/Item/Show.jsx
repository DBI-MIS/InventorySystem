import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link}  from "@inertiajs/react";
export default function Show({auth, item,category,onlySoftDeletedItems,tryDeleted, queryParams, success}){
    console.log(item)
    return(
        <AuthenticatedLayout 
        user={auth.user}
        header={
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">
            {`Item "${item.name}" `}
            </h2>
             <Link href={route('item.edit', item.id)} className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
            Edit
             </Link>
           
            </div>
            }
        >
        <Head title={`Item "${item.name}" `}/>
        <div className="py-12 capitalize">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 font-bold gap-2">
            <div>
                      {  onlySoftDeletedItems }
                    </div>
                    <div>
                      <h1>{tryDeleted}</h1>
                    </div>
                {/* card #1 */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2 ">
              
                        <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-row justify-between">
                            <div className="flex flex-col pb-3 mt-2">
                            <label
                            className="font-bold text-lg"
                            htmlFor="ItemId"></label>
                            <span className="text-2xl font-semibold ">{item.name}</span>
                            </div>
                            <div className="w-[90px]">
                                            <label className="font-light text-md"
                                            >Item ID: </label>
                                            <span className="font-light">{item.id}</span>
                            </div>
                            </div>  
                            {/* <div className="mt-2 "> 
                                <label
                                className="font-light text-md"
                                htmlFor="ItemId">Description :</label>
                                <p className=""></p>
                            </div> */}
                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Description :</dt>
                            <dd className="text-lg font-light">{item.description}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Specifications : </dt>
                            <dd className="text-lg font-light">{item.specs}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Brand : </dt>
                            <dd className="text-lg font-light">{item.brand.name}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Serial No. : </dt>
                            <dd className="text-lg font-light">{item.serial_no}</dd>
                            </div>
                            
                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Model No. : </dt>
                            <dd className="text-lg font-light">{item.model_no}</dd>
                            </div>                            

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Part No. : </dt>
                            <dd className="text-lg font-light">{item.part_no}</dd>
                            </div>

                        </dl>
                        
                        
                </div>
                {/* card #2 */}
                <div className="bg-white  dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ml-2 col-span-1">
                    <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        
                             
                            <div className="flex flex-row pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">SKU : </dt>
                            <dd className="text-lg font-light uppercase ml-2">{item.category.sku_prefix}-{item.sku}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Status : </dt>
                            <dd className="text-lg font-light">N/A {item.status}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Qty : </dt>
                            <dd className="text-lg font-light"><span className="">{item.quantity}<span>{item.uom}</span></span></dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Category : </dt>
                            <dd className="text-lg font-light">{item.category.name}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Location : </dt>
                            <dd className="text-lg font-light">{item.location.name}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Created by : </dt>
                            <dd className="text-lg font-light">N/A</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Updated by : </dt>
                            <dd className="text-lg font-light">N/A</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Assigned Employee : </dt>
                            <dd className="text-lg font-light">{item.employee.name}</dd>
                            </div>        
                    
                    </dl>
                </div>
                {/* card #3 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-3">
                        
                            {/* card5 */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-2 h-[200px]">
                            <div className="p-6 ">
                                    <label
                                    className="font-light text-md"
                                    htmlFor="ItemId">Remarks :</label>  <span>{item.remarks}</span>
                            </div>
                        </div>
                                    
                </div>
    

            </div>
        </div>
        </AuthenticatedLayout>
    )
}