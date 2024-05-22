import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
export default function Create({auth, receiving,mrrItems,mrr_item_ids}){

    const [receivings, setReceivings] = useState([]);
    const [ newArrays, setNewArrays] = useState()
    // Handler function to update array when select values change
    const handleSelectChange = (index, selectedOptions,e) => {
       const newArray = [...receivings]; // Create a copy of the array
       newArray[index] = selectedOptions; // Update the value at the specified index
        setReceivings(newArray); // Update state with the new array
    
        setNewArrays(newArray);
      setData('item_id', newArray.map(innerArray => parseInt(innerArray[0]))); 
    
           console.log("newarray" + newArray); // 2, 4, 6
           console.log("newarray index" + newArray[index]); //6
           console.log("receivings" + receivings); //2, 4
           console.log("number of array values " + newArrays)
           console.log(selectedOptions)
    };
    
   
       // Handler function to add a new select field
       const handleAddSelect = (e) => {
           setReceivings([...receivings, []]); // Add a new empty array to the array
           console.log("receivingsa" + receivings);
           //    setData('item_id',receivings)
          
           // convert array to string for error of  "array to string conversion"
    
           $stringItems= implode(', ', receivings); // Convert array to comma-separated string
           setData('item_id',$stringItems )
           console.log("stringItems" + $stringItems)
           // setData('item_id', JSON.stringify([...receivings, []]));
           
           //    setData('item_id',(Object.values(data)));
           // console.log("hmm" + data);
    };
    
    // Handler function to remove a select field
    const handleRemoveSelect = (index) => {
      const newArray = [...receivings]; // Create a copy of the array
      newArray.splice(index, 1); // Remove the value at the specified index
      setReceivings(newArray); // Update state with the new array
    // setData('item_id', JSON.stringify(newArray)); 
    };
    
    console.log(receivings)
       const lengthmo = receivings.length
       console.log("number of select elements " + lengthmo)

    // data will hold/contain the ff:
   const {data, setData, post ,errors,} = useForm({

    client_id: receiving.client_id || "",
    mrr_no: receiving.mrr_no || "",
    item_id: "",
    reference_no: receiving.reference_no || "",
    receiving_item_id: receiving.receiving_item_id || "",
    si_no: receiving.si_no || "",
    dr_no: receiving.dr_no || "",
    address: receiving. address || "",
    remarks: receiving. remarks || "",
        _method: "PUT", 
    });
    console.log(data)
    console.log(mrr_item_ids);
    const onSubmit = (e) =>{
        // post function declared above
        e.preventDefault();
         if (lengthmo > 3 ) { //check if the selected values/ select inputs is more than 3 then
            post(route("receiving.update",receiving.id));
             console.log("Submit Success");
         } else {
             console.log("At least four Items are required.");
             
         }
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
                                <div className=" flex h-[11]">
                                <TextInput 
                                                    id="mrr_no"
                                                    type="text"
                                                    name="sku"
                                                    readOnly
                                                    value={data.mrr_no}
                                                    className="mt-1  border-l-2 border-l-white focus:border-white focus:border-b-2 focus:!border-b-gray-400 focus:!ring-white "
                                                    onChange={e => setData('mrr_no', e.target.value)}
                                                    />
                                </div>
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
                            {/* <button>Add Item</button>
                                <input type="text"></input>                                 */}
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
                            <button
                                className="flex  m-5  float-end flex-nowrap gap-2 font-semibold bg-green-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-green-700"
                                    onClick={handleAddSelect} >
                                    Add Items
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                           </button>
                            <div className="mt-20">
                                {receivings.map((selectedOptions, index) => (
                                    <div key={index}>
                                        <div className=" mt-2  col-span-2 ">
                                             <InputLabel htmlFor="item" value="Item"/>
                                             <div className=" flex h-[11]">
                                             <SelectInput
                                                value={selectedOptions}
                                                onChange={(e) =>
                                                handleSelectChange(
                                                index,
                                                Array.from(e.target.selectedOptions, (option) => option.value)
                                                )}
                                                id="item_id"
                                                name="item_id[]"
                                                className="mt-1 block w-full"
                                                >
                                                <option value="">Select item </option>
                                                 {mrr_item_ids.map((item)=>(
                                                     <option value={item.id} key={item.id}>{item.name}</option>
                                                 ))}
                                            </SelectInput>
                                        <button onClick={() => handleRemoveSelect(index)}>Remove</button>
                                            </div>
                                                {/* <InputError message={errors.item_id} className="mt-2"/> */}
                                        </div> 
                                    </div>
                                    
                                ))}
                               
                         <div>
                            <h2>Selected Item Details:</h2>
                            <ul>
                            {receivings.map((selectedOptions, index) => (
                                                            <li key={index}>
                                                            {selectedOptions.map(selectedItemId => {
                                    const selectedItem = mrr_item_ids.find(item => item.id === selectedItemId);
                                    if (selectedItem) {
                                    return (
                                        <div key={selectedItem.id}>
                                        <p>Name: {selectedItem.name}</p>
                                        <p>SKU: {selectedItem.sku}</p>
                                        <p>Category ID: {selectedItem.category_id}</p>
                                        <p>Brand ID: {selectedItem.brand_id}</p>
                                        <p>Quantity: {selectedItem.quantity}</p>
                                        <p>Remarks: {selectedItem.remarks}</p>
                                        </div>
                                    );
                                    } else {
                                    return <p key={selectedItemId}>Item Not Found</p>;
                                    }
                                })}
                                </li>
                            ))}
                            </ul>
                        </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                       <div className="p-6 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                              <TableHeading  className="pr-10"  name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>ID</TableHeading>
                              <TableHeading  className="pr-10"  name="sku"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Sku </TableHeading>
                                <TableHeading  className="pr-10"   name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Name</TableHeading>
                                 <TableHeading  className="pr-10"   name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>MRR No.</TableHeading>
                                <TableHeading  className="pr-2"   name="brand_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Brand</TableHeading>
                                <TableHeading className="pr-10"  name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Category</TableHeading>
                                <TableHeading  className="pr-10"  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Qty</TableHeading>
                                <TableHeading className="px-3 py-3 text-right">Actions</TableHeading>
                              </tr>
                            </thead>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="text-nowrap ">
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3 text-right"></th>
                              
                              </tr>
                            </thead>
                            <tbody>
                              {items.data.map((item)=>(
                                   <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                      <td className="px-3 py-2">
                                          {item.id}
                                      </td>
                                      <td className="px-3 py-2">
                                        {item.sku_prefix}-{item.sku}
                                      </td>
                                      <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                        <Link href={route('item.show', item.id)}>
                                        {item.name}
                                        </Link>
                                      </th>
                                      <td className="px-3 py-2">{item.mrr_no}</td>
                                      <td className="px-3 py-2">{item.brand.name}</td>
                                      <td className="px-3 py-2">{item.category.name}</td>
                                      <td className="px-3 py-2">{item.quantity} {item.uom} </td>
                                      <td className="px-3 py-2 text-nowrap">
                                          <div className="flex">
                                              <Link href={route('item.edit', item.id)} className="p-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white hover: rounded-full hover:underline mx-1"> 
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                  </svg>
                                              </Link>
                                              <button 
                                                  onClick={(e) =>deleteItem(item)}
                                                  className="font-medium text-red-600 p-2 hover:bg-red-600 hover:text-white hover: rounded-full  hover:underline mx-1"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                </svg>
                                              </button>
                                          </div>
                                    </td>
                                  </tr>
                              ))}
                            </tbody>
                        </table>
                      </div> 
                 </div>
                 {/* pagination not visible */}
                 <Pagination links={items.meta.links} />
                             </div>
                            {/* <button
                                className="flex  m-5  float-end flex-nowrap gap-2 font-semibold bg-green-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-green-700"
                                    onClick={handleAddSelect} >
                                    Add Items
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                           </button> */}
                           {/* {multiple adding of item } */}
                            {/* mutiple itemns */}
                           
                              <div className="mt-20 text-right">
                                <Link href={route('receiving.index')}
                                className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                                >
                                Cancel
                                </Link>
                                <button className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                                    Submit
                                </button>
                                </div>
                                </div>
                                {/* ITEMS SECTION */}
                             
                           </div>
                    </form>
                </div>
          </div>
      </div>
     </AuthenticatedLayout>
    )
}