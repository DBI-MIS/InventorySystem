
import PaginationReceiving from "@/Components/PaginationReceiving";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router}  from "@inertiajs/react";
export default function Show({auth, receiving,receiving_items,paginationData, queryParams}){
    console.log("receiving" + receiving)
    console.log( "receiving_items" + receiving_items)

    receiving_items = Array.isArray(receiving_items) ? receiving_items : [];

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
        <AuthenticatedLayout 
        user={auth.user}
        header={
            <div className="flex receivings-center justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Material Receiving Report " ${receiving.id} " `}
            </h2>
            </div>
            }
        >
        <Head title={`Receiving "${receiving.id}" `}/>
        <div className="flex float-end mb-5 px-10 gap-2 ">
            <Link href={route('preview.index',receiving.id)}
           className="bg-blue-500 py-2 px-6 text-white rounded shadow transition-all hover:bg-blue-700">
              Preview MRR
           </Link>
           <Link href={route('generate-pdf.generatePDF')} className="bg-blue-500 py-2 px-6 text-white rounded shadow transition-all hover:bg-blue-700">
               Print MRR
           </Link>
          </div>
        <div className="py-12 capitalize">
          
            <div className="mt-5 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 font-bold gap-2">
                {/* card #1 */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2 ">
                    <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col pb-3 mt-2">
                            <label
                            className="font-bold text-lg"
                            htmlFor="ReceivingId"></label>
                          </div>
                        
                        </div>
                        <div className="flex flex-col pb-3 mt-2">
                          <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">CLIENT NAME: </dt>
                          <dd className="text-lg font-light">{receiving.client_id}</dd>
                        </div>
                        <div className="flex flex-col pb-3 mt-2">
                          <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">MRR ID : </dt>
                          <dd className="text-lg font-light">{receiving.mrr_no}</dd>
                        </div>
                      </dl>
                </div>
                {/* card #2 */}
                <div className="bg-white  dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ml-2 col-span-1">
                    <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  
                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">S.I NUMBER : </dt>
                            <dd className="text-lg font-light">{receiving.si_no}</dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">D.R NUMBER : </dt>
                            <dd className="text-lg font-light">{receiving.dr_no}</dd>
                            </div>
                            <div className="w-[90px]">
                              <label className="font-light text-md"
                              >Receiving ID: </label>
                              <span className="font-light">{receiving.id}</span>
                          </div>
                            <div className="flex flex-row pb-3 mt-2">
                            <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">MRR NO: </dt>
                            <dd className="text-lg font-light uppercase ml-2">{receiving.mrr_no}</dd>
                            </div>
                    
                    </dl>
                </div>
                {/* card #3 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-3">
                            {/* card5 */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-2 h-[200px]">
                        <div className="p-6 ">
                                    <label
                                    className="font-light text-md"
                                    htmlFor="ReceivingId">Address :</label>  <span>{receiving.address}</span>
                            </div>
                            <div className="px-6 py-2 ">
                                    <label
                                    className="font-light text-md"
                                    htmlFor="ReceivingId">Remarks :</label>  <span>{receiving.remarks}</span>
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
                              <TableHeading className="pr-10"  name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Location</TableHeading>
                                <TableHeading  className="pr-10"  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Quantity</TableHeading>
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
                                        <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                          <Link href={route('item.show', receiving_item.id)}>
                                          {receiving_item.name}
                                          </Link>
                                        </th>
                                        <td className="px-3 py-2 text-nowrap">
                                          {receiving_item.brand ?receiving_item.brand.name : 'No Brand Name'}
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">
                                          {receiving_item.category ?receiving_item.category.name : 'No Category Name'}
                                        </td>
                                        <td className="px-3 py-2"> {receiving_item.location ? receiving_item.location.name : 'No Location'}</td>
                                        <td className="px-3 py-2 text-nowrap">{receiving_item.quantity} {receiving_item.uom} </td>
                                    </tr>
                                ))}
                                </>
                               )}
                            </tbody>
                        </table>
                      </div> 
                 </div>
                 {/* pagination not visible */}
                 <PaginationReceiving links={paginationData.links} />
              </div>
                    
              </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}