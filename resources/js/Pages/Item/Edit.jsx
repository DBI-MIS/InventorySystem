import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Description } from "@headlessui/react/dist/components/description/description";
import { Head, Link, useForm } from "@inertiajs/react";
export default function Create({auth, item,category, categories, locations, brands, employees }){
    // data will hold/contain the ff:
   const {data, setData, post ,errors,} = useForm({
        name: item.name || "",
        sku_prefix: item.category.sku_prefix || "",
        sku: item.sku || "",
        brand_id: item.brand_id || "",
        category_id: item.category_id || "",
        description: item.description || "",
        specs: item.specs || "",
        part_no: item.part_no || "",
        serial_no: item.serial_no || "",
        model_no: item.model_no || "",
        uom: item.uom || "",
        quantity: item.quantity || "",
        location_id: item.location_id || "",
        employee_id: item.employee_id || "",
        status: item.status || "",
        remarks: item.remarks || "",
        _method: "PUT", 
    });
    const onSubmit = (e) =>{
        // post function declared above
        e.preventDefault();
        post(route("item.update",item.id));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Edit Item {item.name}</h2>
          </div>} >
             <Head title="Items" />
      <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit} className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                                {/* item */}
                                <div className="grid grid-cols-6 gap-2">
                                    <div className="mt-4  col-span-2">
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
                                    <div className="grid-span-2 mt-4 col-span-2">
                                        <InputLabel htmlFor="item_category_id" value="Category"/>
                                        <SelectInput
                                            id="item_category_id"
                                            name="category_id"
                                            defaultValue={data.category_id}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("category_id", e.target.value)}>
                                                <option value="">Select Category </option>
                                                {categories.data.map((category)=>(
                                                    <option value={category.id} key={category.id}>{category.name}</option>
                                                    ))}
                                        </SelectInput>
                                        <InputError message={errors.category_id} className="mt-2"/>
                                    </div>
                                    <div className=" mt-4 col-sapn-2 ">
                                        <InputLabel htmlFor="item_sku_prefix" value="Item Sku Prefix & Sku Code"/>
                                            <div className=" flex h-[11]">
                                                    <TextInput 
                                                    id="item_sku_prefix"
                                                    type="text"
                                                    name="sku_prefix"
                                                    readOnly
                                                    value={data.sku_prefix}
                                                    className="mt-1 w border-r-2 border-r-white focus:border-white focus:border-b-2 focus:!border-b-gray-400 focus:!ring-white"
                                                    onChange={e => setData('sku_prefix', e.target.value)}
                                                    />
                                                    <TextInput 
                                                    id="item_sku"
                                                    type="number"
                                                    name="sku"
                                                    readOnly
                                                    value={data.sku}
                                                    className="mt-1  border-l-2 border-l-white focus:border-white focus:border-b-2 focus:!border-b-gray-400 focus:!ring-white "
                                                    onChange={e => setData('sku', e.target.value)}
                                                    />
                                            </div>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                        {/* brand ID */}
                                    <div className="mt-4  ">
                                        <InputLabel htmlFor="item_brand_id" value="Brand"/>
                                        <SelectInput
                                        id="item_brand_id"
                                        name="brand_id"
                                        className="mt-1 block w-full"
                                        defaultValue={data.brand_id}
                                        onChange={(e) => setData("brand_id", e.target.value)}>
                                            <option value="">Select Project </option>
                                            {brands.data.map((brand)=>(
                                                <option value={brand.id} key={brand.id}>{brand.name}</option>

                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.brand_id} className="mt-2"/>
                                    </div>
                                         {/* END OF brand ID */}
                            
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
                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_uom" value="Item Units of Measurements"/>
                                        <TextInput 
                                        id="item_uom"
                                        type="text"
                                        name="uom"
                                        value={data.uom}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('uom', e.target.value)}
                                        />
                                        <InputError message={errors.uom} className="mt-2"/>
                                    </div>
                                    <div className="mt-4 col-span-2">
                                        <InputLabel htmlFor="item_employee_id" value="Employee Name"/>
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
                                        <InputError message={errors.brand_id} className="mt-2"/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {/* LOCATION ID */}
                                    <div className="mt-4">
                                        <InputLabel htmlFor="item_location_id" value="Location Name"/>
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
                                    {/* END OF LOCATION ID */}
                                    <div className="mt-4">
                                            <InputLabel htmlFor="item_status" value="Item Status"/>
                                            <TextInput
                                            id="item_status"
                                            type="text"
                                            name="status"
                                            value={data.status}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("status", e.target.value)}
                                            />
                                            
                                            <InputError message={errors.status} className="mt-2"/>
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