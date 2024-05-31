import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router}  from "@inertiajs/react";
export default function PrintReceiving({auth, receiving,receiving_items,queryParams}){
    console.log("receiving" + receiving)
    console.log( "receiving_items" + receiving_items)
    queryParams = queryParams || {};
  const searchFieldChanged = (name, value, ) => {
    if(value){
      queryParams[name] = value;
    }
    else{
      delete queryParams[name];
    }
    // change the url path everytime option changes
    router.get(route('item.index'), queryParams)
  };
// alert(receiving_brand_names)
  const onKeyPress = (name, e) => {
    if(e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
  }
  const showAll = ()=>{

    if(value == 'all'){

    }
  }
// sorting functions
  const sortChanged = (name) => {
    if(name === queryParams.sort_field) {
      if(queryParams.sort_direction === 'desc'){
        queryParams.sort_direction ='asc'
      }else{
        queryParams.sort_direction = 'desc'
      }
    }
    // sorting the different fields
    else{
        queryParams.sort_field = name;
        queryParams.sort_direction = "desc";
    }
    router.get(route('receiving.index'), queryParams)
  }
    return(
        <div className="m-5"
        >
        <Head title={`Receiving "${receiving.id}" `}/>
          
          <div className="py-2 bg-white capitalize">
          
              <div className=" max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3  gap-2">
                  <div className=" overflow-hidden shadow-sm sm:rounded-lg col-span-3 ">
                  <div className="flex mb-8 items-center bg-white justify-between">
                  <div className="flex justify-between items-center">
                      <h2 className="font-extrabold text-2xl text-blue-700 underline leading-snug">D.B International Sales & Services Inc.</h2>
                  </div>
                  <div>
                    <h2 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                      Material Receiving Report 
                  </h2>
                  </div>
                
                </div>
                    <h3>430 Lt. Artiaga St., San Juan Metro Manila, Philippines 1500</h3>
                    <h3>Tel. No.: (+63)8723-4461 to 64, Fax No.:(+632)8723-2782, (+632) 8723-4467</h3>

                    <div class="mt-10 grid grid-cols-3 gap-2 leading-7">
                        <div className="mx-2">
                          <div >
                          <label
                          className="font-light mx-2  text-md "
                          htmlFor="ReceivingId">
                          Supplier: 
                          </label>  
                            <span>{receiving.client_id}</span> 
                          </div>
                        <div >
                          <label
                            className="font-light mx-2  text-md"
                              htmlFor="ReceivingId">SI No :</label>  
                          <span>{receiving.si_no}</span>
                        </div>
                        <div>
                          <label
                              className="font-light mx-2  text-md"
                                htmlFor="ReceivingId">Address :</label>  
                            <span>{receiving.address}</span>
                        </div>
                        </div>
                        <div>
                          <div>
                            <label
                                className="font-light mx-2  text-md"
                                  htmlFor="ReceivingId">DR No. :</label>  
                              <span>{receiving.dr_no}</span>
                          </div>
                          <div>
                            <label
                                className="font-light mx-2  text-md"
                                  htmlFor="ReceivingId">MRR No. :</label>  
                              <span>{receiving.mrr_no}</span>
                          </div>
                        </div>
                        <div>
                          <div>
                              <label
                                  className="font-light mx-2 text-md"
                                    htmlFor="ReceivingId">RR No. :</label>  
                                <span>RR NO</span>
                            </div>
                            <div>
                              <label
                                  className="font-light mx-2  text-md"
                                    htmlFor="ReceivingId">Date :</label>  
                                <span>{receiving.created_at}</span>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-3">
                          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
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
                                              {receiving_item.id}
                                          </td>
                                          <td className="px-3 py-2 text-nowrap">
                                          {receiving_item.category ? receiving_item.category.sku_prefix : ''}-{receiving_item.sku}
                                          </td>
                                          <td className="px-3 py-2 text-nowrap">
                                            {receiving_item.quantity}
                                          </td>
                                          <td className="px-3 py-2 text-nowrap">
                                            {receiving_item.uom}
                                          </td>
                                          <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                            <Link href={route('item.show', receiving_item.id)}>
                                            {receiving_item.name}
                                            </Link>
                                          </th>
                                          <td className="px-3 py-2 text-wrap">
                                            {receiving_item.description}
                                          </td>
                                      </tr>
                                  ))}
                                  </>
                                )}
                              </tbody>
                          </table>
                        
                        </div> 
                  </div>
                </div>
                      
                </div>
              </div>
          </div>
        </div>
    )
}