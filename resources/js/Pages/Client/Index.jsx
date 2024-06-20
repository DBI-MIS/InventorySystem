import { Alert } from "@material-tailwind/react";
import React from "react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { CLIENT_STATUS_CLASS_MAP, CLIENT_STATUS_TEXT_MAP } from "@/constants";

export default function Index({ auth, clients, queryParams = null, success }) {
    console.log(clients);
    const [open, setOpen] = React.useState(true);

    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        // change the url path everytime option changes
        router.get(route("client.index"), queryParams);
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
        router.get(route("client.index"), queryParams);
    };
    // delete
    const deleteClient = (client) => {
        if (!window.confirm("Are you sure you want to delete  the client")) {
            return;
        }
        router.delete(route("client.destroy", client.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between clients-center relative">
                    <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">
                        Client
                    </h2>
                </div>
            }
        >
            <Head title="Clients" />
            <div className="py-5">
                <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 relative">
                    <div className="max-w-5/6">
                        {/* sucess message */}
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
                                href={route("client.create")}
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
                                New Client
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
                                    placeholder="Search client Here "
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
                                {clients.data.map((client) => (
                                    <div
                                        key={client.id}
                                        className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg w-full p-6 min-h-[200px] flex flex-col place-content-between"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-row gap-2">
                                                <div className="w-6">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        id="User-Multiple-Circle--Streamline-Sharp"
                                                    >
                                                        <desc>
                                                            User Multiple Circle
                                                            Streamline Icon:
                                                            https://streamlinehq.com
                                                        </desc>
                                                        <g id="user-multiple-circle--close-geometric-human-multiple-person-up-user-circle">
                                                            <path
                                                                id="Union"
                                                                fill="#8fbffa"
                                                                fill-rule="evenodd"
                                                                d="M12 1.25c-6.075 0 -11 4.925 -11 11s4.925 11 11 11 11 -4.925 11 -11 -4.925 -11 -11 -11Z"
                                                                clip-rule="evenodd"
                                                                stroke-width="1"
                                                            ></path>
                                                            <path
                                                                id="Union_2"
                                                                fill="#2859c5"
                                                                fill-rule="evenodd"
                                                                d="M7.536 6.708a3.434 3.434 0 1 0 0 6.868 3.434 3.434 0 0 0 0 -6.868Zm9.347 3.068a3.038 3.038 0 1 0 0 6.076 3.038 3.038 0 0 0 0 -6.076Z"
                                                                clip-rule="evenodd"
                                                                stroke-width="1"
                                                            ></path>
                                                            <path
                                                                id="Subtract"
                                                                fill="#2859c5"
                                                                fill-rule="evenodd"
                                                                d="M12.509 16.664v6.574Zm0 0a12.287 12.287 0 0 0 -5.287 -1.187c-1.892 0 -3.684 0.425 -5.287 1.187l-0.011 0.005A11.042 11.042 0 0 0 5.8 21.338c1.85 1.242 4.107 1.959 6.596 1.905m1.804 -5.01a11.222 11.222 0 0 1 1.861 -0.154c1.63 0 3.18 0.35 4.575 0.98l0.002 0.001a10.998 10.998 0 0 1 -6.438 3.97v-4.797Z"
                                                                clip-rule="evenodd"
                                                                stroke-width="1"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </div>

                                                <div className="text-lg font-bold">
                                                    {" "}
                                                    {client.name ??
                                                        "No client Name"}
                                                </div>
                                            </div>

                                            <div className="text-xs font-light">
                                                Client ID: {client.id}
                                            </div>
                                        </div>

                                        <div className="font-light text-sm">
                                            {client.address ?? "No Address"}
                                        </div>

                                        <div className="font-light text-sm">
                                            {" "}
                                            Contact Person :
                                            {client.contact_person ??
                                                "No Contact Person"}
                                        </div>

                                        <div className="font-light text-sm">
                                            {" "}
                                            Contact No. :
                                            {client.contact_no ??
                                                "No Contact Number"}
                                        </div>

                                        <div className="flex justify-between">
                                            <span
                                                className={
                                                    "px-2 py-1 font-semibold tracking-wide rounded text-white " +
                                                    CLIENT_STATUS_CLASS_MAP[
                                                        client.status
                                                    ]
                                                }
                                            >
                                                {CLIENT_STATUS_TEXT_MAP[
                                                    client.status
                                                ] ?? "No Status"}
                                            </span>

                                            <div className="flex justify-end items-center">
                                                <Link
                                                    href={route(
                                                        "client.edit",
                                                        client.id
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
                                                        <span class="absolute z-10 -top-10 -left-2 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                                                            Edit
                                                        </span>
                                                    </div>
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteClient(client)
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
                                                        <span class="absolute z-10 -top-10 -left-2 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                                                            Delete
                                                        </span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Pagination links={clients.meta.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
