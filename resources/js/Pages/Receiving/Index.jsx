
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import { Alert} from "@material-tailwind/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head,Link, router} from "@inertiajs/react" ;
import React from "react";
export default function Index({auth,receivings,  queryParams = null, success}) {
  const [open, setOpen] = React.useState(true);
queryParams = queryParams || {};
  const searchFieldChanged = (name, value, ) => {
    if(value){
      queryParams[name] = value;
    }
    else{
      delete queryParams[name];
    }
    // change the url path everytime option changes
    router.get(route('receiving.index'), queryParams)
  };

  const onKeyPress = (name, e) => {
    if(e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
  }
  console.log(receivings)
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
const deleteReceiving = (receiving) => {
  // console.log(receiving)
  if(!window.confirm("Are you sure you want to delete  the receiving")){
    return;
  }
  router.delete(route('receiving.destroy', receiving.id))
}

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <div className="flex justify-between receivings-center">
        <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">Material Receiving Report</h2>
              <Link href={route('receiving.create')} className="flex flex-nowrap gap-2 font-semibold bg-green-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-green-700">
                 Add New
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
            </Link>
             
             
   
      </div>
  }
    >
      {/* head displayed together with the appname */}
       <Head title="Receivings" />
      <div className="py-12">
          <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 relative">
          {success && (
                 <Alert
                 className=" absolute w-11/12 z-50 px-4 py-4 mb-5 rounded text-slate-800 bg-green-100 ring-2 ring-green-800"
                 open={open}
                 onClose={() => setOpen(false)}
                 animate={{
                   mount: { y: 0 },
                   unmount: { y: 100 },
                 }}
               > {success}</Alert>
            )}
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                              <TableHeading  className="pr-10"  name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>ID</TableHeading>
                              <TableHeading  className="pr-10"  name="sku"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>MMR No. </TableHeading>
                               {/* <TableHeading  className="pr-10"  name="sku"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Item IDs </TableHeading> */}
                                    <TableHeading  className="pr-10"  name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Client ID </TableHeading>
                                <TableHeading  className="pr-10"   name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>S.I. No.</TableHeading>
                                <TableHeading  className="pr-2"   name="brand_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>D.R No.</TableHeading>
                               <TableHeading className="pr-10"  name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Address</TableHeading>
                              <TableHeading  className="pr-10"  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Remarks</TableHeading>
                                {/* <TableHeading  className="pr-10"  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Created By</TableHeading> */}
                              <TableHeading  className="pr-10"  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Action</TableHeading>
                              </tr>
                            </thead>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                {/* <th className="px-3 py-3 w-full" >
                                  <TextInput  className="max-w-full" 
                                  defaultValue={queryParams.name}
                                  placeholder="Receiving Name " 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                </th> */}
                                <th className="px-3 py-3 text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {receivings.data.map((receiving)=>(
                                   <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={receiving.id}>
                                      <td className="px-3 py-2">
                                      <Link href={route('receiving.show', receiving.id)}>
                                      {receiving.id}
                                        </Link>
                                          
                                      </td>
                                      <td className="px-3 py-2">
                                      <Link href={route('receiving.show', receiving.id)}>
                                      {receiving.mrr_no}
                                        </Link>
                                      </td>
                                      {/* <td className="px-3 py-2">
                                        {receiving.group_item_id}
                                      </td> */}
                                      <td className="px-3 py-2">{receiving.client_id}</td>
                                      <td className="px-3 py-2">{receiving.si_no}</td>
                                      <td className="px-3 py-2">{receiving.dr_no}</td>
                                      <td className="px-3 py-2">{receiving.address}</td>
                                      <td className="px-3 py-2">{receiving.remarks}</td>
                                      {/* <td className="px-3 py-2">{receiving.created_by}</td> */}
                                      <td className="px-3 py-2 text-nowrap">
                                          <div className="flex">
                                              <Link href={route('receiving.edit', receiving.id)} className="p-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white hover: rounded-full hover:underline mx-1"> 
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                  </svg>
                                              </Link>
                                              <button 
                                                  onClick={(e) =>deleteReceiving(receiving)}
                                                  className="font-medium text-red-600 p-2 hover:bg-red-600 hover:text-white hover: rounded-full  hover:underline mx-1"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                </svg>
                                              </button>
                                          </div>
                                    </td>
                                  </tr>
                              ))}
                            </tbody>
                        </table>
                      </div> 
                      
              
                 </div>
                 {/* pagination not visible */}
                 <Pagination links={receivings.meta.links} />
              </div>
              <div>
                  </div>
          </div>
      </div>
    </AuthenticatedLayout>
  )
}
