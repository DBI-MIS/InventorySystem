import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Select from "react-select"
export default function Edit({auth,existingItems,existingItemIds,receiving,items,clients}){

 // data will hold/contain the ff:
 const {data, setData, post ,errors,processing} = useForm({
    client_id: receiving.client_id || "",
    group_item_id: existingItemIds || "",
    mrr_no: receiving.mrr_no || "",
    receiving_item_id: receiving.receiving_item_id || "",
    si_no: receiving.si_no || "",
    dr_no: receiving.dr_no || "",
    address: receiving. address || "",
    remarks: receiving. remarks || "",
        _method: "PUT", 
    });

    const [databaseItemIds, setDatabaseItemIds] = useState(Array.isArray(existingItemIds) ? existingItemIds : []);
    const existingItemss  = items.data.map(item => ({ ...item, id: parseInt(item.id) }));
    const [notification, setNotification] = useState('');
    const [allSelectedItemIds, setAllSelectedItemIds] = useState([]);
    const [receivings, setReceivings] = useState([]);
   
    const  options = items.data.map(item => ({ //values from the db
      value: item.id,
      label: item.name
    }));

    const selectedValueItems = databaseItemIds.map(databaseItemId=> ({
         value: databaseItemId.id,
         label:  databaseItemId.id,
     }));

     const [selectedOptions, setSelectedOptions] = useState(allSelectedItemIds);
     const [selectedItemIds, setSelectedItemIds] = useState(selectedValueItems.map(option => option.value));

    useEffect(() => {
      setSelectedItemIds(selectedOptions.map(option => option.value));
    }, [selectedOptions]);

      const handleSelectChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
        const selectedOptionss =  Array.from(selectedOption, (option) => option.value);
        setSelectedItemIds(selectedOptionss);
        setSelectedOptions(selectedOption);
        //checking values
        // alert("selectedOptionss" + selectedOptionss);
      };
      console.log("selected Item ids" + selectedItemIds)
      
      const handleAddSelect = (e) => {
        e.preventDefault();
        // checking if items are already present in the databaseItemIds 
        const newSelectedItemIds = selectedItemIds.filter(id => !databaseItemIds.includes(parseInt(id, 10)));
        if (newSelectedItemIds.length === 0) {
          setNotification('Items are on the tables already!');
          setSelectedOptions([]); 
          return;
        }
        const selectedItems = existingItems.filter(item => newSelectedItemIds.includes(item.id.toString()));
      
        // Update the receivings state with new selected items
        setReceivings(prevReceivings => [...prevReceivings, ...selectedItems]);
      
        const intSelectedItemIds = newSelectedItemIds.map(id => parseInt(id, 10));
      
        // Update allSelectedItemIds and databaseItemIds with new selected items
        const newAllSelectedItemIds = [...allSelectedItemIds, ...intSelectedItemIds];
        const newDatabaseItemIds = [...databaseItemIds, ...intSelectedItemIds];
      
        setAllSelectedItemIds(newAllSelectedItemIds);
        setDatabaseItemIds(newDatabaseItemIds);
        setData('group_item_id', newDatabaseItemIds);
      
        // Clear 
        setSelectedItemIds([]);
        setSelectedOptions([]); 
        setNotification('');
      };
      useEffect(() => {
        setData('group_item_id', databaseItemIds);
      }, [databaseItemIds]);

      // checking of values
      console.log("selected Item ids", selectedItemIds);
      console.log("receivings", receivings);
      console.log("existing Items", existingItemss);
      console.log("selectedOptions", selectedOptions);
      console.log("allSelectedItemIds", allSelectedItemIds);
      console.log("databaseItemIds", databaseItemIds);

    //delete button of the existing item on the table
    const handleRemoveExistingItem = ( selectedItemId, index) => {
        const remainIds = [...databaseItemIds];
        remainIds.splice(index, 1);
        setDatabaseItemIds(remainIds);
        setAllSelectedItemIds(remainIds);
    };
    useEffect(() => {
        console.log('Current data:', data); 
    }, [data]);

    //submit button
    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("receiving.update",receiving.id));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center"  >
          <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Receiving {receiving.id}</h2>
        </div>
      } >
      <Head title="Receivings" />
      <div className="py-6">
          <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit} 
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
                                            name="remarks"
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
                                                    name="mrr_no"
                                                    readOnly
                                                    value={data.mrr_no} 
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
                        <div>
                        <div className=" mt-4">
                          <InputLabel htmlFor="group_item_id" value=" Group of Items"/>
                          <div className=" grid grid-cols-12 gap-5">
                              <div className="col-span-9 xs:col-span-6">
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
                              <div className="col-span-3 xs:col-span-2">
                                  <button
                                    className="flex flex-nowrap gap-2 font-semibold text-md bg-green-500 py-2 px-14 text-white rounded shadow transition-all hover:bg-green-700"
                                    onClick={handleAddSelect}
                                  >
                                  Add Items
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
                                  </button>
                              </div>
                          </div>
                          {/* WARNING MESSAGE WHEN ADDING DUPLICATE ITEMS */}
                          <div className="mt-2 mx-2">
                            {notification && (
                              <div className="text-red-600 font-semibold mt-2">
                                {notification}
                              </div>
                            )}
                          </div>
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
                                  <th className="pr-10">Action</th>
                                </tr>
                              </thead> 
                              {databaseItemIds && databaseItemIds.length >= 0 && ( 
                                 <tbody>
                                    {databaseItemIds.map((selectedItemId,index) => {
                                      const selectedItem = existingItemss.find(item => item.id === selectedItemId);
                                        if (selectedItem) {
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
                                          <td>
                                            <button
                                              onClick={() => handleRemoveExistingItem(selectedItem.id, index)}
                                              className="font-medium text-red-600 p-2 hover:bg-red-600 hover:text-white hover:rounded-full mx-1"
                                            >
                                              Remove
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    } else {
                                      return null; 
                                    }
                                  })}
                                </tbody>
                              )}                         
                            </table>
                      </div>
                        </div>
                      
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
                </div>
          </div>
      </div>
     
     </AuthenticatedLayout>
    )
}