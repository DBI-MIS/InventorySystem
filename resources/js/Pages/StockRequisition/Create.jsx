import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react'

export default function Create({ auth }) {

  const {data, setData, post, errors, reset} = useForm({
    sr_to: '',
    rs_no: '',
    sr_date: '',
    sr_notes: '',
    items: [],

  });
  console.log(data);

  // const [tableRows, setTableRows] = useState([]);

  // const onSubmit = (e) =>{
  //   e.preventDefault();
  //   post(route("stockrequisition.store"));
  // }

  // const addRow = () => {
  //   setTableRows([...tableRows, {
  //     sr_qty: data.sr_qty,
  //     sr_unit: data.sr_unit,
  //     sr_description: data.sr_description,
      
  //   }]);
  //   // Clear input fields after adding row if needed
  //   setData({
  //     ...data,
  //     sr_qty: '',
  //     sr_unit: '',
  //     sr_description: '',
      
  //   });
  // };

  // const [item, setItem] = useState({
  //   sr_qty: '',
  //   sr_unit: '',
  //   sr_description: '',
  // });

  // // Function to add a new row to tableRows
  // const addRow = () => {
  //   setData(
      
  //     {
  //       ...data,
  //       items: [...data.items, item],
  //       // sr_qty: data.sr_qty,
  //       // sr_unit: data.sr_unit,
  //       // sr_description: data.sr_description,
  //     },
  //   );

  //   // Clear input fields after adding row
  //   setItem({
  //     sr_qty: '',
  //     sr_unit: '',
  //     sr_description: '',
  //   });
  // };

  // // Function to handle form submission
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic, e.g., post data to server
  //   post(route("stockrequisition.store"));
  // };

  const [item, setItem] = useState({
    sr_qty: '',
    sr_unit: '',
    sr_description: '',
  });

  const addRow = () => {
    if (!item.sr_qty || !item.sr_unit || !item.sr_description) {
      console.log('Please fill in all item fields before adding a row.');
      return;
    }
    setData(prevData => ({
      ...prevData,
      items: [...prevData.items, item],
    }));

    setItem({
      sr_qty: '',
      sr_unit: '',
      sr_description: '',
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("stockrequisition.store"));
  };



  return (
    <Authenticated
    user={auth.user}
    header={
      <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Stock Requisition</h2>
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
                       placeholder="To."
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
                       placeholder="RS No."
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
                       placeholder="Date."
                       value={data.sr_date}
                       className="mt-1 block w-full"
                       isFocused={true}
                       onChange={e => setData('sr_date', e.target.value)}
                       />
                       <InputError message={errors.sr_date} className="mt-2"/>
                  </div>

                </div>
          </div>
          <br /><br />
          <div className="flex">
              <div className="w-full">
                  <div className="grid grid-cols-7 gap-2">

                      <div className=" mt-4  col-span-1 ">
                            <InputLabel htmlFor="stockrequest_sr_qty" value="Qty."/>
                                            
                            <TextInput 
                              id="stockrequest_sr_qty"
                              type="number"
                              name="sr_qty"
                              value={item.sr_qty} 
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={e => setItem({ ...item, sr_qty: e.target.value })}
                              />
                           <InputError message={errors.sr_qty} className="mt-2"/>
                                            
                      </div>
                      <div className=" mt-4  col-span-1 ">
                            <InputLabel htmlFor="stockrequest_sr_unit" value="Unit."/>
                                            
                            <SelectInput 
                              id="stockrequest_sr_unit"
                              type="text"
                              name="sr_unit"
                              value={item.sr_unit} 
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={e => setItem({ ...item, sr_unit: e.target.value })}
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
                              value={item.sr_description}
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={e => setItem({ ...item, sr_description: e.target.value })}
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
          <br /><br /><br />
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
            <br />
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="pr-10">QTY</th>
                    <th className="pr-10">UNIT</th>
                    <th className="pr-10">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sr_qty}</td>
                      <td>{row.sr_unit}</td>
                      <td>{row.sr_description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="pr-10">QTY</th>
                    <th className="pr-10">UNIT</th>
                    <th className="pr-10">DESCRIPTION</th>
                  </tr>
                </thead>
                <br />
                <tbody>
                  {tableRows.map((row, index) => (
                    <tr key={index}>
                     <td> <TextInput
                      id="stockrequest_sr_qty"
                      type="number"
                      name="sr_qty"
                      value={row.sr_qty} 
                      className="mt-1 block w-full"
                      isFocused={true}
                      onChange={e => setData('sr_qty', e.target.value)}
                      />
                      </td>
                      <td>
                        <SelectInput
                        id="stockrequest_sr_unit"
                        type="text"
                        name="sr_unit"
                        value={row.sr_unit} 
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
                      </td>
                      <td>
                      <TextAreaInput 
                              id="stockrequest_sr_description"
                              type="text"
                              name="sr_description"
                              value={row.sr_description}
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={e => setData('sr_description', e.target.value)}
                          />
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table> */}
          {/* <div className="mt-4">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr>
                      <th>Qty.</th>
                      <th>Unit.</th>
                      <th>Description.</th>
                      <th>Notes.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, index) => (
                      <tr key={index}>
                        <td>{row.sr_qty}</td>
                        <td>{row.sr_unit}</td>
                        <td>{row.sr_description}</td>
                        <td>{row.sr_notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
              <br /><br /><br /><br /><br /><br />
           
          <div className="mt-20 text-right">
          
          <button
                  type="button"
                  onClick={addRow}
                  className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600"
                >
                  Add Row
                </button>
                    

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