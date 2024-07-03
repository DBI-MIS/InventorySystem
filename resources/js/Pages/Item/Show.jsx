import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ITEM_STATUS_CLASS_MAP, ITEM_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";
export default function Show({ auth, item, userName, replicatedItemId }) {
    console.log(item);
    console.log(replicatedItemId);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight capitalize">
                        {`Item Entry - ${item.name} `}
                    </h2>
                </div>
            }
        >
            <Head title={`Item "${item.name}" `} />
            <div className="py-6 capitalize">
                <div className="w-full mx-auto sm:px-6 lg:px-8 grid grid-cols-4 font-bold gap-2  relative">

                

                    {/* card #0 */}
                    <div className="col-span-1 bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col h-fit justify-start">
                    <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className="">
                        <div className="flex flex-row gap-2 items-center">
                                    <div className="min-w-7">
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
                                    <div className="flex flex-col pb-3 mt-2">
                                        <span className="text-2xl font-semibold ">
                                            {item.name ?? "No Item Name"}
                                        </span>
                                    </div>
                                </div>
                        </div>
                         <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Description :
                                </dt>
                                <dd className="text-base font-light">
                                    {item.description ?? "No Description"}
                                </dd>
                            </div>
                         
                            <div className="flex flex-col pb-3 mt-2">
                                    <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                        SKU :
                                    </dt>
                                    <dd className="text-lg font-light uppercase ">
                                        {item.sku_prefix ?? "No Sku Prefix"}-
                                        {item.sku ?? "No Sku"}
                                    </dd>
                                </div>

                                <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Status :
                                </dt>
                                <dd className="text-lg font-light">
                                    <span
                                        className={`px-2 py-1 font-semibold tracking-wide rounded ${
                                            ITEM_STATUS_CLASS_MAP[
                                                item.statuses
                                            ] || "bg-gray-300"
                                        } ${
                                            item.statuses
                                                ? "text-white"
                                                : "text-black"
                                        }`}
                                    >
                                        {ITEM_STATUS_TEXT_MAP[item.statuses] ||
                                            "No Item Status"}
                                    </span>
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Qty :{" "}
                                </dt>
                                <dd className="text-lg font-light">
                                    <span className="">
                                        {item.quantity ?? "No Quantity"}{" "}
                                        <span>{item.uom ?? "No UOM"}</span>
                                    </span>
                                </dd>
                            </div>

                            <div className="flex flex-col gap-3 items-end">
                                    
                                    <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Item ID: <span className="font-bold">
                                            {item.id ?? "No Item ID"}
                                        </span>
                                </dt>
                                        
                                    
                                </div>

                            
                            </dl>
                            
                        <Link
                            href={route("item.edit", item.id)}
                            className="bg-blue-500 py-2 px-4 font-light text-white shadow transition-all hover:bg-blue-700 text-center"
                        >
                            Edit
                        </Link>
                    

                    </div>

                    {/* card #1 */}
                    <div className="col-span-3 bg-white overflow-hidden shadow-sm sm:rounded-lg grid grid-cols-4">
                        
                    <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 col-span-3">
                        <span className="text-sm font-light text-gray-500">Details:</span>
                        
                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Specifications :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {item.specs ?? "No Specs"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Brand :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {item.brand && item.brand.name
                                        ? item.brand.name
                                        : "No Brand NAme"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Serial No. :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {item.serial_no ?? "No Serial Number"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Model No. :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {item.model_no ?? "No Model Number"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Part No. :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {item.part_no ?? "No Part Number"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Remarks :
                                </dt>
                                <dd className="text-base font-light">
                                    {item.remark ?? "No Remarks"}
                                </dd>
                            </div>
                        </dl>

                        <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 col-span-1">
                            <div className="flex flex-row flex-wrap justify-between items-center">
                                
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Category :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {item.category
                                        ? item.category.name
                                        : "Not belong on any Category"}
                                </dd>
                            </div>
                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Location :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {item.location && item.location.name
                                        ? item.location.name
                                        : "No Location Name"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Created by :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {userName ?? "No User"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Created Date :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                {new Date(item.created_at ?? "No Updated Date" ).toLocaleDateString()}
                                    
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Updated by :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {item.updatedBy.name ?? "No Update"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Assigned Employee :{" "}
                                </dt>
                                <dd className="text-base font-light">
                                    {item.employee && item.employee.name
                                        ? item.employee.name
                                        : "No Assigned Employee"}
                                </dd>
                            </div>            

                            
                        </dl>
                    </div>
                    {/* card #2 */}
                    {/* <div className="col-span-1 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
