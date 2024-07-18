
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModalReceiving from "@/Components/ModalReceiving";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link,useForm, usePage } from "@inertiajs/react";
import { useCallback, useEffect,  useState} from "react";
import Select from "react-select"
import React from "react";
import { ITEM_STATUS_TEXT_MAP } from "@/constants";
export default function Create({auth,delivers,mrr_no,items,newItem,clients,categories,employees, locations,skuu,brands,}){
    
    console.log(delivers);
    // MAIN FORM OF RECEIVING
   const {data, setData,post,errors} = useForm({
        client_id: '',
        mrr_no: '',
        group_item_id: '',
        si_no:'',
        address:'',
        remarks:'',
        items: [],
    })

    console.log("CUrrent Data:" + data)

    const  options = items.data.map(item => ({ //values from the db
        value: item.id,
        label: item.name
      }));

      const [newAllItems, setnewAllItems] = useState([])
    const allItems = items.data.map(item => ({ ...item, id: parseInt(item.id) })); // to be used for checking 
    const [selectedOptions, setSelectedOptions] = useState([]);


   
    console.log("SelectedOptions")
    
    const [showModal, setShowModal] = useState(false);
    
    // ADD ITEM MODAL FORM
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        brand_id: '',
        sku: skuu,
        specs: '',
        part_no: '',
        serial_no: '',
        model_no: '',
        uom: '',
        quantity:'',
        statuses: '',
        remark:'',
        location_id: '1', // == DBI depends on factory what id 
        user_id: '',
        
      });

      const statusesOptions = Object.keys(ITEM_STATUS_TEXT_MAP).map((key) => ({
        value: key,
        label: ITEM_STATUS_TEXT_MAP[key],
      }));

     const [isClearable, setIsClearable] = useState(true);
     const [isSearchable, setIsSearchable] = useState(true);
     const [isDisabled, setIsDisabled] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [isRtl, setIsRtl] = useState(false);

     const handleSelectChange = useCallback(
        (selectedOptions) => {
            setSelectedOptions(selectedOptions);

            const selectedItems = selectedOptions.map((option) => {
                const selectedItem = allItems.find(
                    (item) => item.id === parseInt(option.value)
                );
                return { ...selectedItem };
            });

            setData({
                ...data,
                items: [...selectedItems, ...data.items.filter(item => !selectedItems.some(selectedItem => selectedItem.id === item.id))]
            });
        },
        [allItems, setSelectedOptions, setData, data]
    );
    const handleChange = (event) => {
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

    const handleNewItemSubmit = async (e) => {
        e.preventDefault();

        
        const newItem = { ...formData };

        // Update state to include the new item
        setData({
            ...data,
            items: [...data.items, newItem],
        });

        // Reset form data after submission
        setFormData({
            name: '',
            category_id: '',
            brand_id: '',
            quantity: '',
            uom: '',
            description: '',
            specs: '',
            remark: '',
            sku: '',
            statuses: '',
            serial_no: '',
            model_no: '',
            part_no: '',
            location_id: '',
        });

        // Close modal after submission
        setShowModal(false);
    };

   
     
    const onSubmit = (e) => {
        e.preventDefault();

        post(
            route("item.store"),
            { items: data.items },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );

        post(route("receiving.store"));

    };


     useEffect(() => {
        // Set the mrr_no when the component mounts or mrr_no prop changes
        setData(prevData => ({ ...prevData, mrr_no }));
    }, [mrr_no]);
    
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center"  >
                 <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New MRR</h2>
            </div>
        }
        >
             <Head title="MRR" />
      <div className="py-2">

        </div>
        <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}   data-page="{{ json_encode($page) }}"
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
                                        isFocused={true}
                                        onChange={(e) => setData("client_id", e.target.value)}>
                                            <option value="">Select Client Name </option>
                                            {clients.data.map((client)=>(
                                                <option value={client.id} key={client.id}>{client.name}</option>

                                                ))}
                                    </SelectInput>
                                    <InputError message={errors.client_id} className="mt-2"/>
                                </div>
                                

                                {/* <div className="mt-6 col-span-1">
                                    <InputLabel htmlFor="receiving_status" value="Status"/>
                                    <div>
                                    <select value={status} onChange={handleStatusChange}>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                                    <InputError message={errors.status} className="mt-2"/>
                                </div> */}
                                {/* <div>
                                    <label>Status:</label>
                                    <select value={status} onChange={handleStatusChange}>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div> */}
                        
                                <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="receiving_address" value="Address"/>
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

                                
                            </div>
                                  {/* 2ND GRID COLUMN */}
                                  <div className="mt-2 col-span-1 grid grid-cols-1 content-start">
                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="mrr_no" value="MRR No."/>
                                                        <div className=" flex h-[11]">
                                                        <TextInput 
                                                            id="receiving_mrr_no"
                                                            type="text"
                                                            name="receiving_mrr_no"
                                                            readOnly
                                                            max={6}
                                                            value={data.mrr_no} 
                                                            className=" block w-full"
                                                            />
                                                        </div>
                                        </div>
                                       {/* <button type="button" onClick={handleAddSKU}>
                                            newly created Items
                                        </button> */}
                                        <div className="mt-6 col-span-1">
                                        <InputLabel htmlFor="receiving_si_no" value="SI No."/>
                                                        <TextInput 
                                                            id="receiving_si_no"
                                                            type="text"
                                                            name="si_no"
                                                            placeholder="Enter SI Number"
                                                            value={data.si_no}
                                                            className="mt-1 block w-full"
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
                            <InputLabel htmlFor="receiving Items" value="Select Item/s"/>
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
                                                placeholder="*(Can Select Mutiple Items)"
                                            >
                                            </Select>
                                        </div>
                                        {/* add new item form modal  */}
                                        <div className="text-nowrap">
                                            <button onClick={(e)=>(e.preventDefault(),setShowModal(true))}
                                                className=" flex flex-nowrap text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-md rounded-lg text-nowrap  px-16 py-2 text-center mr-5"
                                                >
                                                    <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="font-bold w-6 h-6"
                                 >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                                    Add Item/s
                                            </button> 
                                        </div>
                                    </div>
                                    <span className="mt-2 text-sm text-gray-600"><b>Note:</b> If items are not available on the lists, you can add new Item.</span>
                                 </div>
                               
          

                                 <div className="mt-5 min-h-[300px]">
                                     <h1 className="text-2xl text-center text-blue-800 p-5 font-semibold">LIST OF ITEMS</h1>
                                     <table className="min-w-full bg-white">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                            <tr>
                                            <th className="text-left">#</th>
                                            <th className="text-left">Sku</th>
                                            <th className="text-left">Name</th>
                                            <th className="text-left">Brand</th>
                                            <th className="text-left">Category</th>
                                            <th className="text-left">Model No.</th>
                                            <th className="text-left">Part No.</th>
                                            <th className="text-left">Quantity</th>
                                            </tr>
                                        </thead> 
                   
                                         <tbody>
                                         {data.items.map((item,index) => (
                                         
                                                <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                                <td className="w-[60px] py-2 text-sm">
                                                    {index + 1}
                                                    {/* {selectedItem.id ?? "No Item ID"} */}
                                                    </td>
                                                <td className="w-[160px] py-2 text-sm">{item.sku_prefix ?? "No Sku Prefix"}-{item.sku ?? "No Sku"}</td>
                                                <th className="w-[300px] py-2 text-gray-600 text-nowrap hover:underline text-left">
                                                    {/* <Link href={route('item.show', item.id)}> */}
                                                    {item.name ?? "No Item Name"}
                                                    {/* </Link> */}
                                                </th>
                                                <td className="w-[160px] py-2 text-sm"> {item.brand && item.brand.name ? item.brand.name : 'No Brand Name'}</td>
                                                 <td className="w-[160px] py-2 text-sm">{item.category && item.category.name ? item.category.name: "No Category Name"}</td>
                                                 <td className="w-[200px] py-2 text-sm">{item.model_no ?? "No Model Number"}</td>
                                                 <td className="w-[300px] py-2 text-sm">{item.part_no ?? "No Part Number"}</td>
                                                 <td className="w-[160px] py-2 ">{item.quantity ? (item.quantity + ' ' + (item.uom ?? "No UOM")) : 'No Quantity'}</td>
                                                 </tr>
                                        ))}
                                        </tbody>
                                                                        
                                     </table>
                                 </div>
                        </div>
                        <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="receiving_remarks" value="Remarks"/>
                                        <TextAreaInput
                                            id="receiving_remarks"
                                            name="receiving_remarks"
                                            placeholder="Enter Remarks"
                                            value={data.remarks}
                                            className="mt-1 block w-full"
                                            rows="5"
                                            onChange={e => setData('remarks', e.target.value)}
                                        />
                                    <InputError message={errors.remarks} className="mt-2"/>
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
                    <div>
                    <button onClick={() => setShowModal(true)}>Add Item</button>
                    {showModal && (
                    <ModalReceiving 
                    onClose={()=>setShowModal(false)}
                    isVisible={showModal}
                    onSubmit={ handleNewItemSubmit}>
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

                                                            <input type="text"
                                                            id="item_user_id"
                                                            name="user_id"
                                                            defaultValue={data.user_id}
                                                            hidden={true}
                                                            />
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
                                                                    <InputLabel htmlFor="item_remark" value="Remark"/>
                                                                    <TextAreaInput
                                                                        id="item_remark"
                                                                        name="remark"
                                                                        placeholder="Enter Item Remarks"
                                                                        value={formData.remark}
                                                                        className="mt-1 block w-full resize-none"
                                                                        rows="5"
                                                                        onChange={handleChange}
                                                                    />
                                                                    <InputError message={errors.remark} className="mt-2"/>
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
                                                                <InputLabel htmlFor="item_statuses" value="Status"/>
                                                                <Select
                                                                        className="basic-single"
                                                                        placeholder="Select Status"
                                                                        isDisabled={isDisabled}
                                                                        isLoading={isLoading}
                                                                        isClearable={isClearable}
                                                                        isRtl={isRtl}
                                                                        defaultValue={formData.statuses} 
                                                                        onChange={({ value }) => setFormData({ ...formData, statuses: value })}
                                                                        isSearchable={isSearchable}
                                                                        name="statuses"
                                                                        options={statusesOptions}
                                                                    />
                                                                        <InputError message={errors.statuses} className="mt-2"/>
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

                                                            {/* <div className="mt-4 col-span-1">
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
                                                            </div> */}

                                                        </div>

                                                        </div>
                                                                
                                                         <div className="mt-4 text-right">
                                                         <button type="button" onClick={() => setShowModal(false)} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2">
                                Cancel
                            </button>
                                                             <button type="submit" className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                                                                    Submit
                                                             </button>
                                                             </div>
                                                     </form>
                                                     
                                                </div>
                                           </div>
                                       </div> 
                                    </ModalReceiving>
                    )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}