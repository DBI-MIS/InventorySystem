
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { Alert} from "@material-tailwind/react";
import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head,Link, router} from "@inertiajs/react";
import { useState } from "react";
import Modals from "@/Components/Modals";

export default function Index({auth,items, queryParams = null, success,deleteItem,item, setOpenModal}) {

  const [showModal, setShowModal] = useState(false);

  queryParams = queryParams || {};

const [open, setOpen] = React.useState(true);
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
       <Head title="Items" />
      <div className="py-12">
          <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 relative">
          {success && (
                 <Alert
                 className=" absolute z-50 px-4 py-4 mb-5 rounded text-slate-800 bg-green-100 ring-2 ring-green-800"
                 open={open}
                 onClose={() => setOpen(true)}
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
                              sortChanged={sortChanged}>Sku </TableHeading>
                                <TableHeading  className="pr-10"   name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Name</TableHeading>
                                <TableHeading  className="pr-10"   name="brand_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Brand</TableHeading>
                                <TableHeading className="pr-10"  name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Category</TableHeading>
                                <TableHeading  className="pr-10"  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Qty</TableHeading>
                                <TableHeading  className="pr-10 p"  name="uom"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>UOM</TableHeading>
                                <TableHeading className="px-3 py-3 text-right">Actions</TableHeading>
                                <th></th>
                              </tr>
                            </thead>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3 " >
                                  <TextInput  className="" 
                                  defaultValue={queryParams.name}
                                  placeholder="Item Name " 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                </th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3 text-right"></th>
                              
                              </tr>
                            </thead>
                            <tbody>
                              {items.data.map((item)=>(
                                  <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                    <td className="px-3 py-2">
                                        {item.id}
                                    </td>
                                    <td className="px-3 py-2">
                                      {item.sku_prefix}-{item.sku}
                                    </td>
                                    <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                      <Link href={route('item.show', item.id)}>
                                      {item.name}
                                      </Link>
                                    </th>
                                    <td className="px-3 py-2">{item.brand.name}</td>
                                    <td className="px-3 py-2">{item.category ? item.category.name : 'Not belong on any CAtegory'}</td>
                                    <td className="px-3 py-2">{item.quantity}</td>
                                    <td className="px-3 py-2">{item.uom}</td>
                                    <td className="px-3 py-2 text-nowrap float-end">
                                      {/* <InertiaLink href={route('archive.forceDelete',item.id)}>MAma mo restore</InertiaLink> */}
                                        <div className="flex justify-around">
                                            <Link href={route('archive.update', item.id) } className="font-medium py-2 px-4  text-green-600 hover:bg-green-600 hover:text-white hover:rounded-full dark:text-green-500 hover:underline mx-1">
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
                                              </svg>
                                            </Link>
                                            <div className="">
                                                <button
                                                    className="px-4 py-2 text-red-500  hover:bg-red-600 hover:text-white hover:rounded-full"
                                                    type="button"
                                                    onClick={() => {[setShowModal(true),showDeleteModal(item.id)]; }}
                                                >
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                  </svg>
                                                </button>
                                                    {showModal && <Modals setOpenModal={setShowModal} confirmModal={submitDelete} id={id} />}
                                              </div>
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
      </div>
    </AuthenticatedLayout>
    
  )
}
