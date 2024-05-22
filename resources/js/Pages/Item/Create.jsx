import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm} from "@inertiajs/react";


export default function Create({auth,brands,sku, categories,employees,locations,success,}){

   const {data, setData, post,errors,reset} = useForm({
        name: '',
        mrr_no: '',
        description: '',
        sku: '',
        specs: '',
        part_no: '',
        serial_no: '',
        model_no: '',
        uom: '',
        quantity:'',
        status: '',
        remarks:'',
        
    })
    const onSubmit = (e) =>{
        // post function declared above
        e.preventDefault();
        post(route("item.store"));
    }
    console.log(data)
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Create New Item</h2>
          </div>
        }
        >
             <Head title="Items" />
      <div className="py-12">
      {success && (
                <div className="bg-green-500 mb-4 py-2 px-4 text-white rounded">
                {success}
              </div>
          )}
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}  data-page="{{ json_encode($page) }}"
                        className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
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
                            <div className="mt-4  col-span-2">
                                    <InputLabel htmlFor="item_mrr_no" value="MRR No."/>
                                    <TextInput 
                                    id="item_mrr_no"
                                    type="text"
                                    name="mrr_no"
                                    value={data.mrr_no}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={e => setData('mrr_no', e.target.value)}
                                     />
                                   
                                </div>
                          <div className=" mt-4  col-span-q ">
                                 <TextInput 
                                    id="item_sku"
                                    type="text"
                                    name="sku"
                                    readOnly
                                    placeholder={sku}
                                    value={data.sku=sku} 
                                    className="mt-6 block w-full"
                                    />
                          </div>
                  
                      
 
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
                          <div className=" mt-4  col-span-2 ">
                            <InputLabel htmlFor="item_brand_id" value="Brand"/>
                            <SelectInput
                            id="item_brand_id"
                            name="brand_id"
                            className="mt-1 block w-full"
                            onChange={(e) => setData("brand_id", e.target.value)}>
                                <option value="">Select Brand </option>
                                {brands.data.map((brand)=>(
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>

                                ))}
                            </SelectInput>
                            <InputError message={errors.brand_id} className="mt-2"/>
                            <h1 id="hello"></h1>
                        </div>
                        {/* END OF brand ID */}
                       
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
                            {/* <div className="mt-4 col-span-1">
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
                            </div> */}
                            <div  className="mt-4 col-span-1">
                            <InputLabel htmlFor="item_brand_id" value="UOM"/>
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
                             {/* brand ID */}
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
                        {/* END OF brand ID */}
                           <div className="grid grid-cols-2 gap-2">
                              {/* LOCATION ID */}
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
                            {/* END OF LOCATION ID */}

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
                  
                    
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}