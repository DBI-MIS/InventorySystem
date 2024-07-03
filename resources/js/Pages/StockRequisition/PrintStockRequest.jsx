import RsLogo from "@/Components/RsLogo";
import { Head } from "@inertiajs/react";

export default function PrintStockRequest({ stock_sritem, stockrequest }){
    return(
        <div className="m-5">
            <Head title="" />

            <div class="py-3 p-16 bg-white capitalize print:p-0">
                <div class="max-w-full mx-auto  text-gray-900 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div class="overflow-hidden shadow-sm  col-span-3">
                        <div className="flex mb-1 items-center bg-white justify-between">
                            <div className="flex items-center w-full">
                                <RsLogo className="h-40 w-full"/>
                            </div>
                        </div>
                        <br />
                            <h1 class="font-extrabold text-xl  text-gray-900 text-center  dark:text-gray-200 leading-tight"> REQUISITION SLIP </h1>
                        <br />  
                        <div class="flex flex-row justify-between">
                            <div class="font-light text-xs md:text-sm">
                                <div>
                                        <label htmlFor="StockRequestID">To :</label>
                                        <span className="mx-2 underline underline-offset-4 decoration-1 decoration-solid">
                                            { stockrequest.sr_to }
                                        </span>
                                </div>
                                </div>
                                <div className="font-light text-xs md:text-sm">
                                    <div>

                                    
                                        <label htmlFor="StockRequestID">RS# :</label>
                                        <span className="mx-2 underline underline-offset-4">
                                            { stockrequest.rs_no }
                                            
                                        </span>
                                        <br /><br />
                                        <label htmlFor="StockRequestID">Date Needed :</label>
                                        <span className="mx-2 underline underline-offset-4">
                                            { stockrequest.sr_date }
                                            
                                        </span>

                                    </div>
                                    <br /><br />
                                </div>
                            
                        </div>
                    </div>
                </div>
                <br />
                <table class="  px-20 w-full mx-auto text-sm text-left rtl:text-right border-solid border border-gray-800 text-gray-500 ">
                        <thead class="text-xs text-gray-700  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="text-center">
                            <th class=" py-1 border   border-gray-500">#</th>
                            <th class=" py-1 border min-w-[150px] border-gray-500">ITEM</th>
                            <th class=" py-1 border min-w-[10px] border-gray-500">QTY</th>
                            <th class=" py-1 border min-w-[10px] border-gray-500">UNIT</th>
                            <th class=" py-1 min-w-[150px] border border-gray-500">DESCRIPTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stock_sritem.map((item, index) => (
                            <tr key={item.id} className="text-center">
                                <td className="py-1 border border-gray-500">{index + 1}</td>
                                <td className="py-1 border border-gray-500">{item.sr_item}</td>
                                <td className="py-1 border border-gray-500">{item.sr_qty}</td>
                                <td className="py-1 border border-gray-500">{item.sr_unit}</td>
                                <td className="py-1 border border-gray-500">{item.sr_description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5 text-gray-900 font-light text-xs ">
        <div>
           <label for="ReceivingRemarks">Notes :</label>
           <span className="mx-2 underline underline-offset-4 decoration-1 decoration-solid">
                                            { stockrequest.sr_notes }
                                        </span>
      </div>
        </div>
        <div >
        <div className="flex flex-row justify-between">
            <div className="min-w-[100px]">
                <br />
            <label htmlFor="" className="text-m">Prepared By:</label>
            <br /><br />
            <div class="border-t border-gray-500"></div>
            </div>
            <div className="min-w-[100px]">
            <br />
            <label htmlFor="" className="text-m">Approved By:</label>
            <br /><br />
            <div class="border-t border-gray-500"></div>
            </div>
            <div className="min-w-[100px]">
            <br />
            <label htmlFor="" className="text-m">Received By:</label>
            <br /><br />
            <div class="border-t border-gray-500"></div>
            </div>
             {/* <div className="text-center min-w-[250px]">
            <label htmlFor="" className="text-m min-w-[250px]"><b>Received the above Items in good condition.</b></label>
            <br /><br />
            <div class="border-t border-gray-500 text-m"><b>SIGN OVER PRINTED NAME</b></div>
            <span className="text-[10px]">Distributions: 1st Copy -</span><span className="text-[10px]">Office 2nd Copy - Client</span>
            </div> */}
            
        </div>
        </div>
            </div>

        </div>
    )
}