import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link}  from "@inertiajs/react";
export default function Show({auth, receiving,receiving_items}){
   
  console.log("receiving" + receiving);
  console.log( "receiving_items" + receiving_items);
    
  receiving_items = Array.isArray(receiving_items) ? receiving_items : [];

    return(
        <AuthenticatedLayout 
        user={auth.user}
        header={
            <div className="flex receivings-centerjustify-between">
              <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight capitalize">
                    {`Material Receiving Report " ${receiving.id} " `}
               </h2>
            </div>
            }
        >
        <Head title={`Receiving "${receiving.id}" `}/>

        <div className="py-6 capitalize">
            <div className="w-5/6 mx-auto sm:px-6 lg:px-8 grid grid-cols-3 font-bold gap-2 bg-white overflow-hidden shadow-sm sm:rounded-lg">
           
                {/* card #1 */}
                <div className="col-span-2 ">
              
                        <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col pb-3 mt-2">
                              <label
                              className="font-bold text-lg"
                              htmlFor="ReceivingId">MRR Number</label>
                              <span className="text-2xl font-semibold ">{receiving.mrr_no ?? "No MRR Number"}</span>
                              </div>
                            </div>

                            <div className="flex flex-col pb-3 mt-12">
                              <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">CLIENT NAME: </dt>
                              <dd className="text-lg font-light">{receiving.client && receiving.client.name ? receiving.client.name : "No Client Name"}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-6">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Address: </dt>
                            <dd className="text-lg font-light">{receiving.address ?? "No Receiving Address"}</dd>
                            </div>
                        </dl>
                </div>
                {/* card #2 */}
                <div className="col-span-1">
                    <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                          
                        <div className="float-end mt-5">
                            <Link href={route('receiving.myReceiving',receiving.id)} className="bg-blue-500 py-2 px-6 text-white rounded shadow transition-all hover:bg-blue-700">
                                Print MRR
                            </Link>
                        </div>
                        <div className="flex flex-col pb-3 mt-[6.4rem]">
                          <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Receiving ID: </dt>
                          <dd className="text-lg font-light"><span className="">{receiving.id ?? "No Receiving ID"}</span></dd>
                        </div>
                        <div className="flex flex-col pb-3 mt-5">
                          <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">SI Number: </dt>
                          <dd className="text-lg font-light"><span className="">{receiving.si_no ?? "No SI Number"}</span></dd>
                        </div>
                            
                        <div className="flex flex-col pb-3 mt-6">
                          <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">DR Number: </dt>
                          <dd className="text-lg font-light"><span className="">{receiving.deliver && receiving.deliver.dr_no ? receiving.deliver.dr_no : "No DR Number"}</span></dd>
                        </div>
                        
                    </dl>
                </div>
                {/* card #3 */}
                <div className="col-span-3">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-2 h-[140px]">
                         <div className="px-6 ">
                                <label
                                className="font-light text-gray-700 text-md"
                                htmlFor="ReceivingId">Remarks :</label><span>{receiving.remarks ?? "No Receiving Remarks"}</span>
                         </div>
                     </div>               
                </div>
            </div>
            <div className="w-5/6 mx-auto sm:px-6 lg:px-8 mt-2 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-3">
              
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="py-6 px-2 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                                <th class=" border text-left px-8 py-4">ID #</th>
                                <th class=" border text-left px-8 py-4">SKU</th>
                                <th class=" border text-left px-8 py-4">Quantity</th>
                                <th class=" border text-left px-8 py-4">Unit #</th>
                                <th class=" border text-left px-8 py-4">Item Name</th>
                                <th class=" border text-left px-8 py-4">Description</th>
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
                              {receiving_items && receiving_items.length !== 0 && (
                                <>
                                {receiving_items.map((receiving_item)=>(
                                
                                    <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={receiving_item.id}>
                                        <td className="px-3 py-2">
                                            {receiving_item.id ?? "No Receiving ID"}
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">
                                            {receiving_item.category ? receiving_item.category.sku_prefix : "No Sku Prefix "}-{receiving_item.sku ?? "No SKU"}
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">
                                            {receiving_item.quantity ?? "No quantity"}
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">
                                            {receiving_item.uom ?? "No UOM "}
                                        </td>
                                        <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                          <Link href={route('item.show', receiving_item.id)}>
                                             {receiving_item.name ?? "No Item Name"}
                                          </Link>
                                        </th>
                                        <td className="px-3 py-2 text-wrap">
                                          {receiving_item.description ?? "No Item Description"}
                                        </td>
                                    </tr>
                                ))}
                                </>
                               )}
                            </tbody>
                        </table>
                      </div> 
                 </div>
                 {/* <PaginationReceiving links={paginationData.links} /> */}
              </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}