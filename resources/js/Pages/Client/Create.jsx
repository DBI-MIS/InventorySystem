import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from 'react';
import { useState } from "react";
import '../../../css/phoneNumber.css'
import PhoneInput, { formatPhoneNumber } from 'react-phone-number-input';
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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid,setValid] = useState(true);
    const handleChange = (value) => {
        // const input = e.target.value;
        setPhoneNumber(value);
        setValid(validatePhoneNumber(value));

        // e.preventDefault();
      // Limit input to 11 digits (including +63)
    //   if (value.length > 11) {
    //     setPhoneNumber(value.slice(0, 11));
    //   } else {
    //     setPhoneNumber(value);
    //   }
    };
    const validatePhoneNumber = (phoneNumber) =>{
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(phoneNumber);
    }
  
    const validatePhilippinePhone = (phoneNumber) => {
      // Basic validation (can be improved)
      return phoneNumber.startsWith('+63') && phoneNumber.length === 11;
    };
  
    const philippineNumberRegex = /^(\+63)(?:(?:9\d{2})|(?:8[1-9]|\d{4}))(?:\d{7})$/; // Common prefixes
  
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
                                    className="mt-1 block w-full"
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
                                <div className="flex ">
                                <PhoneInput
                                    placeholder="Enter Philippine phone number"
                                    value={phoneNumber}
                                    onChange={(e) => handleChange}
                                    defaultCountry="PH" // Set default country to Philippines
                                    maxLength={11} // Limit input length (optional - handled in handleChange)
                                    // autoFormat={false} // Disable auto formatting (optional)
                                    country={'ph'}// Force country to Philippines (optional)
                                    // isValid={validatePhilippinePhone(phoneNumber)} // Optional validation indicator
                                />
                                {!valid && <p>PENTER VALID 10 DIGIT NUMBER</p>}
                                {/* {!validatePhilippinePhone(phoneNumber) && <p>Invalid Philippine phone number format!</p>} */}
                                                            </div>
                                

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
                                <InputLabel htmlFor="client_contact_no" value="Contact No."/>
                                <TextInput
                                type="number"
                                id="client_contact_no"
                                name="contact_no"
                                placeholder="Enter Contact Number"
                                value={data.contact_no}
                                className="mt-1 block w-full"
                                onChange={e => setData('contact_no', e.target.value)}
                                />
                                <InputError message={errors.contact_no} className="mt-2"/>
                            </div>

                            <div className="mt-6 col-span-1">
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
                            </div>

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