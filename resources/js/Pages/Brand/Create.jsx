import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
export default function Create({auth}){
    // data will hold/contain the ff:
   const {data, setData, post,errors,reset} = useForm({
        name: '',
        description: '',
        user_id: ''
    })

    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("brand.store"));
        
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Brand</h2>
          </div>
        }
        >
        <Head title="Items" />
        <div className="py-6">
          
          <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}  data-page="{{ json_encode($page) }}"
                        className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                       
                        <div className=" ">
                             <input type="text"
                                 id="item_user_id"
                                 name="user_id"
                                 defaultValuee={data.user_id}
                                 hidden="true"
                                />
                               
                                <div className="mt-4">
                                    <InputLabel htmlFor="brand_name" value="Brand Name"/>
                                    <TextInput
                                    id="brand_name"
                                    placeholder="Enter Brand Name"
                                    type="text"
                                    name="name"
                                    minLength={3}
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={e => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="brand_description" value="Brand Decription"/>
                                    <TextAreaInput
                                    id="brand_description"
                                    name="description"
                                    placeholder="Enter Brand Description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    rows="5"
                                    isFocused={true}
                                    onChange={e => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2"/>
                                </div>
                        </div>
                        <div className="mt-10 text-right">
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