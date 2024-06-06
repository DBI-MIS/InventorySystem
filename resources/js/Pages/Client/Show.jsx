import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CLIENT_STATUS_CLASS_MAP, CLIENT_STATUS_TEXT_MAP } from "@/constants";
import {Head, Link}  from "@inertiajs/react";
export default function Show({auth, client, }){
    console.log(client)
    return(
        <AuthenticatedLayout 
        user={auth.user}
        header={
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight capitalize">
            {`Client Entry - ${client.name} `}
            </h2>
            
           
            </div>
            }
        >
        <Head title={`Client "${client.name}" `}/>
        <div className="py-6 capitalize">
            <div className="w-5/6 mx-auto sm:px-6 lg:px-8 grid grid-cols-3 font-bold gap-2 bg-white overflow-hidden shadow-sm sm:rounded-lg">
           
                {/* card #1 */}
                <div className="col-span-2 ">
              
                        <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-row justify-between">
                            <div className="flex flex-col pb-3 mt-2">
                            <label
                            className="font-bold text-lg"
                            htmlFor="ClientId"></label>
                            <span className="text-2xl font-semibold ">{client.name}</span>
                            </div>
                            <div className="flex flex-col gap-3 clients-end">
                                <div>
                                <label className="font-light text-md">Client ID: </label>
                                <span className="font-light">{client.id}</span>
                                </div>       
                            </div>
                            </div>

                            <div className="flex flex-col pb-3 mt-12">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Address :</dt>
                            <dd className="text-lg font-light">{client.address}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-6">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Contact Person Name: </dt>
                            <dd className="text-lg font-light">{client.contact_person}</dd>
                            </div>
                        </dl>
                        
                        
                </div>
                {/* card #2 */}
                <div className="col-span-1">
                    <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">

                          
                                <div className="float-end mt-5">
                                    <Link href={route('client.edit', client.id)} className="bg-blue-500 py-[0.8rem] px-8 text-white rounded shadow transition-all hover:bg-blue-700">
                                        Edit Entry
                                    </Link>
                                </div>
                            <div className="flex flex-col pb-3 mt-[6.4rem]">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Contact Number: </dt>
                            <dd className="text-lg font-light"><span className="">{client.contact_no}</span></dd>
                            </div>
                            
                            <div className="flex flex-col pb-3 mt-6">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">TIN Number: </dt>
                            <dd className="text-lg font-light"><span className="">{client.tin_no}</span></dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Status : </dt>
                            <dd className="text-lg font-light"><span className={"px-2 py-1 font-semibold tracking-wide rounded text-white " + CLIENT_STATUS_CLASS_MAP[client.status]} >
                                {CLIENT_STATUS_TEXT_MAP[client.status]}
                                </span></dd>
                            </div>

                           

                    
                    </dl>
                </div>
                {/* card #3 */}
                <div className="col-span-3">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-2 h-[200px]">
                            <div className="px-6 ">
                                    <label
                                    className="font-light text-md"
                                    htmlFor="ClientId">Remarks :</label>  <span>{client.remarks}</span>
                            </div>
                        </div>
                                    
                </div>
    

            </div>
        </div>
        </AuthenticatedLayout>
    )
}