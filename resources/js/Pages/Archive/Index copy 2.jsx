
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { Alert} from "@material-tailwind/react";
import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head,Link, router} from "@inertiajs/react";
import { useState } from "react";
import Modals from "@/Components/Modals";
import { useEffect } from "react";

export default function Index({auth,items,receivings,trashedItems, queryParams = null, success,deleteItem,item, setOpenModal}) {

  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false); // Hide 
    }, 1000);
  
    return () => clearTimeout(timer); // Clear the timeout when component unmounts or updates
  }, [success]);


  queryParams = queryParams || {};


  const searchFieldChanged = (name, value) => {
    if(value){
      queryParams[name] = value;
    }
    else{
      delete queryParams[name];
    }
    // change the url path everytime option changes
    router.get(route('archive.index'), queryParams)
  };

  const onKeyPress = (name, e) => {
    if(e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
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
    router.get(route('archive.index'), queryParams)
  }

  const handleRestore = (item) => {
    // console.log(item)
    if(!window.confirm("Are you sure you want to restore")){
      return;
    }
    
    router.show(route('archive.show',item.id, "item"))
  }
  // handleRestoreMRR
  const handleRestoreMRR= (receiving) => {
    // console.log(item)
    if(!window.confirm("Are you sure you want to restore")){
      return;
    }
    router.show(route('archive.show', receiving.id, "receiving"))
  }
  // deleteConfirmation modal
 const [id, setId] = useState(null);
 const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

const showDeleteModal = (id) => {
 
  setId(id);
  setDisplayConfirmationModal(true);
  
};
const submitDelete = (id) => {
  console.log(id);
  if (id === null) {
    return;
  }
  router.delete(route('archive.destroy', id))
 
  setDisplayConfirmationModal(false);
  setShowModal(false);
};

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
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">Inventory Trash</h2>
      </div>
    }
    >
      {/* head displayed together with the appname */}
       <Head title="Deleted Items" />
      <div className="py-12">
          <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 relative">
            {success && (
                  <Alert
                  className=" absolute z-50 px-4 py-4 mb-5 rounded text-slate-800 bg-green-100 ring-2 ring-green-800"
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
                        <div className="float-right mb-5">
                          <div className="flex flex-row items-center relative">
                          <div className="absolute pointer-events-none right-2"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                          </div>
                          <TextInput  className="w-[500px]" 
                                  defaultValue={queryParams.name}
                                  placeholder="Search Item Name Here" 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                  
                                
                          </div>
                          
                          </div>
                    
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                        <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="">
                              <TableHeading  
                                className=""  
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >ID</TableHeading>

                              <TableHeading  
                                className=""  
                                name="sku"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >Sku </TableHeading>

                              <TableHeading  
                                className=""  
                                 name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >Name</TableHeading>

                              <TableHeading  
                                className=""  
                                 name="brand_id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >Brand</TableHeading>

                              <TableHeading 
                                className=""  
                                name="category_id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >Category</TableHeading>

                              <TableHeading  
                                className=""  
                                name="quantity"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >Qty</TableHeading>
                              <div className="text-right">Actions</div>

                              </tr>
                            </thead>
                            <tbody>
                              {items.data.map((item)=>(
                                   <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                   <td className="w-[50px] py-2">
                                       {item.id}
                                   </td>
                                   <td className="w-[200px] py-2 text-nowrap">
                                      {item.sku_prefix ? item.sku_prefix: 'No Sku Prefix'}-{ item.sku }
                                   </td>
                                   <th className="w-[800px] py-2 text-gray-600  hover:underline">
                                     {item.name ? item.name : 'No Item Name '}
                                   </th>
                                   <td className="w-[300px] py-2">
                                      {item.brand ? item.brand.name : 'Not Belong on Any Brand'}
                                    </td>
                                   <td className="w-[300px] py-2">
                                      {item.category ? item.category.name : 'Not Belong on Any Category'}
                                    </td>
                                   <td className="w-[100px] py-2 text-nowrap">
                                    {item.quantity ? `${item.quantity} ${item.uom}` : 'Quantity not available'}
                                    </td>
                                   <td className="w-[100px] py-2 text-nowrap">
                                       <div className="flex flex-row justify-end items-center">
                                        <Link href={route('archive.update', item.id,"item") } className="font-medium py-1 px-2 text-green-600 hover:bg-green-600 hover:text-white hover:rounded-full dark:text-green-500 hover:underline mx-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
                                            </svg>
                                        </Link>
                                        <button
                                            className="px-2 py-1 text-red-500  hover:bg-red-600 hover:text-white hover:rounded-full"
                                            type="button"
                                            onClick={() => {[setShowModal(true),showDeleteModal(item.id)]; }}
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                          </svg>
                                        </button>
                                             {showModal && <Modals setOpenModal={setShowModal} confirmModal={submitDelete} id={id} />}
                                           
                                       </div>
                                 </td>
                               </tr>
                              ))}
                            </tbody>
                        </table>
                    </div> 
                 </div>
                 {/* pagination not visible */}
                 <Pagination links={items.meta.links} />
              </div>

              {/* receivings */}
              <div className="bg-white mt-5 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <div className="float-right mb-5">
                          <div className="flex flex-row items-center relative">
                          <div className="absolute pointer-events-none right-2"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                          </div>
                          <TextInput  className="w-[500px]" 
                                  defaultValue={queryParams.name}
                                  placeholder="Search Item Name Here" 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                  
                                
                          </div>
                          
                          </div>
                    
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                                <TableHeading  className="pr-10" name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >ID</TableHeading>
                                <TableHeading  className="pr-10" name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >MRR No. </TableHeading>
                                <TableHeading  className="pr-10" name="sku"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                                  sortChanged={sortChanged}
                                >Date </TableHeading>
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
                                      <td className="w-[120px] text-nowrap py-2 pl-4">
                                                    {new Date(receiving.created_at ?? "No Date" ).toLocaleDateString()}
                                                    </td>
                                      
                                      <td className="w-[300px] py-2 text-nowrap pl-4">{receiving.client && receiving.client.name ? receiving.client.name : "No Client Name"}</td>
                                      <td className="w-[180px] py-2 text-nowrap pl-4">{receiving.si_no ?? "No SI Number"}</td>
                                      <td className="w-[180px] py-2 text-nowrap pl-4">{receiving.deliver && receiving.deliver.dr_no ? receiving.deliver.dr_no : " No DR Number "}</td>
                                      {/* <td className="w-[300px] py-2 text-wrap pl-4">{receiving.remarks ?? "No Remarks"}</td> */}
                                      <td className="w-[180px] py-2 text-nowrap pl-4">{receiving.status ?? "No Status"}</td>
                                      <td className="w-[100px] py-2 text-nowrap">
                                          <div className="w-[100px] flex flex-row justify-end items-center">
                                          <Link href={route('archive.update', receiving.id, receiving) } className="font-medium py-1 px-2 text-green-600 hover:bg-green-600 hover:text-white hover:rounded-full dark:text-green-500 hover:underline mx-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
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
                 <Pagination links={items.meta.links} />
              </div>


             
              
          </div>
           {/* try */}
           <div className=" px-10 pt-2 w-full">
                <div className="w-full flex flex-row gap-2">
                <div className=" grid grid-cols-2 gap-3 text-center w-full">
              
                <div className="col-span-1 w-full ">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="overflow-auto">
                                    <div className="w-full flex flex-row justify-between items-center mb-2">
                                        <div>
                                            <span className= "text-blue-600 font-bold">ITEM ARCHIVE</span>
                                        </div>
                                        <div className="flex flex-row items-center relative gap-2">
                                            <div>
                                                <th className="flex flex-row cursor-pointer items-center relative"></th>
                                            </div>
                                            <div className="absolute pointer-events-none right-2">
                                                <svg
                                                    fill="none"
                                                    height="24"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle cx="11" cy="11" r="8" />
                                                    <line
                                                        x1="21"
                                                        x2="16.65"
                                                        y1="21"
                                                        y2="16.65"
                                                    />
                                                </svg>
                                            </div>

                                            <TextInput
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Search Here"
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onKeyPress("name", e)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                                        <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                            <tr className="">
                                              <TableHeading  
                                                className=""  
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                              >Name</TableHeading>

                                              <TableHeading  
                                                className=""  
                                                name="sku"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                              >Sku </TableHeading>

                                              <TableHeading  
                                                className=""  
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                              >ID</TableHeading>

                                              <TableHeading  
                                              className="pr-10" 
                                              name="quantity"
                                              sort_field={queryParams.sort_field}
                                              sort_direction={queryParams.sort_direction}
                                              sortChanged={sortChanged}
                                              >Action</TableHeading>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.data.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="text-base font-bold ">  {item.name ? item.name : 'No Item Name '}</td>
                                                    <td className="w-12"> {item.sku_prefix ? item.sku_prefix: 'No Sku Prefix'}-{ item.sku }</td>
                                                    <td className="w-28">
                                                    <p className={`whitespace-no-wrap text-center rounded-lg
                                                     `}>{item.id}</p></td>
                                                    <td className="w-24">
                                                      <div className="flex flex-row justify-end items-center">
                                                      <button data-model-type="item" onClick={() => handleRestore(item.id)}>Restore Item</button>
                                                      <Link to={`/archive/show/${id}/table1`}>
                                                              Restore Table 1
                                                            </Link>
                                                        <Link href={route('archive.update', item.id) } className="font-medium py-1 px-2 text-green-600 hover:bg-green-600 hover:text-white hover:rounded-full dark:text-green-500 hover:underline mx-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
                                                            </svg>
                                                        </Link>
                                                        <button
                                                            className="px-2 py-1 text-red-500  hover:bg-red-600 hover:text-white hover:rounded-full"
                                                            type="button"
                                                            onClick={() => {[setShowModal(true),showDeleteModal(item.id)]; }}
                                                        >
                                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                          </svg>
                                                        </button>
                                                            {showModal && <Modals setOpenModal={setShowModal} confirmModal={submitDelete} id={id} />}
                                                          
                                                      </div>
                                                </td>
                                                        
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                </div>

                <div className="col-span-1 w-full">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="overflow-auto">
                                    <div className="w-full flex flex-row justify-between items-center mb-2">
                                        <div>
                                            <span className="text-blue-600 font-bold">MRR ARCHIVE</span>
                                        </div>
                                        <div className="flex flex-row items-center relative gap-2">
                                            <div>
                                                <th className="flex flex-row cursor-pointer items-center relative"></th>
                                            </div>
                                            <div className="absolute pointer-events-none right-2">
                                                <svg
                                                    fill="none"
                                                    height="24"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle cx="11" cy="11" r="8" />
                                                    <line
                                                        x1="21"
                                                        x2="16.65"
                                                        y1="21"
                                                        y2="16.65"
                                                    />
                                                </svg>
                                            </div>

                                            <TextInput
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Search Here"
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onKeyPress("name", e)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                                        <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                            <tr className="">
                                            <TableHeading  
                                              className="pr-10" 
                                              name="id"
                                              sort_field={queryParams.sort_field}
                                              sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                              >MRR No. </TableHeading>
                                              <TableHeading  
                                                className="pr-10" 
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                              >Client Name</TableHeading>
                                                <TableHeading
                                                    className=""
                                                    name="status"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Status
                                                </TableHeading>
                                                <TableHeading  
                                              >Action</TableHeading>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {receivings.data.map((receiving, index) => (
                                                <tr key={index}>
                                                    <td className="text-base"> <b>
                                                      <Link href={route('receiving.show', receiving.id)} >
                                                        {receiving.mrr_no}
                                                      </Link>
                                                    </b></td>
                                                    <td className="w-24 text-base font-bold text-center">{receiving.client && receiving.client.name ? receiving.client.name : "No Client Name"}</td>
                                                    <td className="w-28">
                                                    <p className={`whitespace-no-wrap text-center rounded-lg
                                                     `}>
                                                        {receiving.status ?? "No Status"}</p></td>
                                                        <td className="w-24">
                                                      <div className="flex flex-row justify-end items-center">
                                                      <button data-model-type="receiving" onClick={() => handleRestoreMRR(receiving.id)}>Restore Item</button>

                                                        <Link href={route('archive.update', receiving.id,'receiving') } className="font-medium py-1 px-2 text-green-600 hover:bg-green-600 hover:text-white hover:rounded-full dark:text-green-500 hover:underline mx-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
                                                            </svg>
                                                        </Link>
                                                        <Link to={`/archive/show/${id}/table2`}>
                                                              Restore Table 2 
                                                            </Link>
                                                        <button
                                                            className="px-2 py-1 text-red-500  hover:bg-red-600 hover:text-white hover:rounded-full"
                                                            type="button"
                                                            onClick={() => {[setShowModal(true),showDeleteModal(item.id)]; }}
                                                        >
                                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                          </svg>
                                                        </button>
                                                            {showModal && <Modals setOpenModal={setShowModal} confirmModal={submitDelete} id={id} />}
                                                          
                                                      </div>
                                                </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                </div>

                <div className="col-span-1 ">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="overflow-auto">
                                    <div className="w-full flex flex-row justify-between items-center mb-2">
                                        <div>
                                            <span className="text-blue-600 font-bold">DELIVERABLES ARCHIVE</span>
                                        </div>
                                        <div className="flex flex-row items-center relative gap-2">
                                            <div>
                                                <th className="flex flex-row cursor-pointer items-center relative"></th>
                                            </div>
                                            <div className="absolute pointer-events-none right-2">
                                                <svg
                                                    fill="none"
                                                    height="24"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle cx="11" cy="11" r="8" />
                                                    <line
                                                        x1="21"
                                                        x2="16.65"
                                                        y1="21"
                                                        y2="16.65"
                                                    />
                                                </svg>
                                            </div>

                                            <TextInput
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Search Here"
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onKeyPress("name", e)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                                        <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                            <tr className="">
                                                <TableHeading
                                                    className=""
                                                    name="name"
                                                    id="name"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Item
                                                </TableHeading>
                                                <TableHeading
                                                    className=""
                                                    name="category_id"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Total Qty
                                                </TableHeading>
                                                <TableHeading
                                                    className=""
                                                    name="status"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Status
                                                </TableHeading>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trashedItems.map((trashedItem, index) => (
                                                <tr key={index}>
                                                    <td className="text-base">{trashedItem.name}</td>
                                                    <td className="w-24 text-base font-bold text-center">{trashedItem.trash_from}</td>
                                                    <td className="w-28">
                                                    <p className={`whitespace-no-wrap text-center rounded-lg
                                                     `}>
                                                        {item.status}</p></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                </div>

                
                </div>
                </div>
              </div>
          
      </div>
    </AuthenticatedLayout>
    
  )
}
