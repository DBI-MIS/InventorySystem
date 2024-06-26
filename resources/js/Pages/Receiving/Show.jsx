import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
export default function Show({ auth, receiving, receiving_items }) {
    console.log("receiving" + receiving);
    console.log("receiving_items" + receiving_items);

    receiving_items = Array.isArray(receiving_items) ? receiving_items : [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex receivings-centerjustify-between">
                    <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight capitalize">
                        {`Material Receiving Report - ${receiving.mrr_no}  `}
                    </h2>
                </div>
            }
        >
            <Head title={`MRR-${receiving.id} `} />

            <div className="py-6 capitalize">
                <div className="w-full mx-auto sm:px-6 lg:px-8 grid grid-cols-4 font-bold gap-2 ">
                    {/* card #0 */}
                    <div className="col-span-1 bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col justify-start h-fit relative">
                        <dl className="p-6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="">

                                <div className="flex flex-row gap-2 items-center">
                                    <div className="min-w-8">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            id="Download-Box-1--Streamline-Sharp"
                                        >
                                            <desc>
                                                Download Box 1 Streamline Icon:
                                                https://streamlinehq.com
                                            </desc>
                                            <g id="download-box-1--arrow-box-down-download-internet-network-server-upload">
                                                <path
                                                    id="Subtract"
                                                    fill="#8fbffa"
                                                    fill-rule="evenodd"
                                                    d="M6.5302 0.24L3.2484 4.0688V16.6493H8.7181V8.9916H15.2819V16.6493H20.7516V4.0688L17.4698 0.24H6.5302Z"
                                                    clip-rule="evenodd"
                                                    stroke-width="1"
                                                ></path>
                                                <path
                                                    id="Union"
                                                    fill="#2859c5"
                                                    fill-rule="evenodd"
                                                    d="M6.5302 0.24L3.2484 4.0688H11.1795V0.24H6.5302ZM20.7516 4.0688H12.8205V0.24H17.4698L20.7516 4.0688ZM13.6409 10.6326V18.2902H16.3758V19.3842L12 23.76L7.6242 19.3842V18.2902H10.3591V10.6326H13.6409Z"
                                                    clip-rule="evenodd"
                                                    stroke-width="1"
                                                ></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col pb-3 mt-2">
                                        <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                            MRR No.:
                                        </dt>
                                        <span className="text-4xl font-semibold ">
                                            {receiving.mrr_no ??
                                                "No MRR Number"}
                                        </span>
                                    </div>
                                </div>

                            </div>
                            
                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Client/Project :
                                </dt>
                                <dd className="text-lg font-bold">
                                    {receiving.client && receiving.client.name
                                        ? receiving.client.name
                                        : "No Client Name"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Address :
                                </dt>
                                <dd className="text-base font-light">
                                    {receiving.address ?? "No Address"}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Status :
                                </dt>
                                <dd className="text-lg font-light">
                                    {receiving.status ?? "No Status"}
                                    {/* <span
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
                                    </span> */}
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    SI No. :{" "}
                                </dt>
                                <dd className="text-lg font-light">
                                    <span className="">
                                        {receiving.si_no ?? "No SI No."}
                                    </span>
                                </dd>
                            </div>

                            <div className="flex flex-col pb-3 mt-2">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    DR No. :
                                </dt>
                                <dd className="text-lg font-light">
                                    <span className="">
                                        {receiving.deliver &&
                                        receiving.deliver.dr_no
                                            ? receiving.deliver.dr_no
                                            : "No DR Number"}
                                    </span>
                                </dd>
                            </div>

                            <div className="flex flex-col gap-3 items-end">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    MRR ID:{" "}
                                    <span className="font-bold">
                                        {receiving.id ?? "No MRR ID"}
                                    </span>
                                </dt>
                            </div>
                        </dl>

                        <Link
                            href={route("receiving.edit", receiving.id)}
                            className="bg-blue-500 py-2 px-4 font-light text-white shadow transition-all hover:bg-blue-700 text-center"
                        >
                            Edit
                        </Link>

                        <Link
                            href={route("receiving.myReceiving", receiving.id)}
                            className="bg-blue-300 py-2 px-4 font-light text-white shadow transition-all hover:bg-blue-700 text-center"
                        > Print
                
                        </Link>

                        <Link
                            href={route("receiving.myReceiving", receiving.id)}
                            className="absolute right-2 top-2 py-2 px-2 font-light text-white rounded transition-all hover:bg-gray-300 text-center w-8"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Shredder--Streamline-Sharp"><desc>Shredder Streamline Icon: https://streamlinehq.com</desc><g id="shredder--device-electronics-shred-paper-cut-destroy-remove-delete"><path id="Rectangle 743" fill="#2859c5" d="M5 1h14v7H5V1Z" stroke-width="1"></path><path id="Subtract" fill="#8fbffa" fill-rule="evenodd" d="M23 8H1v10h5v-4h12v4h5V8Z" clip-rule="evenodd" stroke-width="1"></path><path id="Union" fill="#2859c5" fill-rule="evenodd" d="M13 14.25h1.5V20a3 3 0 0 0 3 3h1v-2h-1a1 1 0 0 1 -1 -1v-5.75H20v-1.5H4v1.5h3.5V20a1 1 0 0 1 -1 1h-1v2h1a3 3 0 0 0 3 -3v-5.75H11V23h2v-8.75Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>
                        </Link>
                    </div>

                    {/* card #2 */}
                    <div className="w-full mx-auto bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg col-span-3">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col min-h-[540px] justify-between relative">
                            <div className="py-6 px-2 text-gray-900 dark:text-gray-100">
                                <div className="overflow-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                            <tr className="text-nowrap ">
                                                <th class="w-[60px] border text-center px-1 py-4">
                                                    #
                                                </th>
                                                <th class="w-[60px] border text-left px-8 py-4">
                                                    SKU
                                                </th>
                                                <th class="w-[60px] border text-left px-8 py-4">
                                                    QTY
                                                </th>
                                                <th class="w-[60px] border text-left px-8 py-4">
                                                    Unit
                                                </th>
                                                <th class=" border text-left px-8 py-4">
                                                    Item Name
                                                </th>
                                                <th class=" border text-left px-8 py-4">
                                                    Description
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {/* if group item is null */}
                                            {!receiving_items ||
                                                (receiving_items.length ===
                                                    0 && (
                                                    <div class="font-md mt-5 text-gray-600/50 p-4 absolute text-xl">
                                                        No existing items on MRR
                                                        No. {receiving.mrr_no}
                                                        <div className="mt-5">
                                                            <Link
                                                                href={route(
                                                                    "receiving.edit",
                                                                    receiving.id
                                                                )}
                                                                className="bg-gray-600 px-2 font-light text-white rounded shadow transition-all hover:bg-blue-700 text-center"
                                                            >
                                                                +
                                                            </Link>{" "}
                                                            Add Items
                                                        </div>
                                                    </div>
                                                ))}
                                            {receiving_items &&
                                                receiving_items.length !==
                                                    0 && (
                                                    <>
                                                        {receiving_items.map(
                                                            (
                                                                receiving_item, index
                                                            ) => (
                                                                <tr
                                                                    className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700"
                                                                    key={
                                                                        receiving_item.id
                                                                    }
                                                                >
                                                                    <td className="px-3 py-2 text-center">
                                                                        {index + 1}
                                                                        {/* {receiving_item.id ??
                                                                            "No Receiving ID"} */}
                                                                    </td>
                                                                    <td className="px-3 py-2 text-nowrap text-center">
                                                                        {receiving_item.category ? receiving_item
                                                                                  .category
                                                                                  .sku_prefix
                                                                            : "No Sku Prefix "}
                                                                        -
                                                                        {receiving_item.sku ??
                                                                            "No SKU"}
                                                                    </td>
                                                                    <td className="px-3 py-2 text-nowrap text-right">
                                                                        {receiving_item.quantity ??
                                                                            "No quantity"}
                                                                    </td>
                                                                    <td className="px-3 py-2 text-nowrap text-left">
                                                                        {receiving_item.uom ??
                                                                            "No UOM "}
                                                                    </td>
                                                                    <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                                                                        <Link
                                                                            href={route(
                                                                                "item.show",
                                                                                receiving_item.id
                                                                            )}
                                                                        >
                                                                            {receiving_item.name ??
                                                                                "No Item Name"}
                                                                        </Link>
                                                                    </th>
                                                                    <td className="px-3 py-2 text-wrap">
                                                                        {receiving_item.description ??
                                                                            "No Item Description"}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="px-6 flex flex-col gap-3">
                                <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">
                                    Remarks :
                                    <span className="font-light">
                                        {receiving.remarks ?? "No Remarks"}
                                    </span>
                                </dt>
                            </div>

                            {/* <PaginationReceiving links={paginationData.links} /> */}
                        </div>
                    </div>

                    {/* card #3 */}
                    {/* <div className="col-span-1">
                        <div className="px-6 ">
                            <label
                                className="font-light text-gray-700 text-md"
                                htmlFor="ReceivingId"
                            >
                                Remarks :
                            </label>
                            <span>
                                {receiving.remarks ?? "No Receiving Remarks"}
                            </span>
                        </div>
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
