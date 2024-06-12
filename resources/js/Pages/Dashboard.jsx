import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { Alert } from "@material-tailwind/react";
import { Head, Link, router, } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia-react';
import SelectInput from "@/Components/SelectInput";
import { ITEM_STATUS_TEXT_MAP, ITEM_STATUS_CLASS_MAP } from "@/constants";
import { useState } from 'react';

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
  latestItems,
}) {

  queryParams = queryParams || {};
  const [searchValue, setSearchValue] = useState(queryParams.name || '');

  const searchFieldChanged = (name, value) => {
    const newQueryParams = { ...queryParams };
    if (value) {
      newQueryParams.name = value;
    } else {
      delete newQueryParams.name;
    }
    Inertia.get(route('dashboard.index'), newQueryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key === 'Enter') {
      const lowerCaseName = name.toLowerCase();
      searchFieldChanged(lowerCaseName, e.target.value);
    }
  };

  const sortChanged = (name) => {
    const newQueryParams = { ...queryParams };
    if (name === queryParams.sort_field) {
      newQueryParams.sort_direction = queryParams.sort_direction === 'desc' ? 'asc' : 'desc';
    } else {
      newQueryParams.sort_field = name;
      newQueryParams.sort_direction = 'desc';
    }
    Inertia.get(route('dashboard.index'), newQueryParams);
  };

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
              <p className='mr-2 text-6xl'>{totalName ?? "No Data"}</p>

            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className='text-slate-700 font-light text-md'>
                Total Item Quantity
              </h3>
              <span className='mr-2 text-6xl'>{formattedTotalQuantity ?? "No Data"}</span>

            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className='text-slate-700 font-light text-md'>
                No. of Categories
              </h3>
              <span className='mr-2 text-6xl'>{totalCategory ?? "No Data"}</span>

            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className='text-slate-700 font-light text-md'>
                No. of Clients
              </h3>
              <span className='mr-2 text-6xl'>{totalClient ?? "No Data"}</span>

            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className='text-slate-700 font-light text-md'>
                No. of DR
              </h3>
              <span className='mr-2 text-6xl'>{totalDeliverableDelivered ?? "0"}</span>
              <span className='mr-2 text-6xl'>/{totalDeliverable ?? "No Data"}</span>

            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className='text-slate-700 font-light text-md'>
                No. of MRR
              </h3>
              <span className='mr-2 text-6xl'>{totalReceiving ?? "No Data"}</span>

            </div>
          </div>

        </div>
      </div>
      {/* Latest Items */}

      <div className="py-5 flex flex-row">

        <div className="w-1/2 mx-auto sm:px-6 lg:px-8 relative">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg h-auto">
            <div className="p-6 text-gray-900 dark:text-gray-100">
            <div>
                    <span>Recent Stocks</span>
                  </div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                
                <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="">
                  <TableHeading className="" name="date" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}>Date</TableHeading>
                    <TableHeading className="" name="name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}>Item</TableHeading>
                    <TableHeading className="" name="category_id" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}>Qty</TableHeading>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through latest items */}
                  {latestItems.map(item => (
                    <tr key={item.id}>
                       <td>{new Date(item.created_at).toLocaleDateString()}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>

                    </tr>
                  ))}

                </tbody>
              </table>


            </div>
          </div>
        </div>

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
                    <div className="absolute pointer-events-none right-2"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
                    </div>

                    <TextInput
                      className="w-[300px]"
                      defaultValue={queryParams.name}
                      placeholder="Search Here"
                      onBlur={(e) => searchFieldChanged('item.name', e.target.value)}
                      onKeyPress={(e) => onKeyPress('item.name', e)}
                    />


                  </div>



                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                  <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="">
                      <TableHeading className="" name="name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}>Item</TableHeading>
                      <TableHeading className="" name="category_id" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}>Total Qty</TableHeading>
                      <TableHeading className="" name="statuseses" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}>Status</TableHeading>

                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.total_qty}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>

    </AuthenticatedLayout>
  );
}
