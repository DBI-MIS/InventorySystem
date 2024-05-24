import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Select from "react-select"
export default function Create({auth, receiving,mrr_item_ids}){

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
    const [databaseItemIds, setDatabaseItemIds] = useState(Array.isArray(receiving.group_item_id) ? receiving.group_item_id : []);
    const mrr_item_ids_parsed = mrr_item_ids.map(item => ({ ...item, id: parseInt(item.id) }));
    const [notification, setNotification] = useState('');
    const [allSelectedItemIds, setAllSelectedItemIds] = useState([]);
    const [receivings, setReceivings] = useState([]);

    const  options = mrr_item_ids.map(item => ({
      value: item.id,
      label: item.name
    }));

    const selectedValueItems = databaseItemIds.map(databaseItemId => ({
         value: databaseItemId.id,
         label:  databaseItemId.id,
     }))
    console.log(mrr_item_ids_parsed)

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
      
        // Filter out the selected items that are already present in the databaseItemIds 
        const newSelectedItemIds = selectedItemIds.filter(id => !databaseItemIds.includes(parseInt(id, 10)));
        if (newSelectedItemIds.length === 0) {
          setNotification('Items are on the tables already!');
          return;
        }
        // Filter the mrr_item_ids 
        const selectedItems = mrr_item_ids.filter(item => newSelectedItemIds.includes(item.id.toString()));
      
        // Update the receivings state with new selected items
        setReceivings(prevReceivings => [...prevReceivings, ...selectedItems]);
      
        // Convert selected item IDs to integers
        const intSelectedItemIds = newSelectedItemIds.map(id => parseInt(id, 10));
      
        // Update allSelectedItemIds and databaseItemIds with new selected items
        const newAllSelectedItemIds = [...allSelectedItemIds, ...intSelectedItemIds];
        const newDatabaseItemIds = [...databaseItemIds, ...intSelectedItemIds];
      
        setAllSelectedItemIds(newAllSelectedItemIds);
        setDatabaseItemIds(newDatabaseItemIds);
      
        // Update the form data with new group item IDs, eto yung asa tables
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
      console.log("allSelectedItemIds", allSelectedItemIds);
      console.log("databaseItemIds", databaseItemIds);
      console.log("data", data);

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
                      <div className=" mt-4">
                          <InputLabel htmlFor="group_item_id" value=" Group of Items"/>
                          <div className=" grid grid-cols-12 gap-5">
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
                              <div className="col-span-2 xs:col-span-4">
                                  <button
                                    className="flex flex-nowrap gap-2 font-semibold  bg-green-500 py-2 px-8 text-white rounded shadow transition-all hover:bg-green-700"
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
                          <div className="mt-2 mx-2">
                            {notification && (
                              <div className="text-red-600 font-semibold mt-2">
                                {notification}
                              </div>
                            )}
                          </div>
                      </div>
{/* {receivings && receivings.length !== 0 && ( */}
                      <div className="mt-20">
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
                            <button 
                              type="submit" 
                              disabled={processing} 
                              className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600"
                            >
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