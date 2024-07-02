
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ auth, stockrequisition, queryParams }) {

    queryParams = queryParams || {};
    return (
        <Authenticated
        user={auth.user}
            header={
                <div className="flex receivings-centerjustify-between">
               <div className="flex justify-between items-center">
                  
               </div>
              <div>
                <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight capitalize">
                    {`Stock Request RS No.  "${stockrequisition.rs_no}" `}
               </h2>
              </div>
            
            </div>
            }
        >

            <Head title={` StockRequisition "${stockrequisition.id}" `} />

            <div className="py-6 capitalize">
            <div className=" w-5/6 mx-auto sm:px-6 lg:px-8 grid grid-cols-3 font-bold gap-2 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                {/* card #1 */ }
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2 ">
                <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col pb-3 mt-2">
                      <label
                      className="font-bold text-lg"
                      htmlFor="DeliverablesId">RS Number</label>
                      <span className="text-2xl font-semibold ">{stockrequisition.rs_no ?? "No RS Number"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col pb-3 mt-12">
                  <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">TO : </dt>
                  <dd className="text-lg font-light">{stockrequisition.sr_to ?? "No To:"}</dd>
                  </div>
                  <div className="flex flex-col pb-3 mt-6">
                    <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">QUANTITY : </dt>
                    <dd className="text-lg font-light">{stockrequisition.sr_qty ?? "No Quantity Available"} {stockrequisition.sr_unit ?? "No Unit Available"}</dd>
                  </div>
                </dl>
                </div>

                {/* card 2  */}
                <div className="col-span-1">
                <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex float-end mt-5 ">
                        {/* <Link href={route('stock.myStock', stock.id)} className="bg-blue-500 py-2 px-6 text-white rounded shadow transition-all hover:bg-blue-700">
                              Print RS
                        </Link> */}
                    </div>
                    <div className="flex flex-col pb-3 mt-[6.4rem]">
                      <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">DATE NEEDED : </dt>
                      <dd className="text-lg font-light">{stockrequisition.sr_date ?? "No Date Available"}</dd>
                      </div>
                      </dl>
                </div>
                <div className="col-span-3">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-2 h-[140px]">
                         <div className="px-6 ">
                                <label
                                className="font-light text-gray-700 text-md"
                                htmlFor="ReceivingId">Notes :</label> <span>{stockrequisition.sr_notes ?? "No Notes"}</span>
                         </div>
                     </div>               
          </div>
                </div>
            </div>

        </Authenticated>
    )
}