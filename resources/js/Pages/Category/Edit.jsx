import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({auth, category }){
   const {data, setData, post ,errors,reset} = useForm({
        name: category.name || "",
        description: category.description || "",
        sku_prefix: category.sku_prefix || "",
        _method: "PUT", 
    });
    const onInputChange = e => {
        const { value } = e.target;
        console.log('Input value: ', value);
     
        const lettersOnly = /^[A-Za-z]+$/;
        if (value === "" || lettersOnly.test(value)) {
          setData('sku_prefix' ,value.toUpperCase());
        }
      }
    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("category.update",category.id));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Edit category {category.name}</h2>
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
                            <InputLabel htmlFor="category_name" value="Category Name"/>
                            <TextInput 
                            id="category_name"
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
                            <InputLabel htmlFor="category_description" value="Category Decription"/>
                            <TextAreaInput
                            id="category_description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="category_sku_prefix" value="Sku Prefix"/>
                            <TextInput 
                            id="category_sku_prefix"
                            type="text"
                            name="sku_prefix"
                            value={data.sku_prefix}
                            className="mt-1 block w-full"
                            isFocused={true}
                            maxLength={3}
                            onChange={onInputChange}
                            // onChange={e => setData("sku_prefix", e.target.value)}

                            />
                            <InputError message={errors.sku_prefix} className="mt-2"/>
                        </div>
                        <div className="mt-4 text-right">
                            <Link href={route('category.index')}
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