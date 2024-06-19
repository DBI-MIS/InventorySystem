import RsLogo from "@/Components/RsLogo";
import { Head } from "@inertiajs/react";

export default function PrintStockRequest({  }){
    return(
        <div className="m-5">
            <Head title="" />

            <div class="py-5 p-16 bg-white capitalize print:p-0">
                <div class="max-w-full mx-auto  text-gray-900 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div class="overflow-hidden shadow-sm sm:rounded-lg col-span-3">
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
                                        <span className="mx-2">
                                            {}
                                            <div class="border-t border-gray-500"></div>
                                        </span>
                                </div>
                                </div>
                                <div className="font-light text-xs md:text-sm">
                                    <div>

                                    
                                        <label htmlFor="StockRequestID">RS# :</label>
                                        <span className="mx-2">
                                            {}
                                            <div class="border-t border-gray-500"></div>
                                        </span>
                                        <br />
                                        <label htmlFor="StockRequestID">Date Needed :</label>
                                        <span className="mx-2">
                                            {}
                                            <div class="border-t border-gray-500"></div>
                                        </span>

                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </div>
                <br />
                <table class="  px-20 w-full mx-auto text-sm text-left rtl:text-right border-solid border border-gray-800 text-gray-500 ">
                        <thead class="text-xs text-gray-700  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="text-center">
                            <th class=" py-3 border   border-gray-500">#</th>
                            <th class=" py-3 border min-w-[80px] border-gray-500">QTY</th>
                            <th class=" py-3 border min-w-[60px] border-gray-500">UNIT</th>
                            <th class=" py-3 min-w-[150px] border border-gray-500">DESCRIPTION</th>
                        </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                </table>
            </div>

        </div>
    )
}