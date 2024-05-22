import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router}  from "@inertiajs/react";
export default function Show({auth, receivingItem,reference_no,receiving_item_ids, category,onlySoftDeletedReceivingItems,tryDeleted, queryParams, success}){
    console.log(receivingItem)
    console.log(reference_no)
    console.log(receiving_item_ids)
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
      router.get(route('item.index'), queryParams)
    }
    return(
        <AuthenticatedLayout 
        user={auth.user}
        header={
            <div className="flex receivingItems-center justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`ReceivingItems "${receivingItem.id}" `}
            </h2>
             <Link href={route('receivingItem.edit', receivingItem.id)} className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
            Edit
             </Link>
           
            </div>
            }
        >
        <Head title={`ReceivingItems "${receivingItem.name}" `}/>
        <div className="py-12 capitalize">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 font-bold gap-2">
            <div>
                      {  onlySoftDeletedReceivingItems }
                    </div>
                    <div>
                      <h1>{tryDeleted}</h1>
                    </div>
                {/* card #1 */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2 ">
              
                        <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-row justify-between">
                            <div className="flex flex-col pb-3 mt-2">
                            <label
                            className="font-bold text-lg"
                            htmlFor="ReceivingItemId"></label>
                            {/* <span className="text-2xl font-semibold ">{receivingItem.name}</span> */}
                            </div>
                            <div className="w-[90px]">
                                            <label className="font-light text-md"
                                            >ReceivingItem ID: </label>
                                            <span className="font-light">{receivingItem.id}</span>
                            </div>
                            </div>
                            
                                    
                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Reference No: </dt>
                            <dd className="text-lg font-light">{receivingItem.reference_no}</dd>
                            </div>
                            

                        </dl>
                        
                        
                </div>
            
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-3">
                        {/* TABLE */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                              <TableHeading  className="pr-10"  name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>ID</TableHeading>
                              <TableHeading  className="pr-10"  name="sku"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Sku </TableHeading>
                                <TableHeading  className="pr-10"   name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Name</TableHeading>
                                <TableHeading  className="pr-2"   name="brand_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Brand</TableHeading>
                                <TableHeading className="pr-10"  name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Category</TableHeading>
                                <TableHeading  className="pr-10"  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Qty</TableHeading>
                                <TableHeading className="px-3 py-3 text-right">Actions</TableHeading>
                              </tr>
                            </thead>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3 w-full" >
                                  <TextInput  className="max-w-full" 
                                  defaultValue={queryParams.name}
                                  placeholder="Item Name " 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                </th>
                            
                            
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3 text-right"></th>
                              
                              </tr>
                            </thead>
                            <tbody>
                              {receiving_item_ids.map((receiving_item_id)=>(
                                   <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={receiving_item_id.id}>
                                      <td className="px-3 py-2">
                                          {receiving_item_id.id}
                                      </td>
                                      <td className="px-3 py-2">
                                        {receiving_item_id.sku_prefix}-{receiving_item_id.sku}
                                      </td>
                                      <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                        <Link href={route('receivingItem.show', receivingItem.id)}>
                                        {receiving_item_id.name}
                                        </Link>
                                      </th>
                                      <td className="px-3 py-2">{receiving_item_id.brand_id}</td>
                                      <td className="px-3 py-2">{receiving_item_id.category_id}</td>
                                      <td className="px-3 py-2">{receiving_item_id.quantity} {receiving_item_id.uom} </td>
                                  
                                  </tr>
                              ))}
                            </tbody>
                        </table>
                      </div> 
                 </div>
                 {/* pagination not visible */}
                 {/* <Pagination links={receiving_item_ids.meta.links} /> */}
              </div>
                    
              </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}