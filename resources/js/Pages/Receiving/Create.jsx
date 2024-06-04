import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModalReceiving from "@/Components/ModalReceiving";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select"
export default function Create({auth,success, mrr_no,items,clients,categories,employees, locations,skuu,brands,}){

    console.log(items);
    // MAIN FORM OF RECEIVING
   const {data, setData, post,errors} = useForm({
        client_id: '',
        mrr_no: '',
        group_item_id: '',
        si_no:'',
        dr_no:'',
        address:'',
        remarks:'',
    })

    const  options = items.data.map(item => ({ //values from the db
        value: item.id,
        label: item.name
      }));

      const allItems = items.data.map(item => ({ ...item, id: parseInt(item.id) })); // to be used for checking 
      const [selectedOptions, setSelectedOptions] = useState([]);
    
      const handleSelectChange = (selectedOptions) => {
        
        setSelectedOptions(selectedOptions);

        const selectedValues = selectedOptions.map(option => parseInt(option.value));

        setData("group_item_id", selectedValues);
    };

    const [showModal, setShowModal] = useState(false);

    
    // ADD ITEM MODAL FORM

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sku: skuu,
        specs: '',
        part_no: '',
        serial_no: '',
        model_no: '',
        uom: '',
        quantity:'',
        status: '',
        remarks:'',
      });
  
    const  handleChange= (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };
    useEffect(() => {
        console.log('Current MODAL data:', formData); 
    }, [formData]);

    //SUBMIT OF MODAL FORM
    const handleNewItemSubmit = (e) => {
        e.preventDefault();
        console.log('Modal submitted with data:', formData);
        // post(route(" item.storeItem "));
        // Inertia.post('item.submitt', formData);
        post(route("item.submit"), formData);
        console.log("submitted:" + formData)
    };

    //SUBMIT OF MAIN FORM
    const onSubmit = (e) =>{
        alert("hi");
        e.preventDefault();
        post(route("receiving.store"));
     }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Receiving</h2>
          </div>
        }
        >
             <Head title="Receivings" />
      <div className="py-2">
      {success && (
                <div className="bg-green-500 mb-4 py-2 px-4 text-white rounded">
                {success}
              </div>
          )} 
        </div>
        <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}  data-page="{{ json_encode($page) }}"
                        className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                        
                         {/* START */}
                        <div className="grid grid-cols-3 gap-2">

                            {/* 1ST GRID COLUMN */}
                            <div className="col-span-2 grid grid-cols-2 gap-2 content-start"> 

                                <div className="mt-6 col-span-2">
                                    <InputLabel htmlFor="receiving_client_id" value="Client Name"/>
                                    <SelectInput
                                        id="receiving_client_id"
                                        name="client_id"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("client_id", e.target.value)}>
                                            <option value="">Select client </option>
                                            {clients.data.map((client)=>(
                                                <option value={client.id} key={client.id}>{client.name}</option>

                                                ))}
                                    </SelectInput>
                                    <InputError message={errors.client_id} className="mt-2"/>
                                </div>
                        
                                <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="receiving_address" value="Receiving Address"/>
                                        <TextAreaInput
                                        id="receiving_address"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('address', e.target.value)}
                                                />
                                    <InputError message={errors.address} className="mt-2"/>
                                </div>

                                <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="receiving_remarks" value="Receiving Remarks"/>
                                        <TextAreaInput
                                            id="receiving_remarks"
                                            name="receiving_remarks"
                                            value={data.remarks}
                                            className="mt-1 block w-full"
                                            onChange={e => setData('remarks', e.target.value)}
                                        />
                                    <InputError message={errors.remarks} className="mt-2"/>
                                </div>
                            </div>
                                  {/* 2ND GRID COLUMN */}
                                  <div className="mt-14 col-span-1 grid grid-cols-1 content-start">

                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="mrr_no" value="MRR No."/>
                                                        <div className=" flex h-[11]">
                                                        <TextInput 
                                                            id="receiving_mrr_no"
                                                            type="text"
                                                            name="receiving_mrr_no"
                                                            readOnly
                                                            value={data.mrr_no=mrr_no} 
                                                            className=" block w-full"
                                                            />
                                                        </div>
                                        </div>

                                        <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="receiving_si_no" value="SI No."/>
                                                        <TextInput 
                                                            id="receiving_si_no"
                                                            type="text"
                                                            name="si_no"
                                                            value={data.si_no}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={e => setData('si_no', e.target.value)}
                                                        />
                                                        <InputError message={errors.si_no} className="mt-2"/>
                                        </div>

                                        <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="receiving_dr_no" value="DR No."/>
                                                        <TextInput 
                                                            id="receiving_dr_no"
                                                            type="text"
                                                            name="dr_no"
                                                            value={data.dr_no}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={e => setData('dr_no', e.target.value)}
                                                        />
                                                        <InputError message={errors.dr_no} className="mt-2"/>
                                        </div>
                                        
                                    </div>

                            
    
                        </div>
                        {/* GROUP ITEM LIST */}
                        <div className="my-4">
                            <InputLabel htmlFor="receiving Items" value="Group of Items"/>
                                <div className="col-span-10 xs:col-span-8">
                                    <Select
                                          value={selectedOptions}
                                         onChange={handleSelectChange}
                                         className="mt-1 block w-full"
                                          isMulti={true}
                                         options={options}
                                          isSearchable={true}
                                          placeholder="Select Items"
                                     >
                                    </Select>
                                    {/* add new item form modal  */}
                                    <button onClick={(e)=>(e.preventDefault(),setShowModal(true))}
                                        className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mt-5 mr-5"
                                        >Add New Item
                                    </button> 
                                     
                                 </div>

                                 <div className="mt-5">
                                     <h1 className="text-2xl text-center p-5 font-semibold">LIST OF MRR ITEMS</h1>
                                     <table className="min-w-full bg-white">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                            <tr>
                                            <th className="pr-10">ID</th>
                                            <th className="pr-10">Sku</th>
                                            <th className="pr-10">Name</th>
                                            <th className="pr-10">Brand</th>
                                            <th className="pr-10">Category</th>
                                            <th className="pr-10">Model No.</th>
                                            <th className="pr-10">Part No.</th>
                                            <th className="pr-10">Quantity</th>
                                            </tr>
                                        </thead> 
                                     {selectedOptions && selectedOptions.length >= 0 && ( 
                                         <tbody>
                                             {selectedOptions.map(option => {
                                            const selectedItem = allItems.find(item => item.id === parseInt(option.value));

                                             return (
                                                <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={selectedItem.id}>
                                                <td className="px-3 py-2">{selectedItem.id}</td>
                                                <td className="px-3 py-2">{selectedItem.sku_prefix}-{selectedItem.sku}</td>
                                                <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                                    <Link href={route('item.show', selectedItem.id)}>
                                                    {selectedItem.name}
                                                    </Link>
                                                </th>
                                                <td className="px-3 py-2">{selectedItem.brand.name}</td>
                                                 <td className="px-3 py-2">{selectedItem.category.name}</td>
                                                 <td className="px-3 py-2">{selectedItem.model_no}</td>
                                                 <td className="px-3 py-2">{selectedItem.part_no}</td>
                                                 <td className="px-3 py-2">{selectedItem.quantity} {selectedItem.uom}</td>
                                                 </tr>
                                             );
                                        })}
                                        </tbody>
                                                )}                         
                                     </table>
                                 </div>
                        </div>
                       {/* modal */}
                      
                        <div className="mt-20 text-right">
                            <Link href={route('item.index')}
                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                            >
                            Cancel
                            </Link>
                            <button className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                                Submit
                            </button>
                        </div>
                    </form>
                    <ModalReceiving onClose={(e)=>setShowModal(false)} isVisible={showModal} onSubmit={handleNewItemSubmit}>
                                        <div className="">
                                      
                                           <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
                                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                                     <form onSubmit={handleNewItemSubmit} 
                                                    className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" >
                                                   <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Item</h2>     
                                                        {/* START */}
                                                        <div className="grid grid-cols-3 gap-2">

                                                        {/* 1ST GRID COLUMN */}
                                                        <div className="col-span-2 grid grid-cols-2 gap-2 content-start">

                                                            {/* item */}
                                                               <div className="mt-6 col-span-1">
                                                                    <InputLabel htmlFor="item_name" value="Item Name"/>
                                                                        <TextInput 
                                                                            id="item_name"
                                                                            type="text"
                                                                            name="name"
                                                                            value={formData.name}
                                                                            className="mt-1 block w-full"
                                                                            isFocused={true}
                                                                            onChange={handleChange}
                                                                        />
                                                                      <InputError message={errors.name} className="mt-2"/>
                                                                </div>
                                                                 <div className=" mt-6  col-span-1">
                                                                        <InputLabel htmlFor="item_category_id" value="Category"/>
                                                                        <div className=" flex h-[11]">
                                                                            <SelectInput
                                                                                value={formData.category_id}
                                                                                onChange={handleChange}
                                                                                id="item_category_id"
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

                                                                    <div className=" mt-4 col-span-1">
                                                                        <InputLabel htmlFor="item_brand_id" value="Brand"/>
                                                                        <SelectInput
                                                                            id="item_brand_id"
                                                                            name="brand_id"
                                                                            value={formData.brand_id}
                                                                            className="mt-1 block w-full"
                                                                            onChange={handleChange}>
                                                                            <option value="">Select Brand </option>
                                                                                {brands.data.map((brand)=>(
                                                                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                                                                ))}
                                                                        </SelectInput>
                                                                        <InputError message={errors.brand_id} className="mt-2"/>
                                                                     </div>
                                                                <div className="mt-4 col-span-1 col-start-2 grid grid-cols-2 gap-1">
                                                                    <div className="col-span-1">
                                                                            <InputLabel htmlFor="item_quantity" value="Quantity"/>
                                                                            <TextInput 
                                                                                id="item_quantity"
                                                                                type="number"
                                                                                name="quantity"
                                                                                value={formData.quantity}
                                                                                className="mt-1 block w-full"
                                                                                onChange={handleChange}
                                                                            />
                                                                            <InputError message={errors.quantity} className="mt-2"/>
                                                                     </div>
                                                                      <div className="col-span-1">
                                                                        <InputLabel htmlFor="item__uom" value="UOM"/>
                                                                        <SelectInput
                                                                            id="item_uom"
                                                                            name="uom"
                                                                            className="mt-1 block w-full"
                                                                            onChange={handleChange} >
                                                                            <option value="">Select UOM </option>
                                                                            <option value="M">Meters</option>
                                                                            <option value="Kg">Kilograms</option>
                                                                            <option value="L">Liters</option>
                                                                            <option value="Pcs">Pieces</option>
                                                                            <option value="Pc">Piece</option>
                                                                            <option value="Set">Set</option>
                                                                            <option value="Sets">Sets</option>
                                                                        </SelectInput>
                                                                        <InputError message={errors.uom} className="mt-2"/>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-4 col-span-2">
                                                                    <InputLabel htmlFor="item_description" value="Description"/>
                                                                    <TextAreaInput
                                                                        id="item_description"
                                                                        name="description"
                                                                        value={formData.description}
                                                                        className="mt-1 block w-full resize-none"
                                                                        rows="5"
                                                                        onChange={handleChange}
                                                                    />
                                                                    <InputError message={errors.description} className="mt-2"/>
                                                                </div>

                                                                <div className="mt-4 col-span-2">
                                                                    <InputLabel htmlFor="item_specs" value="Specification"/>
                                                                    <TextAreaInput
                                                                        id="item_specs"
                                                                        name="specs"
                                                                        value={formData.specs}
                                                                        className="mt-1 block w-full resize-none"
                                                                        rows="5"
                                                                        onChange={handleChange}
                                                                    />
                                                                    <InputError message={errors.specs} className="mt-2"/>
                                                                </div>

                                                                <div className="mt-4 col-span-2">
                                                                    <InputLabel htmlFor="item_remarks" value="Remarks"/>
                                                                    <TextAreaInput
                                                                        id="item_remarks"
                                                                        name="remarks"
                                                                        value={formData.remarks}
                                                                        className="mt-1 block w-full resize-none"
                                                                        rows="5"
                                                                        onChange={handleChange}
                                                                    />
                                                                    <InputError message={errors.remarks} className="mt-2"/>
                                                                </div>

                                                        </div>
                                                                {/* 2ND GRID COLUMN */}
                                                         <div className="col-span-1 grid grid-cols-1 content-start">
                                                                
                                                            <div className="col-span-1 grid grid-cols-2 ">
                                                                 <div className="mt-6 col-span-2 ">
                                                                <TextInput 
                                                                    id="item_sku"
                                                                    type="text"
                                                                    name="sku"
                                                                    readOnly
                                                                    placeholder={skuu}
                                                                    className="mt-6 block w-full"
                                                                     />
                                                            </div>
                                                            </div>

                                                            <div className="mt-4 col-span-1">
                                                                <InputLabel htmlFor="item_employee_id" value="Status"/>
                                                                <TextInput
                                                                     id="item_status"
                                                                     type="text"
                                                                     name="status"
                                                                     className="mt-1 block w-full"
                                                                     onChange={handleChange}
                                                                />
                                                                 <InputError message={errors.item_status} className="mt-2"/>
                                                             </div>

                                                            <div className="mt-4 col-span-1">
                                                                <InputLabel htmlFor="item_serial_no" value="Serial No."/>
                                                                <TextInput 
                                                                    id="item_serial_no"
                                                                    type="text"
                                                                    name="serial_no"
                                                                    value={formData.serial_no}
                                                                    className="mt-1 block w-full"
                                                                    onChange={handleChange}
                                                                 />
                                                                 <InputError message={errors.serial_no} className="mt-2"/>
                                                            </div>

                                                            <div className="mt-4 col-span-1">
                                                                 <InputLabel htmlFor="item_model_no" value="Model No."/>
                                                                 <TextInput 
                                                                    id="item_model_no"
                                                                    type="text"
                                                                    name="model_no"
                                                                    value={formData.model_no}
                                                                    className="mt-1 block w-full"
                                                                    onChange={handleChange}
                                                                  />
                                                                 <InputError message={errors.model_no} className="mt-2"/>
                                                            </div>

                                                            <div className="mt-4 col-span-1">
                                                                <InputLabel htmlFor="item_part_no" value="Part No."/>
                                                                  <TextInput 
                                                                        id="item_part_no"
                                                                        type="text"
                                                                        name="part_no"
                                                                        value={formData.part_no}
                                                                        className="mt-1 block w-full"
                                                                        onChange={handleChange}
                                                                 />
                                                                  <InputError message={errors.part_no_id} className="mt-2"/>
                                                            </div>

                                                            <div className="mt-4 col-span-1">
                                                                 <InputLabel htmlFor="item_location_id" value="Location"/>
                                                                 <SelectInput
                                                                    id="item_location_id"
                                                                    name="location_id"
                                                                    className="mt-1 block w-full"
                                                                    value={formData.location_id}
                                                                    onChange={handleChange}>
                                                                    <option value="">Select Location</option>
                                                                     {locations.data.map((location)=>(
                                                                          <option value={location.id} key={location.id}>{location.name}</option>

                                                                    ))}
                                                                   </SelectInput>
                                                                   <InputError message={errors.location_id} className="mt-2"/>
                                                            </div>

                                                            <div className="mt-4 col-span-1">
                                                                 <InputLabel htmlFor="item_employee_id" value="Created By:"/>
                                                                 <SelectInput
                                                                    id="item_employee_id"
                                                                    name="employee_id"
                                                                    className="mt-1 block w-full"
                                                                    value={formData.employee_id}
                                                                    onChange={handleChange}>
                                                                     <option value="">Select Employee</option>
                                                                     {employees.data.map((employee)=>(
                                                                        <option value={employee.id} key={employee.id}>{employee.name}</option>

                                                                     ))}
                                                                 </SelectInput>
                                                                 <InputError message={errors.employee_id_id} className="mt-2"/>
                                                            </div>

                                                        </div>

                                                        </div>
                                                                
                                                         <div className="mt-4 text-right">
                                                            <Link href={route('receiving.create')}
                                                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                                                             >
                                                                Cancel
                                                            </Link>
                                                             <button type="submit" className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                                                                    Submit
                                                             </button>
                                                             </div>
                                                     </form>
                                                </div>
                                           </div>
                                       </div> 
                                    </ModalReceiving>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}