import MrrLogo from "@/Components/MrrLogo";
import {Head, Link}  from "@inertiajs/react";
export default function PrintReceiving({ receiving,receiving_items,queryParams}){
    console.log(receiving);
    console.log(receiving.created_at);
    console.log( "receiving_items" + receiving_items)
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
               <div>
                <h2 class="font-extrabold text-xl  text-gray-800  dark:text-gray-200 leading-tight">Material Receiving Report </h2>
                </div>
                </div>
                <h3 class="text-xs ">430 Lt. Artiaga St., San Juan Metro Manila, Philippines 1500</h3>
                <h3 class="text-xs ">Tel. No.: (+63)8723-4461 to 64, Fax No.:(+632)8723-2782, (+632) 8723-4467</h3>

                <div class="mt-3 grid grid-cols-3 gap-4 leading-7">
                    <div class="font-light text-xs md:text-sm">
                        <div>
                            <label for="ReceivingId">Supplier:</label>
                            <span className="mx-2">{receiving.client_id}</span>
                        </div>
                        <div>
                            <label for="ReceivingId">SI No :</label>
                            <span  className="mx-2">{receiving.si_no}</span>
                        </div>
                        
                    </div>
                    <div className="font-light text-xs md:text-sm">
                        <div>
                            <label for="ReceivingId">DR No. :</label>
                            <span  className="mx-2">{receiving.deliver.dr_no}</span>
                        </div>
                        <div>
                            <label for="ReceivingId">MRR No. :</label>
                            <span  className="mx-2">{receiving.mrr_no}</span>
                        </div>
                    </div>
                    <div  className="font-light text-xs md:text-sm">
                        <div>
                            <label for="ReceivingId">RR No. :</label>
                            <span  className="mx-2">RR NO</span>
                        </div>
                        <div>
                            <label for="ReceivingId">Date :</label>
                            <span  className="mx-2">{receiving.created_at}</span>
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
                                      <th class=" py-3 min-w-[120px] border border-gray-500">REF NO.</th>
                                      <th class=" py-3 border border-gray-500">QTY</th>
                                      <th class=" py-3 border border-gray-500">UNIT</th>
                                      <th class=" py-3 w-[200px] border border-gray-500">ITEM NAME</th>
                                      <th class=" py-3 w-full  border border-gray-500">DESCRIPTION</th>
                                  </tr>
              </thead>
                <tbody>
                    {receiving_items && receiving_items.length !== 0 && (
                    <>
                    {receiving_items.map((receiving_item, index)=>(
                        <tr class="  bg-white border-b  dark:border-gray-700" key={receiving_item.id}>
                            <td class="border text-xs border-gray-500 px-1 py-2 font-light   text-gray-800 whitespace-nowrap dark:text-white">{index + 1}</td>
                            <td class="border text-xs border-gray-500 px-1 py-2 font-light  text-gray-800 whitespace-nowrap dark:text-white"></td>
                            <td class="border text-xs border-gray-500 px-1 py-2  font-light text-gray-800 whitespace-nowrap dark:text-white">{receiving_item.quantity}</td>
                            <td class="border text-xs border-gray-500 px-1 py-2  font-light text-gray-800 whitespace-nowrap dark:text-white">{receiving_item.uom}</td>
                            <th class="border text-xs border-gray-500 px-1 py-2 font-light text-gray-800 whitespace-nowrap dark:text-white">
                                <Link href={route('item.show', receiving_item.id)}>{receiving_item.name}</Link>
                            </th>
                            <td class=" text-xs border border-gray-500 px-1 py-2 font-light text-gray-900 whitespace-nowrap text-wrap">{receiving_item.description ?? "No Description"}</td>
                        </tr>
                    ))}
                    </>
                    )}
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


      
    )
}