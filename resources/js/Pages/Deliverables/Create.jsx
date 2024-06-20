import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";

export default function Create({ auth, deliverablesss, clients , stockrequests }) {

    console.log(stockrequests);
    
  const {data, setData, post,errors} = useForm({
    address: '',
    dr_no: '',
    dr_date: '',
    dr_qty: '',
    list_item_id: '',
    remarks:'',
    
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

 const handleClientChange = (e) => {
     const selectedClientId = e.target.value;
     
     const selectedClient = clients.data.find(client => client.id === parseInt(selectedClientId));

     setData({
        ...data,
        client_id: selectedClientId,
        address: selectedClient ? selectedClient.address : ''
     });
       
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
                                        <InputLabel htmlFor="deliverables_client_id" value="Project."/>
                                        <SelectInput 
                                        id="deliverables_client_id"
                                        name="client_id"
                                        className="mt-1 block w-full"
                                        onChange={handleClientChange}
                                        value={data.client_id}
                                        >
                                            <option value="">Select project</option>
                                            {clients.data.map((client)=>(
                                                <option value={client.id} key={client.id}>
                                                    {client.name}
                                                    </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.client_id} className="mt-2"/>
                                    </div>


                                    <div className="mt-4  col-span-3">
                                        <InputLabel htmlFor="deliverables_address" value="Address."/>
                                        <TextInput 
                                        id="deliverables_address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        readOnly
                                        onChange={e => setData('address', e.target.value)}
                                        />
                                        <InputError message={errors.address} className="mt-2"/>
                                    </div>

                                    <div className="grid grid-cols-8 gap-2">
                                       
                                        <div className=" mt-4  col-span-2 ">
                                            <InputLabel htmlFor="deliverables_dr_no" value="DR No."/>
                                            
                                            <TextInput 
                                                id="deliverables_dr_no"
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
                                            <InputLabel htmlFor="deliverables_stockrequest_id" value="RS No."/>
                                            <SelectInput 
                                                id="deliverables_stockrequest_id"
                                           name="stockrequest_id"
                                           className="mt-1 block w-full"
                                                onChange={e => setData('stockrequest_id', e.target.value)}
                                            >
                                                <option value="">Select RS No.</option>
                                                {stockrequests.data.map((stockrequest) => (
                                                    <option value={stockrequest.id} key={stockrequest.id}>
                                                        {stockrequest.rs_no}
                                                    </option>
                                                ))}
                                                </SelectInput>
                                            <InputError message={errors.stockrequest_id} className="mt-2"/>
                                        </div>
                                        <div className="mt-4  col-span-2">
                                            <InputLabel htmlFor="deliverables_dr_qty" value="Qty."/>
                                            <TextInput 
                                                id="deliverables_dr_qty"
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
                                            <InputLabel htmlFor="deliverables_dr_date" value="Date."/>
                                            <TextInput 
                                                id="deliverables_dr_date"
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
                                
                                    <div className="mt-4  col-span-3">
                                        <InputLabel htmlFor="deliverables_remarks" value="Remarks."/>
                                        <TextAreaInput 
                                        id="deliverables_remarks"
                                        type="text"
                                        name="remarks"
                                        value={data.remarks}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('remarks', e.target.value)}
                                        />
                                        <InputError message={errors.remarks} className="mt-2"/>
                                    </div>
                                    <br />
                                    
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
                                                <InputError message={errors.list_item_id} className="mt-2"/>
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