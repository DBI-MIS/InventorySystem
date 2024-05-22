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
        description: '',
        sku_prefix: ''
    })

    const onSubmit = (e) =>{
        // post function declared above
        e.preventDefault();
        post(route("location.store"));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Create New Location</h2>
          </div>
        }
        >
             <Head title="Categories" />
      <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit} 
                    className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                        <div className="mt-4">
                            <InputLabel htmlFor="location_name" value="Location Name"/>
                            <TextInput 
                            id="location_name"
                            type="text"
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
                            value={data.company}
                            className="mt-1 block w-full"
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
                            value={data.address}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData("sku_prefix", e.target.value)}
                            />
                            <InputError message={errors.address} className="mt-2"/>
                        </div>
                        <div className="mt-4 text-right">
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