import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react'

export default function Edit({ auth, stockrequisition }) {
    console.log(stockrequisition);

    const { data, setData, post, errors, reset } = useForm ({
      sr_to: stockrequisition.sr_to || "",
      rs_no: stockrequisition.rs_no || "",
      sr_date: stockrequisition.sr_date || "",
      sr_qty: stockrequisition.sr_qty || "",
      sr_unit: stockrequisition.sr_unit || "",
      sr_description: stockrequisition.sr_description || "",
      sr_notes: stockrequisition.sr_notes || "",
      _method: "PUT",
    })
    console.log(data);


    const onSubmit = (e) => {
        e.preventDefault();
        post(route("stockrequisition.update", stockrequisition.id));
    };
  return (
    <Authenticated
    user={auth.user}
    header={
      <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Edit Stock Requisition, RS No.  {stockrequisition.rs_no}</h2>
          </div>
    }
    >
      <Head title='Stock Requisition'/>

    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">


          <form onSubmit={onSubmit} className="p-4 sm:p8  bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">

          <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1 grid grid-cols-2 gap-2 content-start">

                  <div className="mt-24 col-span-3">
                       <InputLabel htmlFor="stockrequest_sr_to" value="To."/>
                       <TextInput
                       id="deliverables_sr_to"
                       type="text"
                       name="sr_to"
                       value={data.sr_to}
                       className="mt-1 block w-full"
                       isFocused={true}
                       onChange={e => setData('sr_to', e.target.value)}
                       />
                       <InputError message={errors.sr_to} className="mt-2"/>
                  </div>

                </div>
                <div className="col-span-1 grid grid-cols-2 gap-2 content-start"></div>
                
                <div className="mt-10 col-span-1 grid grid-cols-1 content-start">

                <div className="mt-4 col-span-3">
                       <InputLabel htmlFor="stockrequest_rs_no" value="RS No."/>
                       <TextInput
                       id="deliverables_rs_no"
                       type="text"
                       name="rs_no"
                       value={data.rs_no}
                       className="mt-1 block w-full"
                       isFocused={true}
                       onChange={e => setData('rs_no', e.target.value)}
                       />
                       <InputError message={errors.rs_no} className="mt-2"/>
                  </div>
                  <div className="mt-4 col-span-3">
                       <InputLabel htmlFor="stockrequest_sr_date" value="Date:"/>
                       <TextInput
                       id="deliverables_sr_date"
                       type="date"
                       name="sr_date"
                       value={data.sr_date}
                       className="mt-1 block w-full"
                       isFocused={true}
                       onChange={e => setData('sr_date', e.target.value)}
                       />
                       <InputError message={errors.sr_date} className="mt-2"/>
                  </div>

                </div>
          </div>
          <div className="flex">
              <div className="w-full">
                  <div className="grid grid-cols-7 gap-2">

                      <div className=" mt-4  col-span-1 ">
                            <InputLabel htmlFor="stockrequest_sr_qty" value="Qty."/>
                                            
                            <TextInput 
                              id="stockrequest_sr_qty"
                              type="text"
                              name="sr_qty"
                              value={data.sr_qty} 
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={e => setData('sr_qty', e.target.value)}
                              />
                           <InputError message={errors.sr_qty} className="mt-2"/>
                                            
                      </div>
                      <div className=" mt-4  col-span-1 ">
                            <InputLabel htmlFor="stockrequest_sr_unit" value="Unit."/>
                                            
                            <SelectInput 
                              id="stockrequest_sr_unit"
                              type="text"
                              name="sr_unit"
                              value={data.sr_unit} 
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={e => setData('sr_unit', e.target.value)}
                            >
                              <option value="">Select UOM </option>
                                <option value="M">Meters</option>
                                <option value="Kg">Kilograms</option>
                                <option value="L">Liters</option>
                                <option value="Pcs">Pieces</option>
                                <option value="Pc">Piece</option>
                                <option value="Set">Set</option>
                                <option value="Sets">Sets</option>
                            </SelectInput>
                           <InputError message={errors.sr_unit} className="mt-2"/>
                                            
                      </div>
                      <div className="mt-1  col-span-5">
                          <InputLabel htmlFor="stockrequest_sr_description" value="Description."/>
                          <TextAreaInput 
                              id="stockrequest_sr_description"
                              type="text"
                              name="sr_description"
                              value={data.sr_description}
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={e => setData('sr_description', e.target.value)}
                          />
                          <InputError message={errors.sr_description} className="mt-2"/>
                    </div>
                  </div>
                  
                    <div className="mt-4  col-span-3">
                          <InputLabel htmlFor="stockrequest_sr_notes" value="Notes."/>
                          <TextAreaInput 
                              id="stockrequest_sr_notes"
                              type="text"
                              name="sr_notes"
                              value={data.sr_notes}
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={e => setData('sr_notes', e.target.value)}
                          />
                          <InputError message={errors.sr_notes} className="mt-2"/>
                    </div>
              </div>
          </div>
          <div className="mt-20 text-right">
                <Link href={route('stockrequisition.index')}
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
