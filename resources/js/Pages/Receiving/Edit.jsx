import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";

import Select from "react-select"
export default function Edit({auth,existingItemIds,receiving_items,receiving,items,clients,delivers}){
  // existingItems
 // data will hold/contain the ff:
 const {data, setData, post ,errors,processing} = useForm({
    client_id: receiving.client_id || "",
    mrr_no: receiving.mrr_no || "",
    items: receiving_items || [],
    si_no: receiving.si_no || "",
    deliver_id: receiving.deliver_id || "",
    address: receiving. address || "",
    remarks: receiving. remarks || "",
    _method: "PUT", 
    });
console.log("TRECEIVINGS", receiving)


    
   
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalItems, setTotalItems] = useState('');
    // const [totalPages, setTotalPages] = useState('');
    // const itemsPerPage = 10; // Adjust as needed

    // // Get current items based on currentPage
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    console.log("receiving_items", receiving_items);
    console.log("data itmes", data.items);
    console.log("items data", items.data);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [allItems, setAllItems] = useState([]);
 
    const options = items.data.map(item => ({
      value: item.id,
      label: item.name
  }));

  const allListItems = items.data.map(item => ({
      ...item,
      id: parseInt(item.id, 10)
  }));

  useEffect(() => {
      console.log("CURRENT DATA:", data);
  }, [data]);

  useEffect(() => {
      if (receiving_items) {
          const selectedOptions = receiving_items.map((item) => ({
              value: item.id,
              label: item.name,
          }));
          setSelectedOptions(selectedOptions);
      }
  }, [receiving_items]);

  console.log("SELECTEDOPTIONS", selectedOptions);
  console.log("ALL LIST ITEMS", allListItems);

  const handleSelectChange = useCallback(
      (selectedOptions) => {
          setSelectedOptions(selectedOptions);
      },
      [setSelectedOptions]
  );

  const handleAddSelect = (e) => {
      e.preventDefault();

      // Map the selected options to the corresponding items from allListItems
      const newItems = selectedOptions.map((option) => {
          const selectedItem = allListItems.find(
              (item) => parseInt(item.id, 10) === parseInt(option.value, 10)
          );

          if (!selectedItem) {
              console.error(`Item not found in allListItems for option value: ${option.value}`);
              return null; // Skip this item
          }

          return { ...selectedItem };
      }).filter(item => item !== null); // Filter out any null items

      // Update state with functional setData to avoid race conditions
      setData(prevData => {
          const uniqueItems = [
              ...prevData.items,
              ...newItems.filter(newItem => !prevData.items.some(existingItem => existingItem.id === newItem.id))
          ];

          return {
              ...prevData,
              items: uniqueItems.map((item) => ({ ...item, items: item.id })),
          };
      });
  };

//  
//  const handleRemoveItem = (removedItem) => {
//   const updatedOptions = selectedOptions.filter(option => option.value !== removedItem.value);
//   setSelectedOptions(updatedOptions);

//  
//   setData(prevData => {
//       const updatedItems = prevData.items.filter(item => item.id !== removedItem.value);

//       return {
//           ...prevData,
//           items: updatedItems
//       };
//   });
// };
      
    //     e.preventDefault();
    //     // checking if items are already present in the databaseItemIds 
    //     const newSelectedItemIds = selectedItemIds.filter(id => !databaseItemIds.includes(parseInt(id, 10)));
    //     if (newSelectedItemIds.length === 0) {
    //       setNotification('Items are on the tables already!');
    //       setSelectedOptions([]); 
    //       return;
    //     }
    //     const selectedItems = existingItemIds.filter(item => newSelectedItemIds.includes(item.id.toString()));
      
    //     // Update the receivings state with new selected items
    //     setReceivings(prevReceivings => [...prevReceivings, ...selectedItems]);
      
    //     const intSelectedItemIds = newSelectedItemIds.map(id => parseInt(id, 10));
      
    //     // Update allSelectedItemIds and databaseItemIds with new selected items
    //     const newAllSelectedItemIds = [...allSelectedItemIds, ...intSelectedItemIds];
    //     const newDatabaseItemIds = [...databaseItemIds, ...intSelectedItemIds];
      
    //     setAllSelectedItemIds(newAllSelectedItemIds);
    //     setDatabaseItemIds(newDatabaseItemIds);
    //     setData('group_item_id', newDatabaseItemIds);
    //     // setTotalItems(databaseItemIds.length); // Total number of items
    //     // setTotalPages(Math.ceil(totalItems / itemsPerPage)); // Calculate total pages
    //     // Clear 
    //     setSelectedItemIds([]);
    //     setSelectedOptions([]); 
    //     setNotification('');
    
    //   useEffect(() => {
    //     setData('group_item_id', databaseItemIds);
    //   }, [databaseItemIds]);
    //  ;
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
      // console.log("selected Item ids", selectedItemIds);
      // console.log("receivings", receivings);
      // // console.log("existing Items", existingItemss);
      // console.log("selectedOptions", selectedOptions);
      // console.log("allSelectedItemIds", allSelectedItemIds);
      // console.log("databaseItemIds", databaseItemIds);
// 
    //delete button of the existing item on the table
    // const handleRemoveExistingItem = ( selectedItemId, index) => {
    //     const remainIds = [...databaseItemIds];
    //     remainIds.splice(index, 1);
    //     setDatabaseItemIds(remainIds);
    //     setAllSelectedItemIds(remainIds);
    // };
    // useEffect(() => {
    //     console.log('Current data:', data); 
    // }, [data]);

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
                          {/* <div className="mt-2 mx-2">
                            {notification && (
                              <div className="text-red-600 font-semibold mt-2">
                                {notification}
                              </div>
                            )}
                          </div> */}
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
                                                <th className="text-left">Actions</th> {/* Added Actions column */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.items.map((item) => (
                                                <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={`${item.sku}-${item.name}`}>
                                                   
                                                    <td className="w-[60px] py-2 text-sm">{item.id}</td>
                                                    <td className="w-[160px] py-2 text-sm">{item.category.sku_prefix ?? "No Sku Prefix"}-{item.sku ?? "No Sku"}</td>
                                                    <td className="w-[300px] py-2 text-gray-600 text-nowrap hover:underline text-left">
                                                        {item.name ?? "No Item Name"}
                                                    </td>
                                                    <td className="w-[160px] py-2 text-sm">{item.brand && item.brand.name ? item.brand.name : 'No Brand Name'}</td>
                                                    <td className="w-[160px] py-2 text-sm">{item.category && item.category.name ? item.category.name : "No Category Name"}</td>
                                                    <td className="w-[200px] py-2 text-sm">{item.model_no ?? "No Model Number"}</td>
                                                    <td className="w-[300px] py-2 text-sm">{item.part_no ?? "No Part Number"}</td>
                                                    <td className="w-[160px] py-2">{item.quantity ? (item.quantity + ' ' + (item.uom ?? "No UOM")) : 'No Quantity'}</td>
                                                    <td className="w-[100px] py-2">
                                                        {item.isNew && (
                                                            <button
                                                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded-full"
                                                                onClick={() => handleRemoveItem(item.sku, item.name)} // unique keys
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                       </tbody>

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