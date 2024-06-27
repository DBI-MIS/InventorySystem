import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

import Select from "react-select"
export default function Edit({auth,existingItems,existingItemIds,receiving,items,clients,delivers}){

 // data will hold/contain the ff:
 const {data, setData, post ,errors,processing} = useForm({
    client_id: receiving.client_id || "",
    group_item_id: existingItemIds || "",
    mrr_no: receiving.mrr_no || "",
    receiving_item_id: receiving.receiving_item_id || "",
    si_no: receiving.si_no || "",
    deliver_id: receiving.deliver_id || "",
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

    

    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalItems, setTotalItems] = useState('');
    // const [totalPages, setTotalPages] = useState('');
    // const itemsPerPage = 10; // Adjust as needed

    // // Get current items based on currentPage
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const handleSelectChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
        setCurrentPage(selectedOption)
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
        // setTotalItems(databaseItemIds.length); // Total number of items
        // setTotalPages(Math.ceil(totalItems / itemsPerPage)); // Calculate total pages
        // Clear 
        setSelectedItemIds([]);
        setSelectedOptions([]); 
        setNotification('');
      };
      useEffect(() => {
        setData('group_item_id', databaseItemIds);
      }, [databaseItemIds]);
     ;
// 
  
const onNextPage = (e) => {
  e.preventDefault()
  setCurrentPage(currentPage + 1);
};

const onPrevPage = (e) => {
  e.preventDefault()
  setCurrentPage(currentPage - 1);
};

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
          <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Edit MRR No. - {receiving.mrr_no}</h2>
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
                                        defaultValue={data.client_id}
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
                                    <InputLabel htmlFor="receiving_address" value="Address"/>
                                        <TextAreaInput
                                        id="receiving_address"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        rows="4"
                                        onChange={e => setData('address', e.target.value)}
                                                />
                                    <InputError message={errors.address} className="mt-2"/>
                                </div>

                                
                            </div>

                            {/* 2ND GRID COLUMN */}
                            <div className="mt-3 col-span-1 grid grid-cols-1 content-start">

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

                                <div className="mt-6 col-span-1">
                                <InputLabel htmlFor="receiving_si_no" value="SI No."/>
                                <TextInput 
                                     id="receiving_si_no"
                                    type="text"
                                    name="si_no"
                                     value={data.si_no}
                                     className="mt-1 block w-full"
                                    
                                     onChange={e => setData('si_no', e.target.value)}
                                 />
                                 <InputError message={errors.si_no} className="mt-2"/>
                                </div>

                                  <div className="mt-4 col-span-1">
                                  <InputLabel htmlFor="receiving_deliverable_id" value="DR No."/>
                                            <div className="col-span-10 xs:col-span-8">
                                                <SelectInput
                                                    id="receiving_deliverable_id"
                                                    name="deliverable_id"
                                                    className="mt-1 block w-full"
                                                    defaultValue={data.deliver_id}
                                                    onChange={(e) => setData("deliver_id", e.target.value)}>
                                                        <option value="">Select DR No </option>
                                                        {delivers.data.map((deliver)=>(
                                                            <option value={deliver.id} key={deliver.id}>{deliver.dr_no}</option>

                                                            ))}
                                                </SelectInput>
                                            </div>
                                            <InputError message={errors.deliver_id} className="mt-2"/>
                                </div>
                                {/* <div className="mt-4 col-span-1">
                                <InputLabel htmlFor="receiving_deliver_id" value="DR No."/>
                                      <TextInput 
                                           id="receiving_deliver_id"
                                           type="text"
                                           name="deliver_id"
                                           value={data.deliver_id}
                                           className="mt-1 block w-full"
                                           isFocused={true}
                                          onChange={e => setData('deliver_id', e.target.value)}
                                      />
                                    <InputError message={errors.deliver_id} className="mt-2"/>
                                </div> */}
                            </div>
    
                        </div>
                        {/* GROUP ITEM LIST */}
                        <div>
                        <div className=" mt-4">
                          <InputLabel htmlFor="group_item_id" value="Select Item/s"/>
                          <div className="w-full flex flex-row gap-5 items-center">
                              <div className="w-full">
                                  <Select
                                      value={selectedOptions}
                                      onChange={handleSelectChange}
                                      className="mt-1 block w-full"
                                      isFocused={true}
                                      isMulti={true}
                                      options={options}
                                      isSearchable={true}
                                      placeholder="*Can select multiple"
                                  >
                                  </Select>
                                  <InputError message={errors.group_item_id} className="mt-2"/>
                              </div>
                              <div className="text-nowrap">
                                  <button
                                    className="flex flex-nowrap gap-2 font-semibold text-md bg-blue-700 py-2 px-10 text-white rounded shadow transition-all hover:bg-blue-800"
                                    onClick={handleAddSelect}
                                  >  <svg
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
                          
                          {/* WARNING MESSAGE WHEN ADDING DUPLICATE ITEMS */}
                          <div className="mt-2 mx-2">
                            {notification && (
                              <div className="text-red-600 font-semibold mt-2">
                                {notification}
                              </div>
                            )}
                          </div>
                      </div>
                      <div className="mt-2">
                          <h1 className="text-2xl text-blue-700 text-center p-5 font-semibold">LIST OF ITEMS</h1>
                            <table className="min-w-full bg-white">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr>
                                  <th className="w-[60px]">#</th>
                                  <th className="w-[100px]">Sku</th>
                                  <th className="w-[200px]">Quantity</th>
                                  <th className="w-[500px] text-left">Name</th>
                                  <th className="w-[200px] text-left">Brand</th>
                                  <th className="w-[200px] text-left">Category</th>
                                  <th className="w-[100px]">Action</th>
                                </tr>
                              </thead> 
                              {/* if group item is null */}
                              {!databaseItemIds || databaseItemIds.length === 0 && (
                                <div class="font-md mt-5 text-center text-gray-600 p-4">
                                  No existing items on Material Receiving Report #  {data.mrr_no}
                                </div>
                                )
                              }
                              {databaseItemIds && databaseItemIds.length >= 0 && ( 
                                 <tbody>
                                    {databaseItemIds.map((selectedItemId,index) => {
                                      const selectedItem = existingItemss.find(item => item.id === selectedItemId);
                                        if (selectedItem) {
                                      return (
                                        <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/20'} border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700`} key={selectedItem.id}>
                                          <td className="text-center text-sm p-1">
                                            {index + 1}
                                            
                                            </td>
                                          <td className="text-center text-sm">{selectedItem.sku_prefix}-{selectedItem.sku}</td>
                                          <td className="text-center text-sm">{selectedItem.quantity} {selectedItem.uom}</td>
                                          <th className="text-gray-600 text-nowrap hover:underline text-left">
                                            <Link href={route('item.show', selectedItem.id)}>
                                              {selectedItem.name}
                                            </Link>
                                          </th>
                                          <td className="text-left">{selectedItem.brand.name}</td>
                                          <td className="text-left">{selectedItem.category.name}</td>
                                          
                                          <td className="w-[100px] flex flex-row justify-center items-center">
                                            <button
                                              onClick={() => handleRemoveExistingItem(selectedItem.id, index)}
                                              className="text-red-600 mx-1 hover:text-gray-600"
                                            >
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                </svg>
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
                      <div className="mt-4 col-span-2">
                                    <InputLabel htmlFor="receiving_remarks" value="Remarks"/>
                                        <TextAreaInput
                                            id="receiving_remarks"
                                            name="remarks"
                                            value={data.remarks}
                                            className="mt-1 block w-full"
                                            rows="5"
                                            onChange={e => setData('remarks', e.target.value)}
                                        />
                                    <InputError message={errors.remarks} className="mt-2"/>
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