import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
// import Select from "react-select/dist/declarations/src/Select";
import Select from "react-select"
export default function Create({auth, receiving,mrr_item_ids, existingGroupItems}){

 // data will hold/contain the ff:
 const {data, setData, post ,errors,processing} = useForm({
    client_id: receiving.client_id || "",
    mrr_no: receiving.mrr_no || "",
    group_item_id: receiving.group_item_id || "",
    reference_no: receiving.reference_no || "",
    receiving_item_id: receiving.receiving_item_id || "",
    si_no: receiving.si_no || "",
    dr_no: receiving.dr_no || "",
    address: receiving. address || "",
    remarks: receiving. remarks || "",
        _method: "PUT", 
    });

  // alert(existingGroupItems)
    // const [ databaseItemIds, setdatabaseItemIds] = useState(receiving.group_item_id) // value of that array item ids from the database is 4,9,12,16
    const [databaseItemIds, setDatabaseItemIds] = useState(Array.isArray(receiving.group_item_id) ? receiving.group_item_id : []);

    const mrr_item_ids_parsed = mrr_item_ids.map(item => ({ ...item, id: parseInt(item.id) }));
    const [notification, setNotification] = useState('');
    // const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [allSelectedItemIds, setAllSelectedItemIds] = useState([]);
    const [receivings, setReceivings] = useState([]);
    console.log("existing options " + existingGroupItems)
    
    const  options = mrr_item_ids.map(item => ({
      value: item.id,
      label: item.name
    }));
    const  existingoptions = existingGroupItems.map( existingGroupItem => ({
      value: existingGroupItem.id,
      label: existingGroupItem.name
    }));
  console.log("values in receiving item ids : " + databaseItemIds)
  console.log("data" + data)

console.log(mrr_item_ids_parsed)

const [selectedOptions, setSelectedOptions] = useState(existingoptions);
const [selectedItemIds, setSelectedItemIds] = useState([]);

useEffect(() => {
  // Update selectedItemIds whenever selectedOptions changes
  setSelectedItemIds(selectedOptions.map(option => option.value));
}, [selectedOptions]);
   console.log("selectedItemIDs " + selectedItemIds) 
  const handleSelectChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
    const selectedOptionss =  Array.from(selectedOption, (option) => option.value);
    setSelectedItemIds(selectedOptionss);
    setSelectedOptions(selectedOption);
    alert("selectedOptionss" + selectedOptionss);
  };
  console.log("selected Item ids" + selectedItemIds)
  const handleAddSelect = (e) => {
    e.preventDefault();
    const newSelectedItemIds = selectedOptions.filter(id => !allSelectedItemIds.includes(parseInt(id, 10)));
    const duplicateItemIds = selectedOptions.filter(id => allSelectedItemIds.includes(parseInt(id, 10)));
   

    if (newSelectedItemIds.length === 0) return;

    const selectedItems = mrr_item_ids.filter(item => newSelectedItemIds.includes(item.id.toString()));
    setReceivings(prevReceivings => [...prevReceivings, ...selectedItems]);

    const intSelectedItemIds = newSelectedItemIds.map(id => parseInt(id, 10));
    const newAllSelectedItemIds = [...allSelectedItemIds, ...intSelectedItemIds];
    const newDatabaseItemIds = [...databaseItemIds, ...intSelectedItemIds];

    setAllSelectedItemIds(newAllSelectedItemIds);
    setDatabaseItemIds(newDatabaseItemIds);
    setData('group_item_id', newDatabaseItemIds);
    alert("wehr" + allSelectedItemIds)
    setSelectedItemIds([]);
    setNotification('');
  };

  useEffect(() => {
    setData('group_item_id', allSelectedItemIds);
  }, [allSelectedItemIds]);

  console.log("receivings" + receivings)
 
    console.log("set of data" + data);
    console.log(mrr_item_ids);
     

  const handleRemoveSelect = (idToRemove, index) => {
   // alert(index);

    //mutate
    const newPrevIds = [...allSelectedItemIds];
    // Remove the item at the specified index using splice method
    newPrevIds.splice(index, 1);
   // alert(newPrevIds);
    // Update the state with the new array of item IDs
    setAllSelectedItemIds(newPrevIds);
    // Update the state 
    setReceivings(prevReceivings => prevReceivings.filter(item => item.id !== idToRemove));
  };

    
      useEffect(() => {
        setData('group_item_id', databaseItemIds);
      }, [databaseItemIds]);
    
    //delete button of the existing item on the table
    const handleRemoveExistingItem = ( selectedItemId, index) => {
      //alert(index)
      
       // e.preventDefault();
        const remainIds = [...databaseItemIds];
        //alert("database ids:" + remainIds)
        remainIds.splice(index, 1);
        // const updatedItems = data.group_item_id.filter(id => id !== selectedItemId);
       // alert('Updated items:'+  remainIds);
        setdatabaseItemIds(remainIds)
          // setData('group_item_id', remainIds);
        // const newAllSelectedItemIds = allSelectedItemIds.filter(id => id !== selectedItemId);
        // setAllSelectedItemIds(newAllSelectedItemIds);
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
          <div className="flex justify-between receivings-center">
            <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Edit Receiving {receiving.name}</h2>
          </div>} >
      <Head title="Receivings" />
      <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <form onSubmit={onSubmit}
                className="p-4 sm:p8  bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                  <div className="flex">
                    <div className="w-full">
                      <div className="mt-4  col-span-3">
                                    <InputLabel htmlFor="receiving_client_id" value="Client Id"/>
                                    <TextInput 
                                        id="receiving_client_id"
                                        type="text"
                                        name="client_id"
                                        value={data.client_id}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('client_id', e.target.value)}
                                        />
                                        <InputError message={errors.client_id} className="mt-2"/>
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                                    <div className=" mt-4  col-span-2 ">
                                        <InputLabel htmlFor="mrr_no" value="MRR No."/>
                                            <TextInput 
                                                id="mrr_no"
                                                type="text"
                                                name="mrr_no"
                                                readOnly
                                                value={data.mrr_no}
                                                className="mt-1 block w-full"
                                                onChange={e => setData('mrr_no', e.target.value)}
                                            />
                                    </div>
                                    <div className="mt-4  col-span-2">
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
                                    <div className="mt-4  col-span-2">
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
                      <div className="mt-4">
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
                      <div>
                        <h5>Select items</h5>
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
                        {/* <Select
                          value={selectedItemIds}
                          onChange={handleSelectChange}
                          className="mt-1 block w-full"
                          isMulti={true}
                          options={mrr_item_ids}
                         >
                          {mrr_item_ids.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </Select> */}

                      </div>
                      <div className="mt-4">
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
{/* {receivings && receivings.length !== 0 && ( */}
                      <div>
                         <div> 
                        
                            <div className="mt-20 mx-8">
                            {notification && (
                            <div className="text-red-600 font-semibold mt-2">
                              {notification}
                            </div>
                          )}
                                  <h1>Items</h1>
                                  {/* <div className="grid grid-cols-9 gap-2 mt-2">
                                    <div className="col-span-8 w-full">
                                      <select
                                        value={selectedItemIds}
                                        onChange={handleSelectChange}
                                        className="mt-1 block w-full"
                                        multiple
                                      >
                                        {mrr_item_ids.map((item) => (
                                          <option value={item.id} key={item.id}>
                                            {item.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div> */}
                            </div>
                            <div className="flex justify-center">
                                  <button
                                    className="flex m-5 text-xl flex-nowrap gap-2 border rounded-full font-semibold bg-green-500 py-2 px-10 text-white shadow transition-all hover:bg-green-700"
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
                        
                            <table className="min-w-full bg-white">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr>
                                  <th className="pr-10">ID</th>
                                  <th className="pr-10">Sku</th>
                                  <th className="pr-10">Name</th>
                                  <th className="pr-10">MRR No.</th>
                                  <th className="pr-10">Model No.</th>
                                  <th className="pr-10">Part No.</th>
                                  <th className="pr-10">Quantity</th>
                                  <th className="pr-10">Description</th>
                                  <th className="pr-10">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {/* {receivings && receivings.length !== 0 && (
                                <>
                                  {receivings.map((selectedItem, index) => (
                                    <tr
                                      className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700"
                                      key={selectedItem.id}
                                    >
                                      <td className="px-3 py-2">{selectedItem.id}</td>
                                      <td className="px-3 py-2">{selectedItem.sku_prefix}-{selectedItem.sku}</td>
                                      <td className="px-3 py-2">{selectedItem.name}</td>
                                      <td className="px-3 py-2">{selectedItem.mrr_no}</td>
                                      <td className="px-3 py-2">{selectedItem.model_no}</td>
                                      <td className="px-3 py-2">{selectedItem.part_no}</td>
                                      <td className="px-3 py-2">{selectedItem.quantity} {selectedItem.uom}</td>
                                      <td className="px-3 py-2">{selectedItem.description}</td>
                                      <td>
                                    
                                       <button
                                        onClick={() => handleRemoveSelect(selectedItem.id,index)}
                                        className="font-medium text-red-600 p-2 hover:bg-red-600 hover:text-white hover:rounded-full mx-1"
                                      >
                                        Remove
                                      </button>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )} */}
                              </tbody>  
                              {databaseItemIds && databaseItemIds.length >= 0 && ( 
                                 <tbody>
                                    {databaseItemIds.map((selectedItemId,index) => {
                                      const selectedItem = mrr_item_ids_parsed.find(item => item.id === selectedItemId);
                                        if (selectedItem) {
                                        return (
                                                <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={selectedItem.id}>
                                                  <td className="px-3 py-2">
                                                    {selectedItem.id}
                                                  </td>
                                                  <td className="px-3 py-2">
                                                                                    {selectedItem.sku_prefix}-{selectedItem.sku}
                                                  </td>
                                                  <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                                    <Link href={route('item.show', selectedItem.id)}>
                                                      {selectedItem.name}
                                                    </Link>
                                                  </th>
                                                  <td className="px-3 py-2">{selectedItem.mrr_no}</td>
                                                  <td className="px-3 py-2">{selectedItem.model_no}</td>
                                                  <td className="px-3 py-2">{selectedItem.part_no}</td>
                                                  <td className="px-3 py-2">{selectedItem.quantity} {selectedItem.uom}</td>
                                                  <td className="px-3 py-2">{selectedItem.description}</td>
                                                  <td>
                                            <button
                                              onClick={() => handleRemoveExistingItem(selectedItemId, index)}
                                              // handleRemoveExistingItem(index,selectedItem)}
                                              className="font-medium text-red-600 p-2 hover:bg-red-600 hover:text-white hover:rounded-full mx-1"
                                            >
                                              Remove
                                            </button>
                                          </td>
                                              </tr>
                                               );
                                       }
                                       else 
                                       {
                                         return <p key={selectedItemId}>Item Not Found</p>;
                                       }
                                    })}
                                  </tbody>   
                              )}                  
                            </table>
                           
                          </div>
                        <div className="mt-20 text-right">
                                        <Link href={route('receiving.index')}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                                        >
                                        Cancel
                                        </Link>
                                        <button type="submit" disabled={processing} className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                                            Submit
                                        </button>
                        </div>
                    </div>
                  </div>
              </form>
            </div>
          </div>
      </div>
     </AuthenticatedLayout>
    )
}