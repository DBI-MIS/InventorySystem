import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/inertia-react'
import { Head, Link } from '@inertiajs/react';
import React from 'react'

export default function Create({ auth }) {

  const {data, setData, post, errors, reset} = useForm({
    item: '',
    qty: '',
    uom: '',
    description: '',
    user_id: '',
  })

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("sritem.store"));
  };

  return (
    <Authenticated
    user={auth.user}
    header={
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2x1 text-blue-500 dark:text-gray-200 leading-tight">Create New Stock Requisition Item</h2>
      </div>
    }
    >
      <Head title='Stock Requisition Item' />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                 <form onSubmit={onSubmit} className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm-rounded-lg " action="">

                         <div className="grid grid-cols-2 gap-2"> 

                                 <input type="text" id="sritem_user_id" name="user_id" defaultValue={data.user_id} hidden="true"/>

                                 {/* <div className="col-span-1 grid grid-cols-2 gap-2 content-start"> */}
                                 <div>
                                        <div className="mt-4">
                                               <InputLabel htmlFor="sritem_item" value="Item: " />
                                               <TextInput 
                                                id="sritem_item"
                                                type="text"
                                                name="item"
                                                placeholder="Item"
                                                value={data.item}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={e => setData('item', e.target.value)}
                                               />
                                               <InputError message={errors.item} className="mt-2"/>
                                        </div>
                                        <div className="mt-4">
                                               <InputLabel htmlFor="sritem_qty" value="Quantity: " />
                                               <TextInput 
                                                id="sritem_qty"
                                                type="text"
                                                name="qty"
                                                placeholder="Qty"
                                                value={data.qty}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={e => setData('qty', e.target.value)}
                                               />
                                               <InputError message={errors.qty} className="mt-2"/>
                                        </div>
                                  </div>
                                  <div>
                                        <div className="mt-4">
                                               <InputLabel htmlFor="sritem_uom" value="Uom: " />
                                               <TextInput 
                                                id="sritem_uom"
                                                type="text"
                                                name="uom"
                                                placeholder="Uom"
                                                value={data.uom}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={e => setData('uom', e.target.value)}
                                               />
                                               <InputError message={errors.uom} className="mt-2"/>
                                        </div>
                                        <div className="mt-4">
                                               <InputLabel htmlFor="sritem_description" value="Description: " />
                                               <TextInput 
                                                id="sritem_description"
                                                type="text"
                                                name="description"
                                                placeholder="Description"
                                                value={data.description}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={e => setData('description', e.target.value)}
                                               />
                                               <InputError message={errors.description} className="mt-2"/>
                                        </div>
                                  </div>
                                 {/* </div> */}
                                 <div>
                                  
                                 </div>

                         </div>    
                         <div className="mt-10 text-right">
                            <Link href={route('sritem.index')}
                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                            >
                            Cancel
                            </Link>
                            <button className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                                Submit
                            </button>
                            
                        </div>
                 </form>

          </div>
        </div>
      </div>

    </Authenticated>
  )
}