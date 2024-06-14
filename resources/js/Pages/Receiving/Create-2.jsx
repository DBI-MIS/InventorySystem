import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModalReceiving2 from "@/Components/ModalReceiving2";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link,useForm } from "@inertiajs/react";
import { useEffect,  useState} from "react";
import Select from "react-select"
import React from "react";

export default function Create({ auth, success, compact, response, delivers, mrr_no, items, clients, categories, employees, locations, skuu, brands }) {
    
    // MAIN FORM OF RECEIVING
    const { data, setData, post, errors } = useForm({
        client_id: '',
        mrr_no: '',
        group_item_id: [],
        si_no: '',
        address: '',
        remarks: '',
    });

    const options = items.data.map(item => ({
        value: item.id,
        label: item.name,
    }));

    const allItems = items.data.map(item => ({ ...item, id: parseInt(item.id) }));

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sku: skuu,
        specs: '',
        part_no: '',
        serial_no: '',
        model_no: '',
        uom: '',
        quantity: '',
        status: '',
        remarks: '',
    });

    useEffect(() => {
        console.log('Current MODAL data:', formData);
    }, [formData]);

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        const selectedValues = selectedOptions.map(option => parseInt(option.value));
        setData('group_item_id', selectedValues);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewItemSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('item.submit'), formData, {
            onSuccess: (page) => {
                setShowModal(false);
                // Assuming the new item data is returned in the props
                const newItem = page.props.item;
                const newItemOption = { value: newItem.id, label: newItem.name };
                setSelectedOptions([...selectedOptions, newItemOption]);
                setData('group_item_id', [...data.group_item_id, newItem.id]);
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('receiving.store'));
    };

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
                                            onChange={e => setData('remarks', e.target.value)}
                                        />
                                    <InputError message={errors.remarks} className="mt-2"/>
                                </div>
                            </div>
                                  {/* 2ND GRID COLUMN */}
                                  <div className="mt-10 col-span-1 grid grid-cols-1 content-start">
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
                                                            placeholder="Enter SI Number"
                                                            value={data.si_no}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={e => setData('si_no', e.target.value)}
                                                        />
                                                        <InputError message={errors.si_no} className="mt-2"/>
                                        </div>
                                        <div className="t-4 col-span-1">
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
                                    <span className="mt-2"><b>If items are not available on the lists, you can add new Item.</b></span>
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
                      
                    </form>
                     <ModalReceiving2 
                    isOpen={showModal} 
                    onClose={() => setShowModal(false)}
                    auth={auth}
                    items={items}
                    categories={categories}
                    brands={brands}
                    locations={locations}
                    employees={employees}
                    onSubmit={handleNewItemSubmit}
                />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}