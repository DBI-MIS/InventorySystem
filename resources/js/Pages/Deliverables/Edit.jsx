import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm  } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Select from "react-select";

export default function Edit({ auth, existingItemss, existingItemsIds, deliverable, itemss}){

    const {data, setData, post, errors, processing} = useForm({
        project: deliverable.project || "",
        address: deliverable.address || "",
        dr_no:     deliverable.dr_no || "",
        rs_no:     deliverable.rs_no || "",
        dr_date: deliverable.dr_date || "",
        dr_qty:   deliverable.dr_qty || "",
        list_item_id:   existingItemsIds || "",
        _method: "PUT",
    });

    const [databaseItemIds, setDatabaseItemIds] = useState(Array.isArray(existingItemsIds) ? existingItemsIds : []);
    const existingItemsss = itemss.data.map(item => ({ ...item, id: parseInt(item.id) }));
    const [notification, setNotification] = useState('');
    const [allSelectedItemIds, setAllSelectedItemIds] = useState([]);
    const [deliverables, setDeliverables] = useState([]);

    const options = itemss.data.map(item => ({
        value: item.id,
        label: item.name
    }));

    const selectedValueItems = databaseItemIds.map(databaseItemId=> ({
        value: databaseItemId.id,
        label: databaseItemId.id,
    }));

    const [selectedOptions, setSelectedOptions] = useState(allSelectedItemIds);
    const [selectedItemIds, setSelectedItemIds] = useState(selectedValueItems.map(option => option.value));

    useEffect(() => {
        setSelectedItemIds(selectedOptions.map(option => option.value));
    }, [selectedOptions]);

    const handleSelectChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
        const selectedOptionsss = Array.from(selectedOption, (option) => option.value);
        setSelectedItemIds(selectedOptionsss);
        setSelectedOptions(selectedOption);
    };
    console.log("selected Item ids" + selectedItemIds)

    const handleAddSelect = (e) => {
        e.preventDefault();

        const newSelectedItemIds = selectedItemIds.filter(id => !databaseItemIds.includes(parseInt(id, 10)));
        if (newSelectedItemIds.length === 0) {
            setNotification('Items are on the tables already!');
            setSelectedOptions([]);
            return;
        }

        console.log("check value :" + newSelectedItemIds );
        const selectedItems = existingItemss.filter(item => newSelectedItemIds.includes(item.id.toString()));
        
        setDeliverables(prevDeliverables => [...prevDeliverables, ...selectedItems]);

        const intSelectedItemIds = newSelectedItemIds.map(id => parseInt(id, 10));

        const newAllSelectedItemIds = [...allSelectedItemIds, ...intSelectedItemIds];
        const newDatabaseItemIds = [...databaseItemIds, ...intSelectedItemIds];

        setAllSelectedItemIds(newAllSelectedItemIds);
        setDatabaseItemIds(newDatabaseItemIds);
        setData('list_item_id', newDatabaseItemIds);

        setSelectedItemIds([]);
        setSelectedOptions([]);
        setNotification('');
    };

    useEffect(() => {
        setData('list_item_id', databaseItemIds);
    }, [databaseItemIds]);

    console.log("selected Item ids", selectedItemIds);
      console.log("deliverables", deliverables);
      console.log("existing Items", existingItemsss);
      console.log("selectedOptions", selectedOptions);
      console.log("allSelectedItemIds", allSelectedItemIds);
      console.log("databaseItemIds", databaseItemIds);

      const handleRemoveExistingItem = (selectedItemId, index) => {
        const remainIds = [...databaseItemIds];
        remainIds.splice(index, 1);
        setDatabaseItemIds(remainIds);
        setAllSelectedItemIds(remainIds);
      };
      useEffect(() => {
        console.log('Current data:', data);
      }, [data]);

      const onSubmit = (e) =>{
        e.preventDefault();
        post(route("deliverables.update",deliverable.id));
      }


    return (
      <Authenticated
      user={auth.user}
      header={
        <div className="flex justify-between items-center"  >
          <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Edit Delivery Receipt {deliverable.id}</h2>
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
                                      <InputLabel htmlFor="list_item_id" value="Group of Items"/>
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
                              <div className="mt-2 mx-2">
                            {notification && (
                              <div className="text-red-600 font-semibold mt-2">
                                {notification}
                              </div>
                            )}
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
                                              {databaseItemIds && databaseItemIds.length >= 0 && ( 
                                                  <tbody>

                                                      {databaseItemIds.map((selectedItemId,index) => {
                                                      const selectedItem = existingItemsss.find(item => item.id === selectedItemId);
                                                      if (selectedItem) {
                                                        return (
                                                          <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={selectedItem.id}>
                                                          <td className="px-3 py-2">{selectedItem.id}</td>
                                                          <td className="px-3 py-2">{selectedItem.quantity}</td>
                                                          <td className="px-3 py-2">{selectedItem.uom}</td>
                                                          <td className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                                                <Link href={route('deliverables.show', selectedItem.id)}>
                                                                {selectedItem.name}
                                                                </Link> 
                                                          </td>
                                                          <td className="px-3 py-2">{selectedItem.description}</td>
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