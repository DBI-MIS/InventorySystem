import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/inertia-react'
import { Head, Link } from '@inertiajs/react';
import React from 'react'

export default function Edit({auth, sritem}) {

  const {data, setData, post, errors, reset} = useForm ({
    sr_item:        sritem.sr_item        || "",
    sr_qty:         sritem.sr_qty         || "",
    sr_unit:         sritem.sr_unit         || "",
    sr_description: sritem.sr_description || "",
    _method: "PUT"
  })

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("sritem.update", sritem.id));
};

  return (
    <Authenticated
    user={auth.user}
    header={
      <div className="flex justify-between items-center" >
        <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Edit Sr Item. {sritem.item}</h2>
      </div>
    }
    >
      <Head title='Sr Item' />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
           <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                 <form onSubmit={onSubmit} className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                 <div className="grid grid-cols-2 gap-2"> 

{/* <input type="text" id="sritem_user_id" name="user_id" defaultValue={data.user_id} hidden="true"/> */}

{/* <div className="col-span-1 grid grid-cols-2 gap-2 content-start"> */}
<div>
       <div className="mt-4">
              <InputLabel htmlFor="sritem_sr_item" value="Item: " />
              <TextInput 
               id="sritem_sr_item"
               type="text"
               name="sr_item"
               placeholder="Item"
               value={data.sr_item}
               className="mt-1 block w-full"
               isFocused={true}
               onChange={e => setData('sr_item', e.target.value)}
              />
              <InputError message={errors.sr_item} className="mt-2"/>
       </div>
       <div className="mt-4">
              <InputLabel htmlFor="sritem_sr_qty" value="Quantity: " />
              <TextInput 
               id="sritem_sr_qty"
               type="number"
               name="sr_qty"
               placeholder="Qty"
               value={data.sr_qty}
               className="mt-1 block w-full"
               isFocused={true}
               onChange={e => setData('sr_qty', e.target.value)}
              />
              <InputError message={errors.sr_qty} className="mt-2"/>
       </div>
 </div>
 <div>
       <div className="mt-4">
              <InputLabel htmlFor="sritem_sr_unit" value="Uom: " />
              <TextInput 
               id="sritem_sr_unit"
               type="text"
               name="sr_unit"
               placeholder="Uom"
               value={data.sr_unit}
               className="mt-1 block w-full"
               isFocused={true}
               onChange={e => setData('sr_unit', e.target.value)}
              />
              <InputError message={errors.sr_unit} className="mt-2"/>
       </div>
       <div className="mt-4">
              <InputLabel htmlFor="sritem_sr_description" value="Description: " />
              <TextInput 
               id="sritem_sr_description"
               type="text"
               name="sr_description"
               placeholder="Description"
               value={data.sr_description}
               className="mt-1 block w-full"
               isFocused={true}
               onChange={e => setData('sr_description', e.target.value)}
              />
              <InputError message={errors.sr_description} className="mt-2"/>
       </div>
 </div>
{/* </div> */}
<div>
 
</div>

</div>    
<div className="mt-10 text-right">
<Link href={route('sritem.index')}
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

    </Authenticated>
  )
}
