import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth, items }) {

  const {data, setData, post,errors,reset} = useForm({
    project: '',
    address: '',
    dr_no: '',
    rs_no: '',
    dr_date: '',
    item_qty: '',
    item_unit: '',
    item_description: '',
    
})


  const onSubmit = (e) =>{
    // post function declared above
    e.preventDefault();
    post(route("deliverables.store"));
}

    return (
        <Authenticated
        user={auth.user}
        header={
          <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Delivery Receipt</h2>
          </div>
        }
        >
            <Head title="Delivery Receipt" />

            <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <form onSubmit={onSubmit} className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                        
                         {/* START */}
                         <div className="grid grid-cols-6 gap-2">

                         {/* 1ST GRID COLUMN */}
                         <div className="col-span-5 grid grid-cols-2 gap-2 content-start">

                         <div className="mt-6 col-span-2">
                                        <InputLabel htmlFor="project" value="Project"/>
                                        <TextInput
                                        id="project"
                                        type="text"
                                        name="project"
                                        value={data.project}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('project', e.target.value)}
                                        />
                                        <InputError message={errors.project} className="mt-2"/>
                                    </div>
                                    <div className="mt-1 col-span-2">
                                        <InputLabel htmlFor="address" value="Address"/>
                                        <TextInput
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('address', e.target.value)}
                                        />
                                        <InputError message={errors.address} className="mt-2"/>
                                    </div>
                                    <div className="mt-1 col-span-2">
                                        <InputLabel htmlFor="address" value="#"/>
                                        <TextInput
                                        id=""
                                        type="text"
                                        name=""
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('', e.target.value)}
                                        />
                                        <InputError message={errors.address} className="mt-2"/>
                                    </div>
                                    <div className="mt-1 col-span-2">
                                        <InputLabel htmlFor="item_qty" value="QTY"/>
                                        <TextInput
                                        id="item_qty"
                                        type="text"
                                        name="item_qty"
                                        value={data.item_qty}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('item_qty', e.target.value)}
                                        />
                                        <InputError message={errors.item_qty} className="mt-2"/>
                                    </div>
                                    <div className="mt-1 col-span-2">
                                        <InputLabel htmlFor="item_unit" value="UNIT"/>
                                        <TextInput
                                        id="item_unit"
                                        type="text"
                                        name="item_unit"
                                        value={data.item_unit}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('item_unit', e.target.value)}
                                        />
                                        <InputError message={errors.item_unit} className="mt-2"/>
                                    </div>
                                    <div className="mt-1 col-span-10">
                                        <InputLabel htmlFor="item_name" value="ITEM NAME"/>
                                        <SelectInput 
                                            
                                        >

                                        </SelectInput>
                                        <InputError message={errors.item_name} className="mt-2"/>
                                    </div>
                                    <div className="mt-1 col-span-2">
                                        <InputLabel htmlFor="item_description" value="ITEM DESCRIPTION"/>
                                        <TextInput
                                        id="item_description"
                                        type="text"
                                        name="item_description"
                                        value={data.item_description}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('item_description', e.target.value)}
                                        />
                                        <InputError message={errors.item_description} className="mt-2"/>
                                    </div>
                                    
                                    
                                    

                                    
                                    

                          </div>

                          <div className="col-span-1 grid grid-cols-1 content-start">
                        
                        <div className="col-span-1 grid grid-cols-2 ">

                        <div className="mt-6 col-span-2">
                                <InputLabel htmlFor="dr_no" value="DR No.:"/>
                                <TextInput
                                    id="dr_no"
                                    type="text"
                                    name="dr_no"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("dr_no", e.target.value)}
                                />
                                <InputError message={errors.dr_no} className="mt-2"/>
                            </div>
                            <div className="mt-3 col-span-2">
                                <InputLabel htmlFor="rs_no" value="RS No.:"/>
                                <TextInput
                                    id="rs_no"
                                    type="text"
                                    name="rs_no"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("rs_no", e.target.value)}
                                />
                                <InputError message={errors.rs_no} className="mt-2"/>
                            </div>

                        <div className=" mt-3  col-span-2">
                                    <InputLabel htmlFor="dr_date" value="Date" />
                                    <div className=" flex h-[11]">

                                    <TextInput
                                    id="dr_date"
                                    type="date"
                                    name="dr_date"
                                    value={data.dr_date}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("dr_date", e.target.value)}
                                    />
                                    <InputError message={errors.dr_date} className="mt-2" />

                                    </div>
                                    </div>

                        </div>
                        </div>

                          </div>
                          
                          
        </form>
            

        </div>
    </div>
            </div>

        </Authenticated>
    )
}