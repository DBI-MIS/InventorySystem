import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";

export default function Create({ auth, deliverablesss }) {

    
    
  const {data, setData, post,errors} = useForm({
    project: '',
    address: '',
    dr_no: '',
    rs_no: '',
    dr_date: '',
    dr_qty: '',
    list_item_id: '',
    
});

console.log(data)

const  options = deliverablesss.data.map(item => ({ //values from the db
    value: item.id,
    label: item.name
  }));

  const allItems = deliverablesss.data.map(item => ({ ...item, id: parseInt(item.id) })); // to be used for checking 
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    
    setSelectedOptions(selectedOptions);

    const selectedValues = selectedOptions.map(option => parseInt(option.value));

    setData("list_item_id", selectedValues);
};



  const onSubmit = (e) =>{
    // post function declared above
    e.preventDefault();
    post(route("deliverables.store"));
};

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
        <form onSubmit={onSubmit} 
                        className="p-4 sm:p8  bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                           <div className="flex">
                                <div className="w-full">
                                    <div className="mt-4  col-span-3">
                                        <InputLabel htmlFor="receiving_project" value="Project."/>
                                        <TextInput 
                                        id="receiving_project"
                                        type="text"
                                        name="project"
                                        value={data.project}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('project', e.target.value)}
                                        />
                                        <InputError message={errors.project} className="mt-2"/>
                                    </div>

                                    <div className="mt-4  col-span-3">
                                        <InputLabel htmlFor="receiving_address" value="Address."/>
                                        <TextInput 
                                        id="receiving_address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('address', e.target.value)}
                                        />
                                        <InputError message={errors.address} className="mt-2"/>
                                    </div>

                                    <div className="grid grid-cols-8 gap-2">
                                       
                                        <div className=" mt-4  col-span-2 ">
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
                                        <div className="mt-4  col-span-2">
                                            <InputLabel htmlFor="receiving_rs_no" value="RS No."/>
                                            <TextInput 
                                                id="receiving_rs_no"
                                           type="text"
                                           name="rs_no"
                                           value={data.rs_no}
                                           className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={e => setData('rs_no', e.target.value)}
                                            />
                                            <InputError message={errors.rs_no} className="mt-2"/>
                                        </div>
                                        <div className="mt-4  col-span-2">
                                            <InputLabel htmlFor="receiving_dr_qty" value="Qty."/>
                                            <TextInput 
                                                id="receiving_dr_qty"
                                                type="number"
                                                name="dr_qty"
                                                value={data.dr_qty}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={e => setData('dr_qty', e.target.value)}
                                            />
                                            <InputError message={errors.dr_qty} className="mt-2"/>
                                        </div>
                                        <div className="mt-4  col-span-2">
                                            <InputLabel htmlFor="receiving_dr_date" value="Date."/>
                                            <TextInput 
                                                id="receiving_dr_date"
                                                type="date"
                                                name="dr_date"
                                                value={data.dr_date}
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={e => setData('dr_date', e.target.value)}
                                            />
                                            <InputError message={errors.dr_date} className="mt-2"/>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4">
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
                                            </div>
                                            <div className="mt-5">
                                                <h1 className="text-2xl text-center p-5 font-semibold">DELIVERY RECEIPT</h1>
                                                <table className="min-w-full bg-white">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                                    <tr>
                                                    <th className="pr-10">ID</th>
                                                    <th className="pr-10">QTY</th>
                                                    <th className="pr-10">UNIT</th>
                                                    <th className="pr-10">ITEM NAME</th>
                                                    <th className="pr-10">ITEM DESCRIPTION</th>
                                                    </tr>
                                                </thead> 
                                                {selectedOptions && selectedOptions.length >= 0 && ( 
                                                    <tbody>

                                                        {selectedOptions.map(option => {
                                                        const selectedItem = allItems.find(item => item.id === parseInt(option.value));
                                                        return (
                                                            <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={selectedItem.id}>
                                                            <td className="px-3 py-2">{selectedItem.id}</td>
                                                            <td className="px-3 py-2">{selectedItem.quantity}</td>
                                                            <td className="px-3 py-2">{selectedItem.uom}</td>
                                                            <td className="px-3 py-2">{selectedItem.name}</td>
                                                            <td className="px-3 py-2">{selectedItem.description}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                    </tbody>
                                                )}                         
                                                </table>
                                            </div>
                                     </div>
                                     <br /><br /><br />
                                     
                                    <div className="mt-20 text-right">
                                        <Link href={route('deliverables.index')}
                                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                                        >
                                        Cancel
                                        </Link>
                                        <button className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                                            Submit
                                        </button>
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