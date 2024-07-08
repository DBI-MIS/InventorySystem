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
// import CustomBarChart from "@/Components/BarChart";
import { usePage } from "@inertiajs/inertia-react";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
    latestMrrs,
    latestDrs,
    itemsByLocation,
    chartData  = usePage().props,
    // dailyItemCounts = usePage().props,
}) {
    queryParams = queryParams || {};

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

   
        const options = {
            animationEnabled: true,
            exportEnabled: false,
            theme: "light1", // "light1", "dark1", "dark2"
            title: {
                text: ""
            },
            data: [{
                type: "pie",
                indexLabel: "{label}: {y}",
                startAngle: -90,
                dataPoints: chartData
            }]
        };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-extrabold text-4xl text-blue-600 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Top */}

            <div className="px-7 pt-4 w-full text-base font-bold text-right border-b-2 border-white/50 flex justify-between">
                <span className="font-light text-xl">Welcome! {userName}</span>
                <span className="font-light text-lg">{currentDateTime}</span>
            </div>

            

            <div className="px-5 pt-2 w-full">
                <div className="flex flex-row gap-2">
                    {/* Cards */}
                    <div className="w-2/3 grid grid-cols-4 gap-2 text-center content-start">
                        <div className="col-span-1 flex flex-row bg-white overflow-hidden shadow-sm sm:rounded-lg content-center items-center justify-center gap-2 p-4">
                            <div className="w-12">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    id="Module--Streamline-Sharp"
                                >
                                    <desc>
                                        Module Streamline Icon:
                                        https://streamlinehq.com
                                    </desc>
                                    <g id="module--cube-code-module-programming-plugin">
                                        <path
                                            id="Vector 1377"
                                            fill="#2859c5"
                                            d="M1 5.5 12 1l11 4.5v13L12 23 1 18.5v-13Z"
                                            stroke-width="1"
                                        ></path>
                                        <path
                                            id="Union"
                                            fill="#8fbffa"
                                            fillRule="evenodd"
                                            d="M11.25 9.693 1 5.5 12 1l11 4.5 -10.25 4.193v13L12 23l-0.75 -0.307v-13Z"
                                            clip-rule="evenodd"
                                            stroke-width="1"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="text-gray-900 text-left ml-2">
                                <h3 className="text-slate-700 font-light text-sm">
                                    Total Stocks
                                </h3>
                                <span className="text-4xl font-bold">
                                    {formattedTotalQuantity ?? "No Data"}
                                </span>
                            </div>
                        </div>

                        <div className="col-span-1 flex flex-row bg-white overflow-hidden shadow-sm sm:rounded-lg content-center items-center justify-center gap-2 p-4">
                            <div className="w-12">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    id="Gold--Streamline-Sharp"
                                >
                                    <desc>
                                        Gold Streamline Icon:
                                        https://streamlinehq.com
                                    </desc>
                                    <g id="gold--gold-money-payment-bars-finance-wealth-bullion-jewelry">
                                        <path
                                            id="Union"
                                            fill="#8fbffa"
                                            d="M9.066 12.75H3.434l-2.428 8.5h10.489l-2.43 -8.5Z"
                                            stroke-width="1"
                                        ></path>
                                        <path
                                            id="Union_2"
                                            fill="#8fbffa"
                                            d="M20.566 12.75h-5.632l-2.428 8.5h10.488l-2.428 -8.5Z"
                                            stroke-width="1"
                                        ></path>
                                        <path
                                            id="Union_3"
                                            fill="#8fbffa"
                                            d="M14.816 2.75H9.184l-2.428 8.5h10.488l-2.428 -8.5Z"
                                            stroke-width="1"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="text-gray-900 text-left ml-2">
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    id="Shipping-Box-1--Streamline-Sharp"
                                >
                                    <desc>
                                        Shipping Box 1 Streamline Icon:
                                        https://streamlinehq.com
                                    </desc>
                                    <g id="shipping-box-1--box-package-label-delivery-shipment-shipping">
                                        <path
                                            id="Union"
                                            fill="#8fbffa"
                                            fillRule="evenodd"
                                            d="M23.76 0.24H0.24V23.76H23.76V0.24Z"
                                            clip-rule="evenodd"
                                            stroke-width="1"
                                        ></path>
                                        <path
                                            id="Intersect"
                                            fill="#2859c5"
                                            fillRule="evenodd"
                                            d="M8.1712 0.24V10.3591L12 7.6242L15.8288 10.3591V0.24H8.1712Z"
                                            clip-rule="evenodd"
                                            stroke-width="1"
                                        ></path>
                                        <path
                                            id="Vector 3 (Stroke)"
                                            fill="#2859c5"
                                            fillRule="evenodd"
                                            d="M19.1107 20.4781H13.6409V18.8372H19.1107V20.4781Z"
                                            clip-rule="evenodd"
                                            stroke-width="1"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="text-gray-900 text-left ml-2">
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    id="Office-Worker--Streamline-Sharp"
                                >
                                    <desc>
                                        Office Worker Streamline Icon:
                                        https://streamlinehq.com
                                    </desc>
                                    <g id="office-worker--office-worker-human-resources">
                                        <path
                                            id="Union"
                                            fill="#2859c5"
                                            fillRule="evenodd"
                                            d="M17.735 12.766a3 3 0 0 0 -3 3v0.263h-2.25v6.987h10.5v-6.987h-2.25v-0.263a3 3 0 0 0 -3 -3Zm1 3.263v-0.263a1 1 0 0 0 -2 0v0.263h2Z"
                                            clip-rule="evenodd"
                                            stroke-width="1"
                                        ></path>
                                        <path
                                            id="Ellipse 411"
                                            fill="#8fbffa"
                                            d="M6.98 8.5a8.47 8.47 0 0 0 -5.5 2.019V17h2.5v6h6v-8.715h2.5v-3.766A8.467 8.467 0 0 0 6.98 8.5Z"
                                            stroke-width="1"
                                        ></path>
                                        <path
                                            id="Ellipse 354"
                                            fill="#8fbffa"
                                            d="M3.98 4a3 3 0 1 0 6 0 3 3 0 1 0 -6 0"
                                            stroke-width="1"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="text-gray-900 text-left ml-2">
                                <h3 className="text-slate-700 font-light text-sm">
                                    Clients
                                </h3>
                                <span className="mr-2 text-4xl font-bold">
                                    {totalClient ?? "No Data"}
                                </span>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col w-full">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Stocks By Location
                                            </th>
                                            <th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Total Quantity
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemsByLocation.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {item.location_name}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {item.total_quantity}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="w-full flex flex-row gap-2">
                                {/* Latest Items */}
                                <div className="w-full">
                                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg h-auto">
                                        <div className="p-6 text-gray-900 dark:text-gray-100">
                                            <div className="flex flex-row justify-between items-center">
                                                <span>Recent Stocks</span>

                                                {/* Add Stock */}
                                                <div className="">
                                                    <Link
                                                        href={route(
                                                            "item.create"
                                                        )}
                                                        className="flex flex-nowrap gap-1 items-center text-sm font-light bg-blue-500 py-1 px-2 text-white rounded shadow transition-all hover:bg-blue-700"
                                                    >
                                                        <div className="group relative">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-4 h-4"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 4.5v15m7.5-7.5h-15"
                                                                />
                                                            </svg>
                                                            <span class="absolute z-10 top-5 left-0 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                                                                Add New Stock
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 min-h-[356px]">
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
                                                                { item.created_at || new Date(
                                                                ).toLocaleDateString()}
                                                                
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>
                                                                {item.quantity}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <div>
                                        {/* Latest Mrrs */}
                                        <div className="w-full">
                                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg h-auto">
                                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                                    <div className="flex flex-row justify-between items-center">
                                                        <span>Recent MRR</span>

                                                        {/* Create MRR */}
                                                        <div>
                                                            <Link
                                                                href={route(
                                                                    "receiving.create"
                                                                )}
                                                                className="flex flex-nowrap gap-1 items-center text-sm font-light bg-blue-500 py-1 px-2 text-white rounded shadow transition-all hover:bg-blue-700"
                                                            >
                                                                <div className="group relative">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-4 h-4"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M12 4.5v15m7.5-7.5h-15"
                                                                        />
                                                                    </svg>
                                                                    <span class="absolute z-10 top-5 left-0 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                                                                        Add MRR
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                                                        <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                                            <tr className="">
                                                                <th>Date</th>
                                                                <th>MRR No.</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* Map through latest MRR */}
                                                            {latestMrrs.map(
                                                                (mrr) => (
                                                                    <tr
                                                                        key={
                                                                            mrr.id
                                                                        }
                                                                    >
                                                                        <td>
                                                                        { mrr.created_at || new Date(
                                                                ).toLocaleDateString()}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                mrr.mrr_no
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                mrr.status
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {/* Latest Drs */}
                                        <div className="w-full">
                                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg h-auto">
                                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                                    <div className="flex flex-row justify-between items-center">
                                                        <span>Recent DR</span>

                                                        {/* Create DR */}
                                                        <div>
                                                            <Link
                                                                href={route(
                                                                    "deliverables.create"
                                                                )}
                                                                className="flex flex-nowrap gap-1 items-center text-sm font-light bg-blue-500 py-1 px-2 text-white rounded shadow transition-all hover:bg-blue-700"
                                                            >
                                                                <div className="group relative">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-4 h-4"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M12 4.5v15m7.5-7.5h-15"
                                                                        />
                                                                    </svg>
                                                                    <span class="absolute z-10 top-5 left-0 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                                                                        Add DR
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                                                        <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                                            <tr className="">
                                                                <th>Date</th>
                                                                <th>DR No.</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* Map through latest DR */}
                                                            {latestDrs.map(
                                                                (dr) => (
                                                                    <tr
                                                                        key={
                                                                            dr.id
                                                                        }
                                                                    >
                                                                        <td>
                                                                        { dr.created_at || new Date(
                                                                ).toLocaleDateString()}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                dr.dr_no
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                dr.status
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Items */}
                    <div className="w-1/3">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="overflow-auto">
                                
                                <div className="p-4" ><span className="text-lg font-bold">Available Stocks</span>
                                <CanvasJSChart options={options} containerProps={{ width: '100%', height: '300px' }} />
                                </div>

                                    <div className="w-full flex flex-row justify-between items-center mb-2">
                                        <div>
                                        </div>
                                        <div className="flex flex-row items-center relative w-full">
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
                                                    <circle
                                                        cx="11"
                                                        cy="11"
                                                        r="8"
                                                    />
                                                    <line
                                                        x1="21"
                                                        x2="16.65"
                                                        y1="21"
                                                        y2="16.65"
                                                    />
                                                </svg>
                                            </div>

                                            <TextInput
                                                className="w-full"
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
                                                    <td className="text-base">
                                                        {item.name}
                                                    </td>
                                                    <td className="w-24 text-base font-bold text-center">
                                                        {item.total_qty}
                                                    </td>
                                                    <td className="w-28">
                                                        <p
                                                            className={`whitespace-no-wrap text-center rounded-lg
                                                        ${
                                                            item.status ===
                                                            "out of stock"
                                                                ? " bg-red-500 text-white"
                                                                : item.status ===
                                                                  "need restock"
                                                                ? "bg-yellow-500 text-black"
                                                                : "bg-green-500 text-white"
                                                        }`}
                                                        >
                                                            {item.status}
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 pt-2 flex flex-row gap-2"></div>

            <div className="">
                {/* <CustomBarChart dailyItemCounts={dailyItemCounts} /> */}
            </div>
        </AuthenticatedLayout>
    );
}
