import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ITEM_STATUS_CLASS_MAP, ITEM_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from 'react-select';
export default function Edit({auth, item,categories, locations, brands, employees }){
    // data will hold/contain the ff:
   const {data, setData, post ,errors,} = useForm({
        name: item.name || "",
        sku_prefix: item.sku_prefix || "",
        sku: item.sku || "",
        brand_id: item.brand_id || "",
        category_id: item.category_id || "",
        category_name: item.category_name || "",
        description: item.description || "",
        specs: item.specs || "",
        part_no: item.part_no || "",
        serial_no: item.serial_no || "",
        model_no: item.model_no || "",
        uom: item.uom || "",
        quantity: item.quantity || "",
        location_id: item.location_id || "",
        employee_id: item.employee_id || "",
        statuses: item.statuses || "",
        remark: item.remark || "",
        _method: "PUT", 
    });

    const statusesOptions = Object.keys(ITEM_STATUS_TEXT_MAP).map((key) => ({
        value: key,
        label: ITEM_STATUS_TEXT_MAP[key],
      }));

    //  const statusesOptions =useState(["hi", "hello"]);
     const [isClearable, setIsClearable] = useState(true);
     const [isSearchable, setIsSearchable] = useState(true);
     const [isDisabled, setIsDisabled] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [isRtl, setIsRtl] = useState(false);

    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("item.update",item.id));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Edit Item {item.name}</h2>
          </div>} >
             <Head title="Items" />
      <div className="py-6">
          <div className="w-5/6 mx-auto sm:px-6 lg:px-8 ">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg relative">
                    <form onSubmit={onSubmit} className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                                {/* START */}
                                
                                <div className="grid grid-cols-3 gap-2 ">
                                     {/* 1ST GRID COLUMN */}
                                    <div className="col-span-2 grid grid-cols-2 gap-2 content-start">

                                    {/* item */}
                                    <div className="mt-6 col-span-1">
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

                                     {/* category ID */}
                                     <div className=" mt-6 col-span-1">
                                        <InputLabel htmlFor="item_category_id" value="Category"/>
                                        <SelectInput
                                            id="item_category_id"
                                            name="category_id"
                                            defaultValue={data.category_id}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("category_id", e.target.value)}>
                                                <option value='category.id'>Select Category </option>
                                                {categories.data.map((category)=>(
                                                    <option value={category.id} key={category.id}>{category.name}</option>
                                                    ))}
                                        </SelectInput>
                                        <InputError message={errors.category_id} className="mt-2"/>
                                    </div>

                                     {/* brand ID */}
                                     <div className="mt-6 col-span-1 col-start-1">
                                        <InputLabel htmlFor="item_brand_id" value="Brand"/>
                                        <SelectInput
                                        id="item_brand_id"
                                        name="brand_id"
                                        className="mt-1 block w-full"
                                        defaultValue={data.brand_id}
                                        onChange={(e) => setData("brand_id", e.target.value)}>
                                            <option value='brand.id'>Select Brand</option>
                                            {brands.data.map((brand)=>(
                                                <option value={brand.id} key={brand.id}>{brand.name}</option>

                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.brand_id} className="mt-2"/>
                                    </div>
                                            {/* QUANTITY & UOM */}
                                    <div className="mt-6 col-span-1 col-start-2 grid grid-cols-2 gap-1">
                                    <div className="col-span-1">
                                        <InputLabel htmlFor="item_quantity" value="Quantity"/>
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
                                    <div className="col-span-1">
                                        <InputLabel htmlFor="item_uom" value="UOM"/>
                                        <SelectInput 
                                        id="item_uom"
                                        type="text"
                                        name="uom"
                                        defaultValue={data.uom}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('uom', e.target.value)} >
                                            <option value="">Select UOM </option>
                                            <option value="Meters">Meters</option>
                                            <option value="Kilograms">Kilograms</option>
                                            <option value="Liters">Liters</option>
                                            <option value="Pieces">Pieces</option>
                                            <option value="Piece">Piece</option>
                                            <option value="Set">Set</option>
                                            <option value="Sets">Sets</option>
                                        </SelectInput>
                                        <InputError message={errors.uom} className="mt-2"/>
                                    </div>
                                    </div>

                                            {/* SKU No. Floating */}
                                    <div className="items-end content-end absolute right-0 -top-5">
                                    <div className="mt-4 col-span-1 flex flex-row items-center" >
                                        {/* <InputLabel htmlFor="item_sku_prefix" value="SKU No."/> */}
                                        <span className="mt-1">SKU No.</span>
                                            <div className="flex flex-row focus:border-white focus:border-b-2 focus:!border-b-gray-400 focus:!ring-white">
                                                    <TextInput 
                                                    id="item_sku_prefix"
                                                    type="text"
                                                    name="sku_prefix"
                                                    readOnly
                                                    value={data.sku_prefix}
                                                    className="mt-1 !border-none w-[60px] pointer-events-none text-right"
                                                    // onChange={e => setData('sku_prefix', e.target.value)}
                                                    />
                                                    <TextInput 
                                                    id="item_sku"
                                                    type="number"
                                                    name="sku"
                                                    readOnly
                                                    value={data.sku}
                                                    className="mt-1 w-[100px] !border-none pointer-events-none text-left"
                                                    onChange={e => setData('sku', e.target.value)}
                                                    />
                                            </div>
                                    </div>
                                    </div>
                                            {/* Description */}
                                    <div className="mt-4 col-span-2 col-start-1">
                                    <InputLabel htmlFor="item_description" value="Item Description"/>
                                    <TextAreaInput
                                    id="item_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full resize-none"
                                    rows="5"
                                    onChange={e => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2"/>
                                    </div>
                                            {/* Specifications */}
                                     <div className="mt-4 col-span-2">
                                        <InputLabel htmlFor="item_specs" value="Item Specs"/>
                                        <TextAreaInput
                                            id="item_description"
                                            name="specs"
                                            value={data.specs}
                                            className="mt-1 block w-full resize-none"
                                            rows="5"
                                            onChange={e => setData('specs', e.target.value)}
                                        />
                                        <InputError message={errors.specs} className="mt-2"/>
                                    </div>
                                            {/* Remarks */}
                                     <div className="mt-4 col-span-2">
                                        <InputLabel htmlFor="item_remark" value="Item Remarks"/>
                                        <TextAreaInput
                                            id="item_remark"
                                            name="remark"
                                            value={data.remark}
                                            className="mt-1 block w-full resize-none"
                                            rows="5"
                                            onChange={e => setData('remark', e.target.value)}
                                        />
                                        <InputError message={errors.remark} className="mt-2"/>
                                     </div>

                                    </div>
                                    {/* 2ND GRID COLUMN */} 
                                    <div className="grid grid-cols-1 content-start">

                                        {/* Status */}
                                    <div className="mt-7 col-span-1">
                                        <InputLabel htmlFor="item_statuses" value="Status"/>
                                        <Select
                                            className="basic-single"
                                            placeholder="Select Status"
                                            isDisabled={isDisabled}
                                            isLoading={isLoading}
                                            isClearable={isClearable}
                                            isRtl={isRtl}
                                            defaultValue={data.statuses} 
                                            onChange={({ value }) => setData({ ...data, statuses: value })}
                                            isSearchable={isSearchable}
                                            name="statuses"
                                            options={statusesOptions}
                                    />
                                        <div className="flex gap-2 mt-2 text-sm">  
                                        <span> Existing Status:</span>
                                        <span className={`px-2 py-[0.15rem] text-sm font-semibold rounded ${ITEM_STATUS_CLASS_MAP[item.statuses]} text-white`}>
                                                {ITEM_STATUS_TEXT_MAP[item.statuses] }
                                            </span>
                                            <InputError message={errors.statuses} className="mt-2"/>
                                        </div>
                                    </div>

                                            {/* Serial */}
                                    <div className=" mt-3 col-span-1">
                                        <InputLabel htmlFor="item_serial_no" value="Serial No."/>
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

                                            {/* Model */}
                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_model_no" value="Model"/>
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

                                            {/* Part No. */}
                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_part_no" value="Part No."/>
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

                                     {/* LOCATION ID */}
                                     <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_location_id" value="Location"/>
                                        <SelectInput
                                        id="item_location_id"
                                        name="location_id"
                                        className="mt-1 block w-full"
                                        defaultValue={data.location_id}
                                        onChange={(e) => setData("location_id", e.target.value)}>
                                            <option value="">Select Location</option>
                                            {locations.data.map((location)=>(
                                                <option value={location.id} key={location.id}>{location.name}</option>

                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.location_id} className="mt-2"/>
                                    </div>
                        
                                            {/* Employee */}
                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_employee_id" value="Created By:"/>
                                        <SelectInput
                                        id="item_employee_id"
                                        name="employee_id"
                                        className="mt-1 block w-full"
                                        defaultValue={data.employee_id}
                                        onChange={(e) => setData("employee_id", e.target.value)}>
                                            <option value="">Select Employee</option>
                                            {employees.data.map((employee)=>(
                                                <option value={employee.id} key={employee.id}>{employee.name}</option>

                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.employee_id} className="mt-2"/>
                                    </div>

                                    </div>  
                                  
                                   
                                         
            
                                      
                                   

                                   

                                    
                                   
                                </div>
                                {/* END OF Form */}
                                
                                
                              
                             
                               
                               
                                <div className="mt-4 text-right">
                                    <Link href={route('item.index')}
                                         className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                                         >Cancel
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