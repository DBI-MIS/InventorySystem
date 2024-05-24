import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
export default function Create({auth,success, mrr_no}){
   const {data, setData, post,errors} = useForm({
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
    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("receiving.store"));
 }
    //for checking values on the data
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
                                            <TextInput 
                                                id="receiving_mrr_no"
                                                type="text"
                                                name="mrr_no"
                                                readOnly
                                                placeholder={mrr_no}
                                                value={data.mrr_no=mrr_no} 
                                                className=" block w-full"
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
                           </div>
                    </form>
              </div>
          </div>
        </div>
        </AuthenticatedLayout>
    )
}