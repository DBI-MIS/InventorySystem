import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create({auth, client }){
  
   const {data, setData, post ,errors,reset} = useForm({
        name: client.name || "",
        address: client.address || "",
        contact_person: client.contact_person || "",
        contact_no: client.contact_no || "",
        tin_no: client.tin_no || "",
        status: client.status || "",
        remarks: client.remarks || "",
        _method: "PUT", 
    });
    console.log("Client Data : " + client);

     //
     const [tin, setTin] = useState('');
     const [errorMessage, setErrorMessage] = useState('');
   
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
    //  CONTACT NUMBER
    
    const formattedContactNo = data.contact_no.slice(3); //inalis +63 

    const [errorMessages, setErrorMessages] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(formattedContactNo);
    const [valid, setValid] = useState(false);
    const [isValid, setIsValid] = useState(false);
  
   
    const philippineNumberRegex = /^(?:(?:9\d{2})|(?:8[1-9]|\d{3}))(?:\d{7})$/;  //  OR /^(\+63)(?:(?:9\d{2})|(?:8[1-9]|\d{4}))(?:\d{7})$/;

    const handleChange = (event) => {

        const enteredNum =  event.target.value //pass the value

        setPhoneNumber(enteredNum);
        // validation if valid ph format and not more than 10 numbers
        const isValidNum = enteredNum.length >= 9 && enteredNum.length <= 10 && philippineNumberRegex.test(enteredNum);

        setValid(isValidNum); //to update the text color of input
        //show error message
        setErrorMessages(isValidNum ? '' : (enteredNum.length > 10 ? 'Invalid phone number ( it shoul only be 9-10 digits)' : '')); 
        setIsValid(isValidNum);
    };
    //update the contact number
    useEffect(() => {
      if (isValid) {
        setData('contact_no', `+63${phoneNumber}`);
      }
    }, [isValid, phoneNumber]); 

    console.log("data" + data);
    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("client.update",client.id));
    }

    
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Edit client {client.name}</h2>
          </div>
        }
        >
             <Head title="Categories" />
     <div className="py-6">
        <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}  
                        className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" >
                         {/* START */}
                         <div className="grid grid-cols-3 gap-2">

                         {/* 1ST GRID COLUMN */}
                         <div className="col-span-2 grid grid-cols-2 gap-2 content-start">
                                <div className="mt-6 col-span-2">
                                    <InputLabel htmlFor="client_name" value="Client / Project Name"/>
                                    <TextInput 
                                    id="client_name"
                                    type="text"
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
                                    value={data.contact_person}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={e => setData('contact_person', e.target.value)}
                                    />
                                    <InputError message={errors.contact_person} className="mt-2"/>
                                </div> 

                                <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="client_remarks" value="Remarks"/>
                                    <TextAreaInput
                                    id="client_remarks"
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
                         <div className="col-span-1 grid grid-cols-1 content-start">

                         <div className="mt-6 col-span-1">
                              <div className="flex gap-2">
                                 <InputLabel htmlFor="client_tin_no" value="TIN No."/>
                                <span className="text-red-800  font-medium text-sm">format: XXXX-XXX-XXX-XXX</span>
                              </div>
                          
                              <TextInput
                                  type="text"
                                  id="client_tin_no"
                                  name="client_tin_no"
                                  value={data.tin_no}
                                  placeholder="Enter TIN No. (XXX-XXX-XXX-XXX)"
                                  className="mt-2 block w-full"
                                  onChange={handleTinChange}
                                  maxLength="12" 
                              />
                              {errorMessage && <p className="error-message text-red-700">{errorMessage}</p>}
                              <InputError message={errors.tin_no} className="mt-2"/>
                            </div>

                        
                                <div className="mt-6 col-span-1">
                                  <div className="flex font-medium text-sm gap-2">
                                    <InputLabel htmlFor="client_contact_no" value="Contact No."/>
                                    <span className="text-gray-600"> Ex: 9608108745 or 0281234567</span>
                                    

                                  </div>
                                  
                                    <div className="flex items-center border rounded-md " >
                                      <TextInput
                                        id="client_contact_no"
                                        name="contact_no"
                                        type="number"
                                        placeholder=" Ex: 9608108745"
                                        value={phoneNumber}
                                        onChange={handleChange}
                                        className={`px-2 w-full focus:outline-none border-0 text-black
                                        ${isValid ? 'text-green-800' : ''}`} 
                                      />
                                    </div>
                                      {errorMessages && <p className="error-message text-red-700">{errorMessages}</p>}
                                      <InputError message={errors.contact_no} className="mt-2"/>
                                </div>


                            <div className="mt-6 col-span-1">
                                <InputLabel htmlFor="client_status" value="Status"/>
                                <SelectInput
                                id="client_status"
                                name="status"
                                defaultValue={data.status}
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