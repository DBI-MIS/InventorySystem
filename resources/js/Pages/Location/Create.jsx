import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Description } from "@headlessui/react/dist/components/description/description";
import { Head, Link, useForm } from "@inertiajs/react";
export default function Create({auth}){
    // data will hold/contain the ff:
   const {data, setData, post,errors,reset} = useForm({
        name: '',
        company: '',
        address: ''
    })

    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("location.store"));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Location</h2>
          </div>
        }
        >
        <Head title="Loctions" />
        <div className="py-12">
            <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}  data-page="{{ json_encode($page) }}"
                        className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                        <div className="mt-4">
                            <InputLabel htmlFor="location_name" value="Location Name"/>
                            <TextInput 
                            id="location_name"
                            type="text"
                            placeholder="Enter Location Name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="location_company" value="Location Company"/>
                            <TextAreaInput
                            id="location_company"
                            name="company"
                            placeholder="Enter Company Name"
                            value={data.company}
                            className="mt-1 block w-full"
                            rows="5"
                            isFocused={true}
                            onChange={e => setData('company', e.target.value)}
                            />
                            <InputError message={errors.company} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="location_address" value="Location Address"/>
                            <TextInput 
                            id="location_address"
                            type="text"
                            name="address"
                            placeholder="Enter Complete Address"
                            value={data.address}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData("address", e.target.value)}
                            />
                            <InputError message={errors.address} className="mt-2"/>
                        </div>
                        
                        <div className="mt-10 text-right">
                            <Link href={route('location.index')}
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