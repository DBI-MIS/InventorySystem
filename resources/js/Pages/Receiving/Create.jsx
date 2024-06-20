import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModalReceiving from "@/Components/ModalReceiving";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link,useForm } from "@inertiajs/react";
import { useEffect,  useState} from "react";
import Select from "react-select"
import React from "react";
export default function Create({auth,success,compact,response,delivers ,mrr_no,items,clients,categories,employees, locations,skuu,brands,}){
    
    console.log(delivers);
  
    // MAIN FORM OF RECEIVING
   const {data, setData,post,errors} = useForm({
        client_id: '',
        mrr_no: '',
        group_item_id: '',
        si_no:'',
        // dr_no:'',
        address:'',
        remarks:'',
    })
    console.log("CUrrent Data:" + data)
// const newItem, setNewItem = 
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
        location_id: '1' // == DBI depends on factory what id 
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
    console.log(data);

    const handleNewItemSubmit = (e) => {
        e.preventDefault();
    
        Inertia.post(route('item.submit'), formData)
      };

    //SUBMIT OF MAIN FORM
    const onSubmit = (e) =>{
        // alert("hi");
        e.preventDefault();
        post(route("receiving.store"));
     }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center"  >
                 <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Material Receiving Report</h2>
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
                                        className="block w-full"
                                        onChange={(e) => setData("client_id", e.target.value)}>
                                            <option value="">Select client Name </option>
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
                                        placeholder="Enter Full Address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        rows="5"
                                        onChange={e => setData('address', e.target.value)}
                                                />
                                    <InputError message={errors.address} className="mt-2"/>
                                </div>

                                <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="receiving_remarks" value="Receiving Remarks"/>
                                        <TextAreaInput
                                            id="receiving_remarks"
                                            name="receiving_remarks"
                                            placeholder="Enter Receiving Remarks"
                                            value={data.remarks}
                                            className="mt-1 block w-full"
                                            rows="5"
                                            onChange={e => setData('remarks', e.target.value)}
                                        />
                                    <InputError message={errors.remarks} className="mt-2"/>
                                </div>
                            </div>
                                  {/* 2ND GRID COLUMN */}
                                  <div className="mt-2 col-span-1 grid grid-cols-1 content-start">
                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="mrr_no" value="MRR No."/>
                                                        <div className=" flex h-[11]">
                                                        <TextInput 
                                                            id="receiving_mrr_no"
                                                            type="number"
                                                            name="receiving_mrr_no"
                                                            readOnly
                                                            max={6}
                                                            value={data.mrr_no=mrr_no} 
                                                            className=" block w-full"
                                                            />
                                                        </div>
                                        </div>

                                        <div className="mt-6 col-span-1">
                                        <InputLabel htmlFor="receiving_si_no" value="SI No."/>
                                                        <TextInput 
                                                            id="receiving_si_no"
                                                            type="text"
                                                            name="si_no"
                                                            placeholder="Enter SI Number"
                                                            value={data.si_no}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={e => setData('si_no', e.target.value)}
                                                        />
                                                        <InputError message={errors.si_no} className="mt-2"/>
                                        </div>
                                        <div className="mt-6 col-span-1">
                                            <InputLabel htmlFor="receiving_deliverable_id" value="DR No."/>
                                            <div className="col-span-10 xs:col-span-8">
                                                <SelectInput
                                                    id="receiving_deliverable_id"
                                                    name="deliverable_id"
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData("deliver_id", e.target.value)}>
                                                        <option value="">Select DR No </option>
                                                        {delivers.data.map((deliver)=>(
                                                            <option value={deliver.id} key={deliver.id}>{deliver.dr_no}</option>

                                                            ))}
                                                </SelectInput>
                                            </div>
                                            <InputError message={errors.deliver_id} className="mt-2"/>
                                        </div>
                                    </div>
                        </div>
                        {/* GROUP ITEM LIST */}
                        <div className="my-4">
                            <InputLabel htmlFor="receiving Items" value="Group of Items"/>
                                <div className="col-span-10 xs:col-span-8">
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="w-full ">
                                            <Select
                                                value={selectedOptions}
                                                onChange={handleSelectChange}
                                                className=" block"
                                                isMulti={true}
                                                options={options}
                                                isSearchable={true}
                                                placeholder="Select Items (Can Select Mutiple Items)"
                                            >
                                            </Select>
                                        </div>
                                        {/* add new item form modal  */}
                                        <div>
                                            <button onClick={(e)=>(e.preventDefault(),setShowModal(true))}
                                                className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-md rounded-lg text-nowrap  px-16 py-2 text-center mr-5"
                                                >Add New Item
                                            </button> 
                                        </div>
                                    </div>
                                    <span className="mt-2 text-sm text-gray-600"><b>Note:</b> If items are not available on the lists, you can add new Item.</span>
                                 </div>

                                 <div className="mt-5">
                                     <h1 className="text-2xl text-center text-blue-800 p-5 font-semibold">LIST OF MRR ITEMS</h1>
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
                                                <td className="px-3 py-2">{selectedItem.id ?? "No Item ID"}</td>
                                                <td className="px-3 py-2">{selectedItem.sku_prefix ?? "No Sku Prefix"}-{selectedItem.sku ?? "No Sku"}</td>
                                                <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                                    <Link href={route('item.show', selectedItem.id)}>
                                                    {selectedItem.name ?? "No Item Name"}
                                                    </Link>
                                                </th>
                                                <td className="px-3 py-2"> {selectedItem.brand && selectedItem.brand.name ? selectedItem.brand.name : 'No Brand Name'}</td>
                                                 <td className="px-3 py-2">{selectedItem.category && selectedItem.category.name ? selectedItem.category.name: "No Category Name"}</td>
                                                 <td className="px-3 py-2">{selectedItem.model_no ?? "No Model Number"}</td>
                                                 <td className="px-3 py-2">{selectedItem.part_no ?? "No Part Number"}</td>
                                                 <td className="px-3 py-2">{selectedItem.quantity ? (selectedItem.quantity + ' ' + (selectedItem.uom ?? "No UOM")) : 'No Quantity'}</td>
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
                    <ModalReceiving 
                    onClose={(e)=>setShowModal(false)}
                    isVisible={showModal}
                    onSubmit={handleNewItemSubmit}>
                                        <div className="">
                                      
                                           <div className="q-full sm:px-6 lg:px-8">
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
                                                                            placeholder="Enter New Item Name"
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
                                                                                placeholder="Enter Quantity"
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
                                                                        placeholder="Enter Item Description"
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
                                                                        placeholder="Enter Item Specification"
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
                                                                        placeholder="Enter Item Remarks"
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
                                                                     placeholder="Enter Item Status"
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
                                                                    placeholder="Enter Serial Number"
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
                                                                    placeholder="Enter Model Number"
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
                                                                        placeholder="Enter Part Number"
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
                                                                 <InputError message={errors.employee_id} className="mt-2"/>
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