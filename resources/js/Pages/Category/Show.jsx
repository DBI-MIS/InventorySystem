import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link}  from "@inertiajs/react";
export default function Show({auth, item, queryParams, tasks, success}){
    console.log(item)
    return(
        <AuthenticatedLayout 
        user={auth.user}
        header={
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Item "${item.data.name}" `}
            </h2>
             {/* <Link href={route('item.edit', item.id)} className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
            Edit
             </Link> */}
            </div>
            }
        >
        <Head title={`Item "${item.name}" `}/>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
            {/* card #1 */}
              <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg  col-span-2">
                    <div className="p-6 text-gray-900 dark:text-gray-100 ">
                        <label
                        className="font-bold text-lg"
                         htmlFor="ItemId"></label>
                        <span className="mt-1 text-2xl font-semibold">{item.data.name}</span>
                        <div className="mt-12"> 
                            <label
                            className="font-bold text-lg"
                            htmlFor="ItemId">Description</label>
                            <span className="mt-1">{item.data.description}</span>
                        </div>
                                
                    </div>
              </div>
              {/* card #2 */}
            <div className="bg-white  dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ml-2 col-span-1">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                    <div className="grid gap-1 grid-cols-1 mt-2">
                    <div className="">
                           <div className="grid grid-cols-2">
                                <div className="flex gap-x-2">
                                        <label className="font-bold text-md"
                                        >ID</label>
                                        <span className="mt-1">{item.data.id}</span>
                                        
                                    </div>
                                    <div className="flex gap-x-2">
                                    <label className="font-bold text-md"
                                        >Sku</label>
                                    <span className="mt-1">{item.data.sku}</span>
                                    </div>
                           </div>
                            <div className="flex gap-x-2">
                                <label
                                 className="font-bold text-md"
                                 htmlFor="ItemId">Status:</label>
                                 <span className="mt-1">dummy status</span>
                            </div>
                            <div className="flex gap-x-2">
                                <label
                                 className="font-bold text-md"
                                 htmlFor="ItemId">Created By:</label>
                                 <span className="mt-1">dummy value</span>
                            </div>
                            <div className="flex gap-x-2">
                                <label className="font-bold text-md"
                                >Updated By:</label>
                                <span className="mt-1">dummy value</span>
                            </div>
                        </div>
                    </div>
                   
                    </div>
                </div>
                {/* card #3 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg  col-span-2">
                    <div>
                        <div className="p-6 ">
                            <label
                            className="font-bold text-lg"
                            htmlFor="specs">Specs:</label>
                            <span className="mt-1 text-md font-semibold">{item.data.specs}</span>
                           
                        </div>
                        <div  className="grid gap-1 grid-cols-2 px-6 ">
                            <div className="flex gap-2">
                                <label
                                className="font-bold text-lg"
                                htmlFor="ItemId">Brand</label>
                                <span className="mt-1">{item.data.brand_id}</span>
                            </div>
                            <div className="flex gap-2">
                                <label
                                className="font-bold text-lg"
                                htmlFor="ItemId">Category</label>
                                <span className="mt-1">{item.data.category_id}</span>
                            </div>
                            <div className="flex gap-2">
                                <label
                                className="font-bold text-lg"
                                htmlFor="ItemId">Part Number</label>
                                <span className="mt-1">{item.data.part_no}</span>
                            </div>
                            <div className="flex gap-2">
                                <label
                                className="font-bold text-lg"
                                htmlFor="ItemId">Serial Number</label>
                                <span className="mt-1">{item.data.serial_no}</span>
                            </div>
                            <div className="flex gap-2">
                                <label
                                className="font-bold text-lg"
                                htmlFor="ItemId">model_no</label>
                                <span className="mt-1">{item.data.model_no}</span>
                            </div>
                        </div>
                         {/* card5 */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg  col-span-1">
                            <div className="p-6 ">
                                <label
                                className="font-bold text-lg"
                                htmlFor="ItemId">Remarks:</label>  <span>{item.data.remarks}</span>
                        </div>
                     </div>
                                
                    </div>
                     
              </div>
                {/* end card #3 */}
                {/* card #4 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg  col-span-1 ml-2">
                    <div>
                        <div className="p-6 ">
                            <label
                            className="font-bold text-lg"
                            htmlFor="ItemId">Quantity</label>
                            <span className="mt-1 text-2xl font-semibold">{item.data.quantity}  <span>{item.data.uom}</span></span>
                            <div>
                            <label
                            className="font-bold text-lg"
                            htmlFor="ItemId">Location</label>
                            <span className="mt-1">{item.data.location}</span>
                            </div>
                            <div>
                            <label
                            className="font-bold text-lg"
                            htmlFor="ItemId">Assigned Employee:</label>
                            <span className="mt-1">{item.data.employee_id}</span>
                            </div>
                        </div>
                                
                    </div>
                  
              </div>
                 {/* end card #4 */}
                 {/* card #5 */}
                 

            </div>
        </div>

        <div className="pb-12">
         
        </div>
        </AuthenticatedLayout>
    )
}