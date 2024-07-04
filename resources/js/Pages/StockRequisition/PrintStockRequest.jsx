import RsLogo from "@/Components/RsLogo";
import { Head } from "@inertiajs/react";

export default function PrintStockRequest({ stock_sritem, stockrequest }){
    return(
        <div className="m-5  "
        >
        <Head title={`Receiving "${receiving.id}" `}/>
       
     <div class="py-5 p-16 bg-white capitalize print:p-0">
        <div class="max-w-full mx-auto  text-gray-900 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div class="overflow-hidden shadow-sm sm:rounded-lg col-span-3">
                <div class="flex  mb-1  items-center bg-white justify-between ">
                <div className="shrink-0 flex items-center">
                   <MrrLogo className="block h-[32px] " />
                   
                </div>
               <div className="text-right">
                <h2 class="font-extrabold text-xl  text-gray-800  dark:text-gray-200 leading-tight"> Stock Request </h2>
                
                <span className="text-xl text-gray-800  font-light "> No.: {stockrequest.rs_no}</span>

               
                </div>
                </div>
                <h3 class="text-xs ">430 Lt. Artiaga St., San Juan Metro Manila, Philippines 1500</h3>
                <h3 class="text-xs ">Tel. No.: (+63)8723-4461 to 64, Fax No.:(+632)8723-2782, (+632) 8723-4467</h3>

                <div class="mt-3 grid grid-cols-3 gap-4 leading-7">
                    <div class="font-light text-xs md:text-sm">
                        <div>
                            <label for="ReceivingId">To. :</label>
                            <span className="mx-2 font-bold">{receiving.client.name}</span>
                        </div>
                        <div>
                            <label for="ReceivingId">SI No :</label>
                            <span  className="mx-2">{receiving.si_no}</span>
                        </div>
                        
                    </div>
                    <div className="font-light text-xs md:text-sm">
                        <div>
                            <label for="ReceivingId">RS No. :</label>
                            <span  className="mx-2">{stockrequest.rs_no}</span>
                        </div>
                        
                    </div>
                    <div  className="font-light text-xs md:text-sm">
                        <div>
                            <label for="ReceivingId">RR No. :</label>
                            <span  className="mx-2">RR NO</span>
                        </div>
                        <div>
                            <label for="ReceivingId">Date :</label>
                            <span  className="mx-2">{stockrequest.sr_date}</span>
                        </div>
                    </div>
                </div>
                <div className=" mb-5 leading-5 md:leading-6 font-light text-xs md:text-sm ">
                            <label for="ReceivingId">Address :</label>
                            <span  className="mx-2">{receiving.address}</span>
                        </div>
            </div> 
          {/* item table */}
        </div>
        <table class="  px-20 w-full mx-auto text-sm text-left rtl:text-right border-solid border border-gray-800 text-gray-500 ">
              <thead class="text-xs text-gray-700  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr class="text-center">
                                      <th class=" py-3 border  border-gray-500">#</th>
                                      <th class=" py-3 min-w-[120px] border border-gray-500">ITEM</th>
                                      <th class=" py-3 border border-gray-500">QTY</th>
                                      <th class=" py-3 border border-gray-500">UNIT</th>
                                      <th class=" py-3 w-full  border border-gray-500">DESCRIPTION</th>
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
           <label for="ReceivingRemarks">Remarks :</label>
             <span>{receiving.remarks}</span>
      </div>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs md:text-sm md:gap-10 leading-6 md:leading-7">
            <div class="border-t border-gray-500">Prepared By:</div>
            <div class="border-t border-gray-500">Checked By:</div>
            <div class="border-t border-gray-500">Received By:</div>
            <div class="border-t border-gray-500">Approved By:</div>
        </div>
      
     </div>
</div>

    //     <div className="m-5">
    //         <Head title="" />

    //         <div class="py-3 p-16 bg-white capitalize print:p-0">
    //             <div class="max-w-full mx-auto  text-gray-900 grid grid-cols-1 md:grid-cols-3 gap-2">
    //                 <div class="overflow-hidden shadow-sm  col-span-3">
    //                     <div className="flex mb-1 items-center bg-white justify-between">
    //                         <div className="flex items-center w-full">
    //                             <RsLogo className="h-40 w-full"/>
    //                         </div>
    //                     </div>
    //                     <br />
    //                         <h1 class="font-extrabold text-xl  text-gray-900 text-center  dark:text-gray-200 leading-tight"> REQUISITION SLIP </h1>
    //                     <br />  
    //                     <div class="flex flex-row justify-between">
    //                         <div class="font-light text-xs md:text-sm">
    //                             <div>
    //                                     <label htmlFor="StockRequestID">To :</label>
    //                                     <span className="mx-2 underline underline-offset-4 decoration-1 decoration-solid">
    //                                         { stockrequest.sr_to }
    //                                     </span>
    //                             </div>
    //                             </div>
    //                             <div className="font-light text-xs md:text-sm">
    //                                 <div>

                                    
    //                                     <label htmlFor="StockRequestID">RS# :</label>
    //                                     <span className="mx-2 underline underline-offset-4">
    //                                         { stockrequest.rs_no }
                                            
    //                                     </span>
    //                                     <br /><br />
    //                                     <label htmlFor="StockRequestID">Date Needed :</label>
    //                                     <span className="mx-2 underline underline-offset-4">
    //                                         { stockrequest.sr_date }
                                            
    //                                     </span>

    //                                 </div>
    //                                 <br /><br />
    //                             </div>
                            
    //                     </div>
    //                 </div>
    //             </div>
    //             <br />
    //             <table class="  px-20 w-full mx-auto text-sm text-left rtl:text-right border-solid border border-gray-800 text-gray-500 ">
    //                     <thead class="text-xs text-gray-700  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //                     <tr class="text-center">
    //                         <th class=" py-1 border   border-gray-500">#</th>
    //                         <th class=" py-1 border min-w-[150px] border-gray-500">ITEM</th>
    //                         <th class=" py-1 border min-w-[10px] border-gray-500">QTY</th>
    //                         <th class=" py-1 border min-w-[10px] border-gray-500">UNIT</th>
    //                         <th class=" py-1 min-w-[150px] border border-gray-500">DESCRIPTION</th>
    //                     </tr>
    //                     </thead>
    //                     <tbody>
    //                     {stock_sritem.map((item, index) => (
    //                         <tr key={item.id} className="text-center">
    //                             <td className="py-1 border border-gray-500">{index + 1}</td>
    //                             <td className="py-1 border border-gray-500">{item.sr_item}</td>
    //                             <td className="py-1 border border-gray-500">{item.sr_qty}</td>
    //                             <td className="py-1 border border-gray-500">{item.sr_unit}</td>
    //                             <td className="py-1 border border-gray-500">{item.sr_description}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //             <div className="mt-5 text-gray-900 font-light text-xs ">
    //     <div>
    //        <label for="ReceivingRemarks">Notes :</label>
    //        <span className="mx-2 underline underline-offset-4 decoration-1 decoration-solid">
    //                                         { stockrequest.sr_notes }
    //                                     </span>
    //   </div>
    //     </div>
    //     <div >
    //     <div className="flex flex-row justify-evenly">
    //         <div className="min-w-[100px]">
    //             <br />
    //         <label htmlFor="" className="text-m">Prepared By:</label>
    //         <br /><br />
    //         <div class="border-t border-gray-500"></div>
    //         </div>
    //         <div className="min-w-[100px]">
    //         <br />
    //         <label htmlFor="" className="text-m">Approved By:</label>
    //         <br /><br />
    //         <div class="border-t border-gray-500"></div>
    //         </div>
    //         <div className="min-w-[100px]">
    //         <br />
    //         <label htmlFor="" className="text-m">Received By:</label>
    //         <br /><br />
    //         <div class="border-t border-gray-500"></div>
    //         </div>
            
    //     </div>
    //     </div>
    //         </div>

    //     </div>
    )
}