import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from 'react';
import { useState } from "react";
import {
    isPossiblePhoneNumber,
    isValidPhoneNumber,
    validatePhoneNumberLength,
    isValidNumber,
  } from 'libphonenumber-js'
  
import { parsePhoneNumberFromString ,  parsePhoneNumber, } from 'libphonenumber-js';
// import myModule from './myModule';
import '../../../css/phoneNumber.css'
export default function Create({auth,employees,success}){
   
    // data will hold/contain the ff:
   const {data, setData, post,errors,reset} = useForm({
        name: '',
        address: '',
        contact_person: '',
        contact_no: '',
        tin_no: '',
        status: '',
        remarks: '',
    })
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    function handleChange(event) {
        const digits = event.target.value.replace(/\D/g, ''); // Extract digits only
      
        try {
          const parsedNumber = parsePhoneNumber(`+63${digits}`, 'PH'); // Parse with +63 prefix
          setFormattedPhoneNumber(PhoneNumberOfflineGeocoder(parsedNumber, 'INTERNATIONAL')); // Format internationally
          setData('contact_person',formattedPhoneNumber)
          setErrorMessage(''); // Clear error if valid
        } catch (error) {
          setFormattedPhoneNumber(''); // Clear formatted number on error
          if (error.message === 'The phone number is not valid for the given country code.') {
            setErrorMessage('Invalid Philippine phone number. Please enter 10 digits.'); // Specific message for invalid format
          } else if (error.message === 'The phone number is too short for the given region.') {
            setErrorMessage('Invalid Philippine phone number. Please enter 10 digits.'); // More specific message for less than 10 digits
          } else {
            setErrorMessage('Invalid phone number. Please refer to [Areaphonecodes.com](https://areaphonecodes.com/philippines/) for valid Philippine area codes.');
          }
        }
      }
    const philippineNumberRegex = /^(\+63)(?:(?:9\d{2})|(?:8[1-9]|\d{4}))(?:\d{7})$/; // Common prefixes

    //
    const [tin, setTin] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');
  
    const handleTinChange = (event) => {
      const value = event.target.value.replace(/\D/g, ''); 
  
      // dashes every 3 digits
      const formattedValue = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{3})$/, '$1-$2-$3-$4');
  
      setTin(formattedValue);
  
      setErrorMessage('');
  
      if (value.length < 9 || value.length > 12 || !/^\d{3}-\d{3}-\d{3}-\d{3}$/.test(formattedValue)) {
        setErrorMessage('Invalid TIN format. Please enter a valid 9-12 digit TIN number (XXX-XXX-XXX-XXX)');
      } else {
        // Update data using setData callback if validation passes
        // setData('tin_no', value);
        setTin(formattedValue); // display purposes 
      setErrorMessage(''); // Clear error
      setData('tin_no', formattedValue); 
      }
    };
    console.log(data)
    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("client.store"));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Client / Project </h2>
          </div>
        }
        >
         <Head title="Clients" />
      <div className="py-6">
      {success && (
                <div className="bg-green-500 mb-4 py-2 px-4 text-white rounded">
                {success}
              </div>
          )}
        <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}  data-page="{{ json_encode($page) }}"
                        className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                         {/* START */}
                         <div className="grid grid-cols-3 gap-2">

                         {/* 1ST GRID COLUMN */}
                         <div className="col-span-2 grid grid-cols-2 gap-2 content-start">
                                <div className="mt-6 col-span-2">
                                    <InputLabel htmlFor="client_name" value="Client / Project Name"/>
                                    <TextInput 
                                    id="client_name"
                                    type="text"
                                    placeholder="Enter Client / Project Name "
                                    name="name"
                                    value={data.name}
                                    className="mt-3 block w-full"
                                    isFocused={true}
                                    onChange={e => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                
                                <div className="mt-4 col-span-2">
                                <InputLabel htmlFor="client_address" value="Client Address"/>
                                    <TextInput 
                                    id="client_address"
                                    type="text"
                                    placeholder="Enter Client Full Address "
                                    name="address"
                                    value={data.address}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={e => setData("address", e.target.value)}
                                    />
                                    <InputError message={errors.address} className="mt-2"/>
                                </div>
 
                                <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="client_contact_person" value="Contact Person"/>
                                    <TextInput
                                    id="client_contact_person"
                                    name="contact_person"
                                    placeholder="Enter Name of the Contact Person"
                                    value={data.contact_person}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={e => setData('contact_person', e.target.value)}
                                    />
                                    <InputError message={errors.contact_person} className="mt-2"/>
                                </div> 
                                {/* <div>
                                    <label htmlFor="phone-number">Phone Number:</label>
                                    <input
                                        type="tel"
                                        id="phone-number"
                                        name="phone-number"
                                        value={phoneNumberInput}
                                        onChange={handleChange}
                                        placeholder="+63..."
                                    />
                                    <p>Valid Philippine phone numbers typically start with area codes like those listed on <a href="https://areaphonecodes.com/philippines/">Areaphonecodes.com</a>.</p>
                                    {formattedPhoneNumber && <p>Formatted Number: {formattedPhoneNumber}</p>}
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    </div> */}

                                <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="client_remarks" value="Remarks"/>
                                    <TextAreaInput
                                    id="client_remarks"
                                    placeholder="Enter Client Remarks"
                                    name="remarks"
                                    value={data.remarks}
                                    className="mt-1 block w-full resize-none"
                                            rows="5"
                                    onChange={e => setData('remarks', e.target.value)}
                                    />
                                    <InputError message={errors.remarks} className="mt-2"/>
                                </div>
                         </div>

                         {/* 2ND GRID COLUMN */}
                         <div className=" col-span-1 grid grid-cols-1 content-start">

                          <div className="mt-6 col-span-1">
                              <div className="flex gap-2">
                                 <InputLabel htmlFor="client_tin_no" value="TIN No."/>
                                <span className="text-red-800  font-medium text-sm">format: XXXX-XXX-XXX-XXX</span>
                              </div>
                          
                              <TextInput
                                  type="text"
                                  id="client_tin_no"
                                  name="client_tin_no"
                                  value={tin}
                                  placeholder="Enter TIN No. (XXX-XXX-XXX-XXX)"
                                  className="mt-2 block w-full"
                                  onChange={handleTinChange}
                                  maxLength="12" 
                              />
                              {errorMessage && <p className="error-message text-red-700">{errorMessage}</p>}
                              <InputError message={errors.tin_no} className="mt-2"/>
                            </div>
                            <div className="mt-6 col-span-1">
                                <InputLabel htmlFor="client_contact_no" value="Contact No."/>
                                <TextInput
                                type="number"
                                id="client_contact_no"
                                name="contact_no"
                                value={data.contact_no}
                                className="mt-1 block w-full"
                                onChange={e => setData('contact_no', e.target.value)}
                                />
                                <InputError message={errors.contact_no} className="mt-2"/>
                            </div>
                            {/* <div className="mt-6 col-span-1">
                                <InputLabel htmlFor="client_tin_no" value="TIN No."/>
                                <TextInput
                                type="number"
                                id="client_tin_no"
                                name="contact_no"
                                placeholder="Entr TIN Number"
                                value={data.tin_no}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={e => setData('tin_no', e.target.value)}
                                />
                                <InputError message={errors.tin_no} className="mt-2"/>
                            </div> */}

                            <div className="mt-6 col-span-1">
                                <InputLabel htmlFor="client_status" value="Status"/>
                                <SelectInput
                                id="client_status"
                                name="status"
                                className="mt-1 block w-full"
                                onChange={e => setData('status', e.target.value)} >
                                    <option value="">Select Status </option>
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="inactive">Inactive</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2"/>
                            </div>

                            

                         </div>
 
                          </div>
                      
                        <div className="mt-4 text-right">
                            <Link href={route('client.index')}
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
        </AuthenticatedLayout>
    )
}