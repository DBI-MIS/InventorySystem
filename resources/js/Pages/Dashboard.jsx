import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { Alert } from "@material-tailwind/react";
import { Head, Link, router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia-react";
import SelectInput from "@/Components/SelectInput";
import { ITEM_STATUS_TEXT_MAP, ITEM_STATUS_CLASS_MAP } from "@/constants";
import { useState } from "react";

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
    currentDateTime,
    userName,
}) {
    queryParams = queryParams || {};
    // const [searchValue, setSearchValue] = useState(queryParams.name || '');

    // const searchFieldChanged = (name, value) => {
    //   const newQueryParams = { ...queryParams };
    //   if (value) {
    //     newQueryParams.name = value;
    //   } else {
    //     delete newQueryParams.name;
    //   }
    //   Inertia.get(route('dashboard.index'), newQueryParams);
    // };

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        // change the url path everytime option changes
        router.get(route("dashboard"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            const lowerCaseName = name.toLowerCase();
            searchFieldChanged(lowerCaseName, e.target.value);
        }
    };

    const showAll = () => {
        if (value == "all") {
        }
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "desc") {
                queryParams.sort_direction = "asc";
            } else {
                queryParams.sort_direction = "desc";
            }
        }
        // sorting the different fields
        else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "desc";
        }
        router.get(route("dashboard"), queryParams);
    };

    const handlePageChange = (url) => {
        Inertia.visit(url, { preserveScroll: true, preserveState: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-4xl text-blue-600 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="px-7 pt-4 w-full text-base font-bold text-right border-b-2 border-white/50 flex justify-between">
                <span>Welcome! {userName}</span>
                <span>{currentDateTime}</span>
                </div>
            <div className="p-5 w-full">
                    {/* Cards */}
                    <div className="w-full grid grid-cols-4 gap-2 text-center">

                        <div className="col-span-1 flex flex-row bg-white overflow-hidden shadow-sm sm:rounded-lg content-center items-center justify-center gap-2 p-4">
                            <div className="w-12">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Module--Streamline-Sharp"><desc>Module Streamline Icon: https://streamlinehq.com</desc><g id="module--cube-code-module-programming-plugin"><path id="Vector 1377" fill="#2859c5" d="M1 5.5 12 1l11 4.5v13L12 23 1 18.5v-13Z" stroke-width="1"></path><path id="Union" fill="#8fbffa" fill-rule="evenodd" d="M11.25 9.693 1 5.5 12 1l11 4.5 -10.25 4.193v13L12 23l-0.75 -0.307v-13Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>
                            </div>
                            <div className="text-gray-900 text-left">
                                <h3 className="text-slate-700 font-light text-sm">
                                    Total Stocks
                                </h3>
                                <span className="mr-2 text-4xl font-bold">
                                    {formattedTotalQuantity ?? "No Data"}
                                </span>

                            </div>
                        </div>


                        <div className="col-span-1 flex flex-row bg-white overflow-hidden shadow-sm sm:rounded-lg content-center items-center justify-center gap-2 p-4">
                            <div className="w-12">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Gold--Streamline-Sharp"><desc>Gold Streamline Icon: https://streamlinehq.com</desc><g id="gold--gold-money-payment-bars-finance-wealth-bullion-jewelry"><path id="Union" fill="#8fbffa" d="M9.066 12.75H3.434l-2.428 8.5h10.489l-2.43 -8.5Z" stroke-width="1"></path><path id="Union_2" fill="#8fbffa" d="M20.566 12.75h-5.632l-2.428 8.5h10.488l-2.428 -8.5Z" stroke-width="1"></path><path id="Union_3" fill="#8fbffa" d="M14.816 2.75H9.184l-2.428 8.5h10.488l-2.428 -8.5Z" stroke-width="1"></path></g></svg>
                            </div>
                            <div className="text-gray-900 text-left">
                                <h3 className="text-slate-700 font-light text-sm">
                                    Items
                                </h3>
                                <span className="mr-2 text-4xl font-bold">
                                    {totalName ?? "No Data"}
                                </span>

                            </div>
                        </div>

                        <div className="col-span-1 flex flex-row bg-white overflow-hidden shadow-sm sm:rounded-lg content-center items-center justify-center gap-2 p-4">
                            <div className="w-12">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Shipping-Box-1--Streamline-Sharp"><desc>Shipping Box 1 Streamline Icon: https://streamlinehq.com</desc><g id="shipping-box-1--box-package-label-delivery-shipment-shipping"><path id="Union" fill="#8fbffa" fill-rule="evenodd" d="M23.76 0.24H0.24V23.76H23.76V0.24Z" clip-rule="evenodd" stroke-width="1"></path><path id="Intersect" fill="#2859c5" fill-rule="evenodd" d="M8.1712 0.24V10.3591L12 7.6242L15.8288 10.3591V0.24H8.1712Z" clip-rule="evenodd" stroke-width="1"></path><path id="Vector 3 (Stroke)" fill="#2859c5" fill-rule="evenodd" d="M19.1107 20.4781H13.6409V18.8372H19.1107V20.4781Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>
                            </div>
                            <div className="text-gray-900 text-left">
                                <h3 className="text-slate-700 font-light text-sm">
                                    Categories
                                </h3>
                                <span className="mr-2 text-4xl font-bold">
                                    {totalCategory ?? "No Data"}
                                </span>

                            </div>
                        </div>

                        <div className="col-span-1 flex flex-row bg-white overflow-hidden shadow-sm sm:rounded-lg content-center items-center justify-center gap-2 p-4">
                            <div className="w-12">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Office-Worker--Streamline-Sharp"><desc>Office Worker Streamline Icon: https://streamlinehq.com</desc><g id="office-worker--office-worker-human-resources"><path id="Union" fill="#2859c5" fill-rule="evenodd" d="M17.735 12.766a3 3 0 0 0 -3 3v0.263h-2.25v6.987h10.5v-6.987h-2.25v-0.263a3 3 0 0 0 -3 -3Zm1 3.263v-0.263a1 1 0 0 0 -2 0v0.263h2Z" clip-rule="evenodd" stroke-width="1"></path><path id="Ellipse 411" fill="#8fbffa" d="M6.98 8.5a8.47 8.47 0 0 0 -5.5 2.019V17h2.5v6h6v-8.715h2.5v-3.766A8.467 8.467 0 0 0 6.98 8.5Z" stroke-width="1"></path><path id="Ellipse 354" fill="#8fbffa" d="M3.98 4a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" stroke-width="1"></path></g></svg>
                            </div>
                            <div className="text-gray-900 text-left">
                                <h3 className="text-slate-700 font-light text-sm">
                                    Clients
                                </h3>
                                <span className="mr-2 text-4xl font-bold">
                                    {totalClient ?? "No Data"}
                                </span>

                            </div>
                        </div>





                        {/* <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900">
            <h3 className="text-slate-700 font-light text-md">
                DR
            </h3>
            <span className="mr-2 text-5xl font-bold">
                {totalDeliverableDelivered ?? "0"}
            </span>
            <span className="mr-2 text-xl font-bold">
              /{totalDeliverable ?? "0"}
            </span>
        </div>
    </div>

    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900">
            <h3 className="text-slate-700 font-light text-md">
                MRR
            </h3>
            <span className="mr-2 text-5xl font-bold">
                {totalReceiving ?? "No Data"}
            </span>
        </div>
    </div> */}


                    </div>
                </div>

            <div className="p-5 flex flex-row gap-2">
               
                <div className="w-1/2">


                    {/* Latest Items */}
                    <div className="w-full">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg h-auto">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div>
                                    <span>Recent Stocks</span>
                                </div>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                                    <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="">
                                            <th>Date</th>
                                            <th>Item</th>
                                            <th>Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Map through latest items */}
                                        {latestItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    {new Date(
                                                        item.created_at
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Items */}
                <div className="w-1/2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <div className="w-full flex flex-row justify-between items-center mb-2">
                                    <div>
                                        <span>Available Stocks</span>
                                    </div>
                                    <div className="flex flex-row items-center relative gap-2">
                                        <div>
                                            <th className="flex flex-row cursor-pointer items-center relative"></th>
                                        </div>
                                        <div className="absolute pointer-events-none right-2">
                                            <svg
                                                fill="none"
                                                height="24"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle cx="11" cy="11" r="8" />
                                                <line
                                                    x1="21"
                                                    x2="16.65"
                                                    y1="21"
                                                    y2="16.65"
                                                />
                                            </svg>
                                        </div>

                                        <TextInput
                                            className="w-[300px]"
                                            defaultValue={queryParams.name}
                                            placeholder="Search Here"
                                            onBlur={(e) =>
                                                searchFieldChanged(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={(e) =>
                                                onKeyPress("name", e)
                                            }
                                        />
                                    </div>
                                </div>

                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                                    <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="">
                                            <TableHeading
                                                className=""
                                                name="name"
                                                id="name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Item
                                            </TableHeading>
                                            <TableHeading
                                                className=""
                                                name="category_id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Total Qty
                                            </TableHeading>
                                            <TableHeading
                                                className=""
                                                name="status"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Status
                                            </TableHeading>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-base">{item.name}</td>
                                                <td className="w-24 text-base font-bold text-center">{item.total_qty}</td>
                                                <td className="w-28">{item.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-2 px-12"></div>
        </AuthenticatedLayout>
    );
}
