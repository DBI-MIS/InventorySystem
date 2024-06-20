
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import { Alert} from "@material-tailwind/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head,Link, router} from "@inertiajs/react" ;
import React from "react";
import TextInput from "@/Components/TextInput";
export default function Index({auth,receivings, queryParams = null, success}) {
  const [open, setOpen] = React.useState(true);
queryParams = queryParams || {};
  const searchFieldChanged = (mrr_no, value, ) => {
    if(value){
      queryParams[mrr_no] = value;
    }
    else{
      delete queryParams[mrr_no];
    }
    // change the url path everytime option changes
    router.get(route('receiving.index'), queryParams)
  };

  const onKeyPress = (mrr_no, e) => {
    if(e.key !== 'Enter') return;

    searchFieldChanged(mrr_no, e.target.value);
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
   
      </div>
  }
    >
       <Head title="Receivings" />
       <div className="py-5">
          <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 relative">
            <div className="max-w-5/6">
              {success && (
                  <Alert
                  className=" absolute z-50 w-11/12 px-4 py-4 mb-5 rounded text-slate-800 bg-green-100 ring-2 ring-green-800"
                  open={open}
                  onClose={() => setOpen(false)}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                  }}
                > {success}</Alert>
              )}
            </div>
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <div className="w-full flex flex-row justify-between items-center mb-2">
                            <div>
                              <Link href={route('receiving.create')} className="flex flex-nowrap gap-2 font-semibold bg-blue-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg> New MRR
                              </Link>
                            </div>
                            <div className="flex flex-row items-center relative">
                              <div className="absolute pointer-events-none right-2">
                                <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                              </div>
                              <TextInput  className="w-[500px]" 
                                      defaultValue={queryParams.mrr_no}
                                      placeholder="Search MRR Here" 
                                      onBlur={(e) => searchFieldChanged('mrr_no', e.target.value)}
                                      onKeyPress={(e) => onKeyPress('mrr_no', e )}/>
                            </div>
                          </div>
                    
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                                <TableHeading  className="pr-10" name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >ID</TableHeading>
                                <TableHeading  className="pr-10" name="sku"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >MRR No. </TableHeading>
                                <TableHeading  className="pr-10" name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                 sortChanged={sortChanged}
                                >Client Name</TableHeading>
                                  <TableHeading  className="pr-10"  name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >S.I. No.</TableHeading>
                                  <TableHeading  className="pr-2"  name="deliver"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >D.R No.</TableHeading>
                                {/* <TableHeading className="pr-10" name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >Remarks</TableHeading> */}
                                <TableHeading className="pr-10" name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >Status</TableHeading>
                                <TableHeading  className="pr-10" name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >Action</TableHeading>
                              </tr>
                            </thead>
                            
                            <tbody>
                              {receivings.data.map((receiving, index)=>(
                                   <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/20'} border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700`} key={receiving.id}>
                                      <td className="w-[50px] py-2 text-center">
                                      <Link href={route('receiving.show', receiving.id)}>
                                      {receiving.id}
                                        </Link>
                                          
                                      </td>
                                      <td className="w-[180px] py-2 text-nowrap hover:underline pl-4">
                                      <b>
                                        <Link href={route('receiving.show', receiving.id)} >
                                          {receiving.mrr_no}
                                        </Link>
                                      </b>
                                      </td>
                                      
                                      <td className="w-[300px] py-2 text-nowrap pl-4">{receiving.client && receiving.client.name ? receiving.client.name : "No Client Name"}</td>
                                      <td className="w-[180px] py-2 text-nowrap pl-4">{receiving.si_no ?? "No SI Number"}</td>
                                      <td className="w-[180px] py-2 text-nowrap pl-4">{receiving.deliver && receiving.deliver.dr_no ? receiving.deliver.dr_no : " No DR Number "}</td>
                                      {/* <td className="w-[300px] py-2 text-wrap pl-4">{receiving.remarks ?? "No Remarks"}</td> */}
                                      <td className="w-[180px] py-2 text-nowrap pl-4">{receiving.status ?? "No Status"}</td>
                                      <td className="w-[100px] py-2 text-nowrap">
                                          <div className="w-[100px] flex flex-row justify-end items-center">
                                              <Link href={route('receiving.edit', receiving.id)} className="text-blue-600 mx-1 hover:text-gray-600"> 
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                  </svg>
                                              </Link>
                                              <button 
                                                  onClick={(e) =>deleteReceiving(receiving)}
                                                  className="text-red-600 mx-1 hover:text-gray-600"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
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
