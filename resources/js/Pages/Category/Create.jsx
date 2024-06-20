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
        sku_prefix: ''
    })
 
    const onInputChange = e => {
      const { value } = e.target;
      console.log('Input value: ', value);
   
      const lettersOnly = /^[A-Za-z]+$/;
      if (value === "" || lettersOnly.test(value)) {
        setData('sku_prefix' ,value.toUpperCase());
      }
    };
    const onSubmit = (e) =>{
        // post function declared above
        e.preventDefault();
        post(route("category.store"));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Category</h2>
          </div>
        }
        >
             <Head title="Categories" />
             <div className="py-6">
    
          <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}  data-page="{{ json_encode($page) }}"
                        className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">

                         <div className=" grid grid-cols-5 gap-2 content-start">
                            
                            <div className="col-span-3 mt-4">
                                <InputLabel htmlFor="category_name" value="Category Name"/>
                                <TextInput 
                                    id="category_name"
                                    type="text"
                                    placeholder=" Enter Category Name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    minLength={3}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            
                            <div className="mt-4 col-span-2">
                                <InputLabel htmlFor="category_sku_prefix" value="Sku Prefix"/>
                                <TextInput 
                                    id="category_sku_prefix"
                                    type="text"
                                    name="sku_prefix"
                                    placeholder="Enter Sku Prefix"
                                    value={data.sku_prefix}
                                    className="mt-1 block w-full"
                                    maxLength={3}
                                    minLength={3}
                                    isFocused={true}
                                    onChange={onInputChange}
                                    // onChange={e => setData("sku_prefix", e.target.value)}
                                />
                                <span className="font-light text-xs md:text-sm text-gray-700"><b>Note: SKU PREFIX should be 3 letters only.</b></span>
                                <InputError message={errors.sku_prefix} className="mt-2"/>
                          
                             </div>
                            
                        </div> 
                            <div className="mt-4">
                            <InputLabel htmlFor="category_description" value="Category Decription"/>
                            <TextAreaInput
                                id="category_description"
                                name="description"
                                placeholder="Enter Category Description"
                                value={data.description}
                                className="mt-1 block w-full"
                                rows="5"
                                isFocused={true}
                                onChange={e => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2"/>
                        </div>
                        <div className="mt-10 text-right">
                            <Link href={route('category.index')}
                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                            >
                            Cancel
                            </Link>
                            <button className="bg-green-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
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