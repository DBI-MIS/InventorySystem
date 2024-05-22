import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
// import { Fragment} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";


export default function Create({auth,success,items,mrrData}){
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
   
   // setData('item_id', result)
// console.log("hello" + result);

    // const [uniqueReferenceNumbers, setUniqueReferenceNumbers] = useState(new Set());

    // // Extract unique reference numbers
    // receivings.data.forEach(receiving => {
    //   uniqueReferenceNumbers.add(receiving.reference_no);
    // });
   const {data, setData, post,errors,reset} = useForm({
   
        client_id: '',
        mrr_no: '',
        group_item_id: '',
        reference_no: '123',
        receiving_item_id: '11',
        si_no:'',
        dr_no:'',
        address:'',
        remarks:'',
        
    }) 
    const [selectedMrrNo, setSelectedMrrNo] = useState('');

    const handleMrrNoChange = (e) => {
        setSelectedMrrNo(e.target.value);
    };
    // console.log(selectedMrrNo)
    const onSubmit = (e) =>{
        // post function declared above
        e.preventDefault();
        post(route("receiving.store"));
    //     if (lengthmo > 3 ) { //check if the selected values/ select inputs is more than 3 then
    //         post(route("receiving.store"));
    //           console.log("Submit Success");
    //       } else {
    //           console.log("At least four Items are required.");
              
    //       }
        
     

 }
    console.log(data);


    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between receivings-center"  >
            <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Create New Receiving</h2>
          </div>
        }
        >
             <Head title="Receivings" />
      <div className="py-12">
      {success && (
                <div className="bg-green-500 mb-4 py-2 px-4 text-white rounded">
                {success}
              </div>
          )}
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
                            <SelectInput
                                value={data.mrr_no}
                                onChange={e => setData('mrr_no',e.target.value)}
                                id="receiving_mrr_no"
                                name="mrr_no"
                                className="mt-1 block w-full"
                            >
                                <option value="">Select Mrr No</option>
                                {mrrData.map((data, index) => (
                                    <option key={index} value={data.mrr_no}>
                                        {data.mrr_no}
                                    </option>
                                ))}
                            </SelectInput>
                                    <InputError message={errors.mrr_no} className="mt-2"/>
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