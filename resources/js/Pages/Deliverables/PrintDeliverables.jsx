import MrrLogo from "@/Components/MrrLogo";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router}  from "@inertiajs/react";
export default function PrintDeliverables({ deliverable,deliverable_items,queryParams}){
    console.log(deliverable);
    console.log(deliverable.created_at);
    console.log( "deliverable_items" + deliverable_items)
    return(
        <div className="m-5  "
        >
        <Head title={`deliverable "${deliverable.id}" `}/>
       
     <div class="py-5 p-16 bg-white capitalize print:p-0">
        <div class="max-w-full mx-auto  text-gray-900 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div class="overflow-hidden shadow-sm sm:rounded-lg col-span-3">
                <div class="flex  mb-1  items-center bg-white justify-between ">
                <div className="shrink-0 flex items-center">
                   <span className="px-[3px]"> <b>Company:</b></span><MrrLogo className="block h-[32px] " />
                   
                </div>
              
                </div>
                <div>
                    <hr class="border-t border-[1px] w-full my-2 border-gray-900 dark:border-gray-900"/>
                </div>
                
                
                
                

                <div class="flex flex-row justify-between">
                    <div class="font-light text-xs md:text-sm">
                    <div>
                <span className="px-[3px]"> <b>Project:</b></span> <span className="mx-2">{deliverable.client.name}</span>
                </div>
                <br />
                <div>
                <span className="px-[3px]"> <b>Address:</b></span> <span className="mx-2">{deliverable.address}</span>
                </div>
                        
                    </div>
                    
                    <div  className="font-light text-xs md:text-sm">
                        <div>
                            <label for="ReceivingId">DR No. :</label>
                            <span  className="mx-2">{deliverable.dr_no}</span>
                        </div>
                        <div>
                            <label for="ReceivingId">RS No. :</label>
                            <span  className="mx-2">{deliverable.rs_no}</span>
                        </div>
                        <div>
                            <label for="ReceivingId">Date :</label>
                            <span  className="mx-2">{deliverable.dr_date}</span>
                        </div>
                    </div>
                </div>
                
            </div> 
          {/* item table */}
        </div>
        <br />
        <div>
                <h1 class="font-extrabold text-xl  text-gray-900 text-center  dark:text-gray-200 leading-tight">DELIVERY RECEIPT </h1>
                </div>
        <br />
        
        <table class="  px-20 w-full mx-auto text-sm text-left rtl:text-right border-solid border border-gray-800 text-gray-500 ">
              <thead class="text-xs text-gray-700  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr class="text-center">
                                      <th class=" py-3 border   border-gray-500">#</th>
                                      <th class=" py-3 border min-w-[80px] border-gray-500">QTY</th>
                                      <th class=" py-3 border min-w-[60px] border-gray-500">UNIT</th>
                                      <th class=" py-3 min-w-[150px] border border-gray-500">ITEM NAME</th>
                                      <th class=" py-3 w-full  border border-gray-500">ITEM DESCRIPTION</th>
                                  </tr>
              </thead>
                <tbody>
                    {deliverable_items && deliverable_items.length !== 0 && (
                    <>
                    {deliverable_items.map((deliverable_item, index)=>(
                        <tr class="  bg-white border-b  dark:border-gray-700" key={deliverable_item.id}>
                            <td class="border text-xs border-gray-500 px-1 py-2 font-light   text-gray-800 whitespace-nowrap dark:text-white">{index + 1}</td>
                            
                            <td class="border text-xs border-gray-500 px-1 py-2  font-light text-gray-800 whitespace-nowrap dark:text-white">{deliverable_item.quantity}</td>
                            <td class="border text-xs border-gray-500 px-1 py-2  font-light text-gray-800 whitespace-nowrap dark:text-white">{deliverable_item.uom}</td>
                            <th class="border text-xs border-gray-500 px-1 py-2 font-light text-gray-800 whitespace-nowrap dark:text-white">
                                <Link href={route('item.show', deliverable_item.id)}>{deliverable_item.name}</Link>
                            </th>
                            <td class=" text-xs border border-gray-500 px-1 py-2 font-light text-gray-900 whitespace-nowrap text-wrap">{deliverable_item.description}</td>
                        </tr>
                    ))}
                    </>
                    )}
              </tbody>
        </table>
        <div className="mt-5 text-gray-900 font-light text-xs ">
        <div>
           <label for="ReceivingRemarks">Remarks :</label>
             <span>{deliverable.remarks}</span>
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
            <label htmlFor="" className="text-m">Checked By:</label>
            <br /><br />
            <div class="border-t border-gray-500"></div>
            </div>
            <div className="min-w-[100px]">
            <br />
            <label htmlFor="" className="text-m">Received By:</label>
            <br /><br />
            <div class="border-t border-gray-500"></div>
            </div>
             <div className="text-center min-w-[250px]">
            <label htmlFor="" className="text-m min-w-[250px]"><b>Received the above Items in good condition.</b></label>
            <br /><br />
            <div class="border-t border-gray-500 text-m"><b>SIGN OVER PRINTED NAME</b></div>
            <span className="text-[10px]">Distributions: 1st Copy -</span><span className="text-[10px]">Office 2nd Copy - Client</span>
            </div>
            
        </div>
        </div>
        
      
     </div>
     
</div>


      
    )
}