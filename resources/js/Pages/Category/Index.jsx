import { Alert } from "@material-tailwind/react";
import React from "react";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({
    auth,
    categories,
    queryParams = null,
    success,
}) {
    const [open, setOpen] = React.useState(true);

    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        const lowerCaseName = name.toLowerCase();

        if (value) {
            queryParams[lowerCaseName] = value;
        } else {
            delete queryParams[lowerCaseName];
        }

        // change the url path everytime option changes
        router.get(route("category.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        const lowerCaseName = name.toLowerCase();

        if (e.key !== "Enter") return;

        searchFieldChanged(lowerCaseName, e.target.value);
    };
    // sorting functions
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        }
        // sorting the different fields
        else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("category.index"), queryParams);
    };

    const deleteCategory = (category) => {
        if (!window.confirm("Are you sure you want to delete  the category")) {
            return;
        }

        router.delete(route("category.destroy", category.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between categories-center relative">
                    <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">
                        Category
                    </h2>
                </div>
            }
        >
            {/* head displayed together with the appname */}
            <Head title="Categories" />
            <div className="py-5">
                <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-5/6">
                        {success && (
                            <Alert
                                className=" absolute z-50 w-11/12 px-4 py-4 mb-5 rounded text-slate-800 bg-green-100 ring-2 ring-green-800"
                                open={open}
                                onClose={() => setOpen(false)}
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 100 },
                                }}
                            >
                                {" "}
                                {success}
                            </Alert>
                        )}
                    </div>

                    <div className="dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between py-4">
                            <Link
                                href={route("category.create")}
                                className="flex flex-nowrap gap-2 font-semibold bg-blue-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-blue-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                New Category
                            </Link>

                            <div className="flex flex-row items-center relative">
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
                                    className="w-[500px]"
                                    defaultValue={queryParams.name}
                                    placeholder="Search Category Here "
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </div>
                        </div>

                        <div className="h-auto">
                            <div className="grid grid-cols-3 gap-5">
                                {categories.data.map((category) => (
                                    <div
                                        key={category.id}
                                        className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg w-full p-6 min-h-[200px] flex flex-col place-content-between"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-row gap-2">
                                                <div className="w-6">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        id="Shipping-Box-1--Streamline-Sharp"
                                                    >
                                                        <desc>
                                                            Shipping Box 1
                                                            Streamline Icon:
                                                            https://streamlinehq.com
                                                        </desc>
                                                        <g id="shipping-box-1--box-package-label-delivery-shipment-shipping">
                                                            <path
                                                                id="Union"
                                                                fill="#8fbffa"
                                                                fill-rule="evenodd"
                                                                d="M23.76 0.24H0.24V23.76H23.76V0.24Z"
                                                                clip-rule="evenodd"
                                                                stroke-width="1"
                                                            ></path>
                                                            <path
                                                                id="Intersect"
                                                                fill="#2859c5"
                                                                fill-rule="evenodd"
                                                                d="M8.1712 0.24V10.3591L12 7.6242L15.8288 10.3591V0.24H8.1712Z"
                                                                clip-rule="evenodd"
                                                                stroke-width="1"
                                                            ></path>
                                                            <path
                                                                id="Vector 3 (Stroke)"
                                                                fill="#2859c5"
                                                                fill-rule="evenodd"
                                                                d="M19.1107 20.4781H13.6409V18.8372H19.1107V20.4781Z"
                                                                clip-rule="evenodd"
                                                                stroke-width="1"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </div>

                                                <div className="text-lg font-bold">
                                                    {" "}
                                                    {category.name ??
                                                        "No Category Name"}
                                                </div>
                                            </div>

                                            <div className="text-xs font-light">
                                                Category ID: {category.id}
                                            </div>
                                        </div>

                                        <div className="font-light text-sm">
                                            {category.description ??
                                                "No Category Description"}
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-sm font-light">
                                                SKU Prefix :
                                                {category.sku_prefix ??
                                                    "No Sku Prefix"}
                                            </div>
                                            <div className="flex justify-end">
                                                <Link
                                                    href={route(
                                                        "category.edit",
                                                        category.id
                                                    )}
                                                    className="text-blue-600 mx-1 hover:text-gray-600"
                                                >
                                                  <div className="group relative">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                        />
                                                    </svg>
                                                    <span class="absolute z-10 -top-10 -left-2 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Edit</span>
                                                    </div>
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteCategory(category)
                                                    }
                                                    className="text-red-600 mx-1 hover:text-gray-600"
                                                >
                                                  <div className="group relative">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                                        />
                                                    </svg>
                                                    <span class="absolute z-10 -top-10 -left-2 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Delete</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            
                        </div>
                        <Pagination links={categories.meta.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
