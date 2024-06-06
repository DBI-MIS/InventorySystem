import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({auth, brand }){
   const {data, setData, post ,errors,reset} = useForm({
        name: brand.name || "",
        description: brand.description || "",
        _method: "PUT", 
    });

    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("brand.update",brand.id));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Edit brand {brand.name}</h2>
          </div>
        }
        >
    <Head title="Brands" />
      <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <form onSubmit={onSubmit} 
                    className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                        <div className="mt-4">
                            <InputLabel htmlFor="brand_name" value="Brand Name"/>
                            <TextInput 
                            id="brand_name"
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
                            <InputLabel htmlFor="brand_description" value="Brand Description"/>
                            <TextAreaInput
                            id="brand_description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2"/>
                        </div>
                        <div className="mt-4 text-right">
                            <Link href={route('brand.index')}
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