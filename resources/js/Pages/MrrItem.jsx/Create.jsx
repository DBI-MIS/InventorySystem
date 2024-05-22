import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
// import { Fragment} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";


export default function Create({auth,success,items, receivings,categories,sku,brands,locations,employees}){

    // ITEM FORM
        const {data, setData,post,errors} = useForm({
            name: '',
            description: '',
            sku: '000050',
            specs: '',
            part_no: '',
            serial_no: '',
            model_no: '',
            uom: '',
            quantity:'',
            status: '',
            remarks:'',
            
        })
        console.log(data)
            
    
    // setData('item_id', result)
// console.log("hello" + result);
        const onSubmitItem = (e) =>{
            e.preventDefault();
            // post(route("mrrItem.store"))
            // alert("suceess")
            post(route("mrrItem.store"), data, {
                onSuccess: () => console.log('Form 1 submitted successfully'),
                onError: (errors) => console.error('Form 1 submission error', errors),
            });
        }
        
        // main form  MRR
        const [formData, setFormData] = useState({
            ref_id: '',
            item_id: '[5,10,22,6]',
            reference_no: '',
          });
    
        const handleForm2Change = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        console.log(formData);
    
        const  onSubmit = (e) => {
         post(route("receivingItem.store"),formData);
         e.preventDefault();
         // if (lengthmo > 3 ) { //check if the selected values/ select inputs is more than 3 then
        //      post(route("receivingItem.store"),formData);
         //     console.log("Submit Success");
         // } else {
         //     console.log("At least four Items are required.");
             
         // }
     };
       
         const [isModalOpen, setIsModalOpen] = useState(false);
        const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        };
    
        const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
        // Close the modal after submission
        setIsModalOpen(false);
        };
        // State to hold the array of select values
        const [receivingItems, setReceivingItems] = useState([]);
        const [ newArrays, setNewArrays] = useState()

        // Handler function to update array when select values change
        const handleSelectChange = (index, selectedOptions,e) => {
            const newArray = [...receivingItems]; // Create a copy of the array
            newArray[index] = selectedOptions; // Update the value at the specified index
            setReceivingItems(newArray); // Update state with the new array

            setNewArrays(newArray);
        setFormData('item_id', newArray.map(innerArray => parseInt(innerArray[0]))); 

                console.log("newarray" + newArray); // 2, 4, 6
                console.log("newarray index" + newArray[index]); //6
                console.log("receivingItems" + receivingItems); //2, 4
                console.log("number of array values " + newArrays)
        };

        // Handler function to add a new select field
        const handleAddSelect = () => {
            setReceivingItems([...receivingItems, []]); // Add a new empty array to the array
            console.log("receivingItemsa" + receivingItems);
            //    setData('item_id',receivingItems)
        
            // convert array to string for error of  "array to string conversion"

            $stringItems =  implode(', ', receivingItems); // Convert array to comma-separated string
            
            setFormData('item_id',$stringItems )
            console.log("stringItems" + $stringItems)
            // setData('item_id', JSON.stringify([...receivingItems, []]));
            
            //    setData('item_id',(Object.values(data)));
            // console.log("hmm" + data);
    };
        // Handler function to remove a select field
        const handleRemoveSelect = (index) => {
        const newArray = [...receivingItems]; // Create a copy of the array
        newArray.splice(index, 1); // Remove the value at the specified index
        setReceivingItems(newArray); // Update state with the new array
        // setData('item_id', JSON.stringify(newArray)); 
        };
        console.log(receivingItems)
        const lengthmo = receivingItems.length;
          console.log("number of select elements " + lengthmo)

    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between receivings-center"  >
            <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Create New Receiving</h2>
          </div>
        }
        >
             <Head title="Receivings" />
      <div className="py-12">
      {success && (
                <div className="bg-green-500 mb-4 py-2 px-4 text-white rounded">
                {success}
              </div>
          )}
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit} 
                        className="p-4 sm:p8  bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                           <div className="flex">
                                <div className="w-full">  
                                     <div className="mt-4  col-span-3">
                                        <InputLabel htmlFor="ref_id" value="Receiving Reference"/>
                                        <TextInput 
                                        id="ref_id"
                                        type="text"
                                        name="ref_id"
                                        value={formData.ref_id}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={handleForm2Change} 
                                        // onChange={(e) => setFormData('ref_id', e.target.value)}
                                        />
                                        <InputError message={errors.ref_id} className="mt-2"/>
                                    </div>
                                    <div className="mt-4  col-span-2">
                                    <InputLabel htmlFor="reference__no" value="Reference No."/>
                                    <TextInput 
                                    id="reference__no"
                                    type="text"
                                    name="reference_no"
                                    onChange={handleForm2Change} 
                                    value={formData.reference_no}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    // onChange={e => setFormData('reference_no', e.target.value)}
                                    />
                                    <InputError message={errors.reference_no} className="mt-2"/>
                                </div>
                            <button
                                className="flex  m-5  float-end flex-nowrap gap-2 font-semibold bg-green-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-green-700"
                                    onClick={handleAddSelect} >
                                    Add Items
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                           </button>
                            <div className="mt-20">
                                {receivingItems.map((selectedOptions, index) => (
                                    <div key={index}>
                                        <div className=" mt-2  col-span-2 ">
                                             <InputLabel htmlFor="item" value="Item"/>
                                             <div className=" flex h-[11]">
                                             <SelectInput
                                                value={selectedOptions}
                                                onChange={(e) =>
                                                handleSelectChange(
                                                index,
                                                Array.from(e.target.selectedOptions, (option) => option.value)
                                                )}
                                                id="item_id"
                                                name="item_id[]"
                                                className="mt-1 block w-full">
                                                <option value="">Select item </option>
                                                 {items.data.map((item)=>(
                                                     <option value={item.id} key={item.id}>{item.name}</option>
                                                 ))}
                                            </SelectInput>
                                        <button onClick={() => handleRemoveSelect(index)}>Remove</button>
                                            </div>
                                                {/* <InputError message={errors.item_id} className="mt-2"/> */}
                                        </div> 
                                    </div>
                                    
                                ))}
                                 <div>
                                    <h2>Selected Item IDs:</h2>
                                     <ul>
                                        {receivingItems.map((selectedOptions, index) => (
                                        <li key={index}>{selectedOptions}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
  
                            <div>
                                <div className="max-w-md w-full relative">
                                <Link href={route('mrrItem.create')}
                                className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                                >
                                Add Items
                                </Link>
                                    {/* <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add New Item</button> */}
                                    {/* {isModalOpen && (
                                        <>
                                            <div className="fixed inset-0 z-40 bg-gray-500 opacity-50"></div>
                                            <div className="fixed inset-0 z-50  w-90 flex m-auto p-auto items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                                            <div className="relative w-auto my-20 pt-32 mx-auto ">
                                                <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-2xl font-semibold">Add New Item Modal</h3>
                                                    <button onClick={() => setIsModalOpen(false)} className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">×</button>
                                                </div>
                                                <div className="relative p-6 flex-auto">
                                                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                                            <form  onSubmit={onSubmitItem}  
                                                            
                                                                className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" >
                                                             
                                                                <div className="grid grid-cols-6 gap-2">
                                                                    <div className="mt-4  col-span-3">
                                                                        <InputLabel htmlFor="item_name" value="Item Name"/>
                                                                        <TextInput 
                                                                        id="item_name"
                                                                        type="text"
                                                                        name="name"
                                                                        value={data.name}
                                                                        className="mt-1 block w-full"
                                                                        isFocused={true}
                                                                        onChange={e => setData('name', e.target.value)}
                                                                        />
                                                                        <InputError message={errors.name} className="mt-2"/>
                                                                    </div>
                                                                    <div className=" mt-4  col-span-2 ">
                                                                    <InputLabel htmlFor="item_category_sku" value="Item Category"/>
                                                                        <div className=" flex h-[11]">
                                                                            <SelectInput
                                                                                value={data.category_id}
                                                                                onChange={(e) =>setData('category_id', e.target.value)}
                                                                                id="item_category_sku"
                                                                                name="category_id"
                                                                                className="mt-1 block w-full">
                                                                                    <option value="">Select Category </option>
                                                                                    {categories.data.map((category)=>(
                                                                                        <option value={category.id} key={category.id}>{category.name}</option>
                                                                                    ))}
                                                                            </SelectInput>
                                                                            <InputError message={errors.category_id} className="mt-2"/>
                                                                        </div>
                                                                </div>
                                                                <div className=" mt-4  col-span-q ">
                                                                        <TextInput 
                                                                            id="item_sku"
                                                                            type="text"
                                                                            name="sku"
                                                                            readOnly
                                                                            placeholder={sku}
                                                                            value={data.sku} 
                                                                            className="mt-6 block w-full"
                                                                            />
                                                                </div>
                                                                </div>
                                                                <div>
                                                                    <InputLabel htmlFor="item_brand_id" value="Brand"/>
                                                                    <SelectInput
                                                                    id="item_brand_id"
                                                                    name="brand_id"
                                                                    className="mt-1 block w-full"
                                                                    onChange={(e) => setData("brand_id", e.target.value)}>
                                                                        <option value="">Select Project </option>
                                                                        {brands.data.map((brand)=>(
                                                                            <option value={brand.id} key={brand.id}>{brand.name}</option>

                                                                        ))}
                                                                    </SelectInput>
                                                                    <InputError message={errors.brand_id} className="mt-2"/>
                                                                    <h1 id="hello"></h1>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <InputLabel htmlFor="item_description" value="Item Description"/>
                                                                    <TextAreaInput
                                                                    id="item_description"
                                                                    name="description"
                                                                    value={data.description}
                                                                    className="mt-1 block w-full"
                                                                    onChange={e => setData('description', e.target.value)}
                                                                    />
                                                                    <InputError message={errors.description} className="mt-2"/>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <InputLabel htmlFor="item_specs" value="Item Specs"/>
                                                                    <TextAreaInput
                                                                    id="item_description"
                                                                    name="specs"
                                                                    value={data.specs}
                                                                    className="mt-1 block w-full"
                                                                    onChange={e => setData('specs', e.target.value)}
                                                                    />
                                                                    <InputError message={errors.specs} className="mt-2"/>
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-2">
                                                                    <div className="mt-4">
                                                                        <InputLabel htmlFor="item_part_no" value="Item Part Number"/>
                                                                        <TextInput 
                                                                        id="item_part_no"
                                                                        type="text"
                                                                        name="part_no"
                                                                        value={data.part_no}
                                                                        className="mt-1 block w-full"
                                                                        onChange={e => setData('part_no', e.target.value)}
                                                                        />
                                                                        <InputError message={errors.part_no_id} className="mt-2"/>
                                                                    </div>
                                                                    <div className="mt-4">
                                                                        <InputLabel htmlFor="item_serial_no" value="Item Serial Number"/>
                                                                        <TextInput 
                                                                        id="item_serial_no"
                                                                        type="text"
                                                                        name="serial_no"
                                                                        value={data.serial_no}
                                                                        className="mt-1 block w-full"
                                                                        onChange={e => setData('serial_no', e.target.value)}
                                                                        />
                                                                        <InputError message={errors.serial_no} className="mt-2"/>
                                                                    </div>
                                                                    <div className="mt-4">
                                                                        <InputLabel htmlFor="item_model_no" value="Item Model Number"/>
                                                                        <TextInput 
                                                                        id="item_model_no"
                                                                        type="text"
                                                                        name="model_no"
                                                                        value={data.model_no}
                                                                        className="mt-1 block w-full"
                                                                        onChange={e => setData('model_no', e.target.value)}
                                                                        />
                                                                        <InputError message={errors.model_no} className="mt-2"/>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-5 gap-2">
                                                                    <div className="mt-4 col-span-2">
                                                                        <InputLabel htmlFor="item_quantity" value="Item Quantity"/>
                                                                        <TextInput 
                                                                        id="item_quantity"
                                                                        type="number"
                                                                        name="quantity"
                                                                        value={data.quantity}
                                                                        className="mt-1 block w-full"
                                                                        onChange={e => setData('quantity', e.target.value)}
                                                                        />
                                                                        <InputError message={errors.quantity} className="mt-2"/>
                                                                    </div>
                                                                    <div  className="mt-4 col-span-1">
                                                                    <InputLabel htmlFor="item_brand_id" value="Brand"/>
                                                                    <SelectInput
                                                                    id="item_uom"
                                                                    name="uom"
                                                                    className="mt-1 block w-full"
                                                                    onChange={e => setData('uom', e.target.value)} >
                                                                        <option value="">Select UOM </option>
                                                                        <option value="meters">Meters</option>
                                                                        <option value="kilograms">Kilograms</option>
                                                                        <option value="liters">Liters</option>
                                                                        <option value="pieces">Pieces</option>
                                                                    </SelectInput>
                                                                    <InputError message={errors.uom} className="mt-2"/>
                                                                    <h1 id="hello"></h1>
                                                                </div>
                                                                <div className="mt-4 col-span-2">
                                                                    <InputLabel htmlFor="item_employee_id" value="Employee Name"/>
                                                                    <SelectInput
                                                                    id="item_employee_id"
                                                                    name="employee_id"
                                                                    className="mt-1 block w-full"
                                                                    onChange={(e) => setData("employee_id", e.target.value)}>
                                                                        <option value="">Select Employee</option>
                                                                        {employees.data.map((employee)=>(
                                                                            <option value={employee.id} key={employee.id}>{employee.name}</option>

                                                                        ))}
                                                                    </SelectInput>
                                                                    <InputError message={errors.brand_id} className="mt-2"/>
                                                                </div>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="mt-4">
                                                                        <InputLabel htmlFor="item_location_id" value="Location Name"/>
                                                                        <SelectInput
                                                                        id="item_location_id"
                                                                        name="location_id"
                                                                        className="mt-1 block w-full"
                                                                        onChange={(e) => setData("location_id", e.target.value)}>
                                                                            <option value="">Select Location</option>
                                                                            {locations.data.map((location)=>(
                                                                                <option value={location.id} key={location.id}>{location.name}</option>

                                                                            ))}
                                                                        </SelectInput>
                                                                        <InputError message={errors.location_id} className="mt-2"/>
                                                                    </div>
                                                                     <div className="mt-4">
                                                                            <InputLabel htmlFor="item_employee_id" value="Item Status"/>
                                                                            <TextInput
                                                                            id="item_status"
                                                                            type="text"
                                                                            name="status"
                                                                            className="mt-1 block w-full"
                                                                            onChange={(e) => setData("status", e.target.value)}
                                                                            />
                                                                            
                                                                            <InputError message={errors.item_status} className="mt-2"/>
                                                                        </div>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <InputLabel htmlFor="item_remarks" value="Item Remarks"/>
                                                                    <TextAreaInput
                                                                    id="item_remarks"
                                                                    name="remarks"
                                                                    value={data.remarks}
                                                                    className="mt-1 block w-full"
                                                                    onChange={e => setData('remarks', e.target.value)}
                                                                    />
                                                                    <InputError message={errors.remarks} className="mt-2"/>
                                                                </div>
                                                                <div className="mt-4 text-right">
                                                                    <Link href={route('receivingItem.index')}
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
                                                </div>
                                            </div>
                                            </div>
                                        </>
                                     )} */}
                                </div>
                            </div> 
                              <div className="mt-20 text-right">
                                <Link href={route('receiving.index')}
                                className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                                >
                                Cancel
                                </Link>
                                <button className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600"
                                // disabled={receivingItems.length !== 2}
                                >
                                    Submit
                                </button>
                                </div>
                                </div>
                                {/* ITEMS SECTION */}
                             
                           </div>
                    </form>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}