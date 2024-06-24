import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { USER_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link, useForm } from "@inertiajs/react";
import { Select } from "@material-tailwind/react";
import React, { useEffect } from 'react';
import { useState } from "react";

export default function Edit({auth,user}){
   
    // data will hold/contain the ff:
   const {data, setData, post,errors,reset} = useForm({
        name: user.name || "",
        surname:  user.surname || "",
        email:  user.email || "",
        password:  "",
        password_confirmation: "",
        role:  user.role|| "",
        _method: 'PUT'

    })
    const rolesOptions = Object.keys(USER_STATUS_TEXT_MAP).map((key) => ({
        value: key,
        label: USER_STATUS_TEXT_MAP[key],
      }));

     const [isClearable, setIsClearable] = useState(true);
     const [isSearchable, setIsSearchable] = useState(true);
     const [isDisabled, setIsDisabled] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [isRtl, setIsRtl] = useState(false);
  

 // checking password if match
 const [errorMessage, setErrorMessage] = useState(null);

 const handlePassword = (event) => setData('password',event.target.value);
 const handleConfirmPassword = (event) =>  setData('password_confirmation',event.target.value);
 // setConfirmPassword(event.target.value);

//  const validatePassword = () => {
//     if (data.password !== data.password_confirmation) {
//       setErrorMessage('Password and Confirm password do not match!');
//     } else {
//       setErrorMessage(''); // Clear 
//     }
//   }

    // const validatePassword = () => {
    //     if (password !== confirmPassword) {
    //       setErrorMessage('Passwords do not match!');
    //     } else {
    //         setData('password', password)
    //       setErrorMessage(''); // Clear 
    //     }
    //   }
    
    // CHECKING PURPOSES
     useEffect(() => {
        console.log('Current data:', data); 
    }, [data]);
  
    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("user.update", user.id));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Edit User  </h2>
          </div>
        }
        >
         <Head title="Users" />
      <div className="py-6">
    
        <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}  data-page="{{ json_encode($page) }}"
                        className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                         {/* START */}
                         <div className="grid grid-cols-3 gap-2">

                         {/* 1ST GRID COLUMN */}
                         <div className="col-span-2 grid grid-cols-2 gap-2 content-start">

                               <div className="col-span-2 grid grid-cols-4 gap-2">
                                <div className="mt-6 col-span-2">
                                        <InputLabel htmlFor="user_name" value="User Name"/>
                                        <TextInput 
                                        id="user_name"
                                        type="text"
                                        placeholder="Enter User  Name "
                                        name="name"
                                        value={data.name}
                                        className="mt-3 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('name', e.target.value)}
                                        />
                                        <InputError message={errors.name} className="mt-2"/>
                                    </div>
                                    
                                    <div className="mt-6 col-span-2">
                                    <InputLabel htmlFor="user_surname" value="Surname"/>
                                        <TextInput 
                                        id="user_surname"
                                        type="text"
                                        placeholder="Enter Surname"
                                        name="surname"
                                        value={data.surname}
                                        className="mt-3 block w-full"
                                        isFocused={true}
                                        onChange={e => setData("surname", e.target.value)}
                                        />
                                        <InputError message={errors.surname} className="mt-2"/>
                                    </div>
                               </div>
                                <div className="mt-2 col-span-2">
                                <InputLabel htmlFor="user_email" value="Email"/>
                                    <TextInput 
                                    id="user_surname"
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={e => setData("email", e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2"/>
                                </div>
                         </div>

                            {/* 2ND GRID COLUMN */}
                            <div className=" col-span-1 grid grid-cols-1 content-start">

                            <div className="mt-8 col-span-2">
                                    <InputLabel htmlFor="user_password" value="Password"/>
                                    <TextInput
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    onChange={handlePassword}
                                    // onChange={e => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2"/>
                                </div> 
                                <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="user_confirm_password" value=" Confirm Password"/>
                                    <TextInput
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    placeholder="Enter Confirm Password"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleConfirmPassword}
                                    // onBlur={validatePassword}
                                    
                                    />
                                    {errorMessage && <p className="text-red-600 text-xs">{errorMessage}</p>}
                                    <InputError message={errors.confirm_password} className="mt-2"/>
                                </div> 

                                {/* <div className="mt-4 col-span-1">
                                    <InputLabel htmlFor="item_role" value="Role"/>
                                    <Select
                                            className="basic-single"
                                            placeholder="Select User Role"
                                            isDisabled={isDisabled}
                                            isLoading={isLoading}
                                            isClearable={isClearable}
                                            isRtl={isRtl} 
                                            onChange={({ value }) => setData({ ...data, role: value })}
                                            isSearchable={isSearchable}
                                            name="role"
                                            options={rolesOptions}
                                        />
                                            <InputError message={errors.role} className="mt-2"/>
                                </div> */}
                                  <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="user_role" value="Role"/>
                                    <SelectInput
                                        id="user_role"
                                        name="role"
                                        className="mt-1 block w-full"
                                        defaultValue={data.role}
                                        onChange={e => setData('role', e.target.value)} >
                                        <option value="">Select User Role </option>
                                        <option value="super_admin">Super Admin</option>
                                        <option value="admin">Admin</option>
                                        <option value="editor">Editor</option>
                                        <option value="user">User</option>
                                    </SelectInput>
                                    <InputError message={errors.role} className="mt-2"/>
                                </div>
                            </div>
 
                        </div>
                      
                        <div className="mt-4 text-right">
                            <Link href={route('user.index')}
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