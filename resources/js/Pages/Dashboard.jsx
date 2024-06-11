import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { Alert} from "@material-tailwind/react";
import { Head, Link, router, } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia-react';
import SelectInput from "@/Components/SelectInput";
import { ITEM_STATUS_TEXT_MAP, ITEM_STATUS_CLASS_MAP } from "@/constants";

export default function Dashboard({
    auth, 
    totalName, 
    formattedTotalQuantity,
    totalCategory,
    totalClient,
    totalDeliverable,
    totalReceiving,
    totalDeliverableDelivered,
    items,
    queryParams = null,
}) {

    // const [open, setOpen] = useState(true);

    queryParams = queryParams || {};
const searchFieldChanged = (name, value) => {
  if(value){
    queryParams[name] = value;
  }
  else{
    delete queryParams[name];
  }
  // change the url path everytime option changes
 router.get(route('dashboard'), queryParams)
};

const onKeyPress = (name, e) => {

    const lowerCaseName = name.toLowerCase();

    if(e.key !== 'Enter') return;

    searchFieldChanged(lowerCaseName, e.target.value);
  }

  const showAll = ()=>{

    if(value == 'all'){

    }
  }

  const sortChanged = (name) => {
    if(name === queryParams.sort_field) {
      if(queryParams.sort_direction === 'desc'){
        queryParams.sort_direction ='asc'
      }else{
        queryParams.sort_direction = 'desc'

      }
    }
    // sorting the different fields
    else{
        queryParams.sort_field = name;
        queryParams.sort_direction = "desc";
    }
    router.get(route('item.index'), queryParams)
  }

  const handlePageChange = (url) => {
    Inertia.visit(url, { preserveScroll: true, preserveState: true });
};

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-4xl text-blue-600 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="px-12 w-full mx-auto grid grid-cols-6 gap-2 text-center">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className='text-slate-700 font-light text-md'>
                               No. of Items
                            </h3>
                            <p className='mr-2 text-6xl'>{ totalName ?? "No Data"}</p>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                Total Item Quantity
                            </h3>
                            <span className='mr-2 text-6xl'>{ formattedTotalQuantity ?? "No Data" }</span>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                No. of Categories
                            </h3>
                            <span className='mr-2 text-6xl'>{ totalCategory ?? "No Data" }</span>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                No. of Clients
                            </h3>
                            <span className='mr-2 text-6xl'>{ totalClient ?? "No Data" }</span>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                No. of DR
                            </h3>
                            <span className='mr-2 text-6xl'>{ totalDeliverableDelivered ?? "0" }</span>
                            <span className='mr-2 text-6xl'>/{ totalDeliverable ?? "No Data" }</span>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                No. of MRR
                            </h3>
                            <span className='mr-2 text-6xl'>{ totalReceiving ?? "No Data" }</span>
                            
                        </div>
                    </div>

                </div>
            </div>
        {/* head displayed together with the appname */}
       
      <div className="py-5 flex flex-row">
        
          <div className="w-1/2 mx-auto sm:px-6 lg:px-8 relative">
        
          
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                 
                      <div className="overflow-auto">
                      
                        <div className="w-full flex flex-row justify-between items-center mb-2">
                          <div>
                          <span>Stocks</span>
                        </div>
                          <div className="flex flex-row items-center relative gap-2">
                            <div>
                              <th className="flex flex-row cursor-pointer items-center relative">
                              </th>
                           </div>
                          <div className="absolute pointer-events-none right-2"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                          </div>

                          <TextInput  className="w-[600px]" 
                                  defaultValue={queryParams.name}
                                  placeholder="Search Here" 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                  
                                
                          </div>

                            
                          
                          </div>
                    
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="">
                                <TableHeading  className=""   name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Item</TableHeading>
                                <TableHeading className=""  name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Total Qty</TableHeading>
                                <TableHeading className=""  name="statuseses"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Status</TableHeading>
                                <TableHeading  className=""  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
                              sortChanged={sortChanged}>Qty</TableHeading>
                              </tr>
                            </thead>
                        
                            {/* <tbody>
                              {items.data.map((item)=>(
                                   <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                      <td className="w-[50px] py-2">
                                          {item.id}
                                      </td>
                                      <td className="w-[200px] py-2 text-nowrap">
                                        {item.sku_prefix}-{item.sku}
                                      </td>
                                      <th className="w-[800px] py-2 text-gray-600  hover:underline">
                                        <Link href={route('item.show', item.id)}>
                                        {item.name}
                                        </Link>
                                      </th>
                                      <td className="w-[300px] py-2">{item.brand ? item.brand.name : 'N/A'}</td>
                                      <td className="w-[300px] py-2">{item.category ? item.category.name : 'N/A'}</td>
                                      <td className="w-[300px] py-2">
                                        <span className={`px-2 py-1 font-semibold tracking-wide rounded ${ITEM_STATUS_CLASS_MAP[item.statuses] || 'bg-gray-300'} ${item.statuses ? 'text-white' : 'text-black'}`}>
                                            {ITEM_STATUS_TEXT_MAP[item.statuses] || 'No Status'}
                                        </span>
                                      </td>
                                      <td className="w-[100px] py-2 text-nowrap">{item.quantity} {item.uom} </td>
                                      <td className="w-[100px] py-2 text-nowrap">
                                          <div className="flex flex-row justify-end items-center">
                                              <Link href={route('item.edit', item.id)} 
                                              className="text-blue-600 mx-1 hover:text-gray-600"> 
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                  </svg>
                                              </Link>
                                              <button 
                                                  onClick={(e) =>deleteItem(item)}
                                                  className="text-red-600 mx-1 hover:text-gray-600"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                </svg>
                                              </button>
                                          </div>
                                    </td>
                                  </tr>
                              ))}
                            </tbody> */}
                            <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.total_qty}</td>
                        </tr>
                    ))}
                </tbody>
                        </table>
                      </div> 
                 </div>
                 {/* pagination not visible */}
                 {/* <Pagination links={items.meta.links} /> */}
                 {/* <Pagination links={items.links.map} /> */}
                 {/* <div>
                {items.links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url}
                        onClick={() => handlePageChange(link.url)}
                        className={link.active ? 'active' : ''}
                    >
                        {link.label.replace('&laquo;', '<<').replace('&raquo;', '>>')}
                    </button>
                ))}
            </div> */}
              </div>
          </div>
          <div className="w-1/2 mx-auto sm:px-6 lg:px-8 relative">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg h-[500px]">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            </div>
            </div>
          </div>
      </div>

        </AuthenticatedLayout>
    );
}
