import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { DELIVERABLES_STATUS_CLASS_MAP, DELIVERABLES_STATUS_TEXT_MAP, DONE_CLASS_MAP, DONE_STATUS_CLASS_MAP, DONE_TEXT_MAP } from "@/constants";
import { Head, Link, router } from "@inertiajs/react";
import { Alert } from "@material-tailwind/react";
import { space } from "postcss/lib/list";
import React, { useState } from "react";



export default function Index({
    auth,
    deliverables,
    queryParams = null,
    success,
}) {
    
    console.log("deliverables", deliverables)
    const [open, setOpen] = React.useState(true);
  
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        // change the url path everytime option changes
        router.get(route("deliverables.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("deliverables.index"), queryParams);
    };

    const deleteReceiving = (deliverables) => {
        // console.log(receiving)
        if (!window.confirm("Are you sure you want to delete  the receiving")) {
            return;
        }
        router.delete(route("deliverables.destroy", deliverables.id));
    };

    const deleteDeliverables = (deliverable) => {
        // console.log(receiving)
        if (
            !window.confirm("Are you sure you want to delete  the deliverables")
        ) {
            return;
        }
        router.delete(route("deliverables.destroy", deliverable.id));
    };

   

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between receivings-center">
                    <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">
                        Deliverables
                    </h2>
                </div>
            }
        >
            <Head title="Deliverables" />

            <div className="py-5">
                <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 relative">
                    <div className="max-w-5/6">
                        {success && (
                            <Alert
                            className={`absolute z-50 w-11/12 px-4 py-4 mb-5 rounded text-slate-800 ${
                                success.includes('Errors') || success.includes('Error') || success.includes('Warning') ? 'bg-red-100 ring-2 ring-red-800' :  success.includes('Success') || success.includes('successfully') ? 'bg-green-100 ring-2 ring-green-800' :'bg-green-100 ring-2 ring-green-800'
                            }`}
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


                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <div className="w-full flex flex-row justify-between items-center mb-2">
                                    <div>
                                        <Link
                                            href={route("deliverables.create")}
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
                                            </svg>{" "}
                                            New DR
                                        </Link>
                                    </div>
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
                                            defaultValue={queryParams.dr_no}
                                            placeholder="Search DR No. Here"
                                            onBlur={(e) =>
                                                searchFieldChanged(
                                                    "dr_no",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={(e) =>
                                                onKeyPress("dr_no", e)
                                            }
                                        />
                                    </div>
                                </div>

                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap ">

                                            <TableHeading
                                                className="pl-4"
                                                name="id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>

                                            <TableHeading
                                                className="pl-4"
                                                name="dr_no"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                DR NO.:
                                            </TableHeading>

                                            <TableHeading
                                                className="pl-4"
                                                name="dr_no"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Date
                                            </TableHeading>

                                            <th className="pl-4" name="rs_no_id">
                                                RS NO.
                                            </th>

                                            <th className="pl-4" name="client">
                                                PROJECT
                                            </th>
                                            <th className="pl-4 " name="status">
                                                STATUS
                                            </th>

                                            <th className="pl-4" name="status">
                                              CONTROL
                                            </th>
                                            
                                            <th className="pl-4" name="status">
                                              ACTION
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {deliverables.data.map(
                                            (deliverable, index) => (
                                                <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/20'} border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700`}
                                                    key={deliverable.id}
                                                >
                                                    <td className="w-[50px] py-2 pl-4">
                                                        {deliverable.id}
                                                    </td>

                                                    <td className="w-[200px] py-2 pl-4 hover:underline font-bold">

                                                    <Link
                                                                href={route(
                                                                    "deliverables.show",
                                                                    deliverable.id
                                                                )}
                                                            >
                                                        {deliverable.dr_no ??
                                                            "No DR No"}
                                                            </Link>
                                                    </td>

                                                    <td className="w-[100px] py-2 pl-4">
                                                    {new Date(deliverable.created_at ?? "No Date" ).toLocaleDateString()}
                                                    </td>

                                                    <td className="py-2 pl-4">
                                                        {deliverable.stockrequest ?.rs_no
                                                             ??
                                                            "No RS #"}
                                                    </td>

                                                    <td className="py-2 pl-4">
                                                                {deliverable.client.name                                                                   
                                                                     ??
                                                                    "No Client Name"}{" "}
                                                        
                                                    </td>
                                                   

                                                    <td className="w-[100px] py-2 pl-4 text-nowrap">
                                                        <span className={"px-2 py-1 font-semibold  rounded-full text-white " +
                                                        DELIVERABLES_STATUS_CLASS_MAP[deliverable.status] }>
                                                                {DELIVERABLES_STATUS_TEXT_MAP[deliverable.status] ?? "No Status"}                                            
                                                        </span>
                                                    </td>    
                                                    {(auth.user.role === 'user' || auth.user.role === 'super_admin') && (
                                                        <td className="w-[100px] pl-4">
                                                            {deliverable.is_done === "pending" ? (
                                                                <Link
                                                                    href={ route('deliverables.updateDone', deliverable.id) }
                                                                    className="bg-red-400 px-2 py-1 font-semibold rounded-full text-nowrap text-white"
                                                                    // onClick={() => {
                                                                    //     if (deliverable.is_done === "pending") {
                                                                    //         alert("Are you sure you want to send the DR for approval?");
                                                                    //     }
                                                                    // }}
                                                                >
                                                                    Send to Approver
                                                                </Link>
                                                            ) : deliverable.status === "for_approval" ? (
                                                                <Link
                                                                    href={ route('deliverables.undoApproval', deliverable.id) }
                                                                    className="bg-red-400 px-2 py-1 font-semibold rounded-full text-nowrap text-white"
                                                                >
                                                                    Undo
                                                                </Link>
                                                            ) : 
                                                            ''
                                                            }
                                                        </td>
                                                    )}

                                                    {(auth.user.role === 'editor' || auth.user.role === 'admin') && (
                                                        <>
                                                            <td className="flex">
                                                                <Link
                                                                    href={
                                                                        deliverable.is_done === "processed" || deliverable.status !== "approved"
                                                                            ? route('deliverables.updateApprove', deliverable.id)
                                                                            : "#"
                                                                    }
                                                                    className={`px-2 py-1 font-semibold rounded-full text-nowrap text-emerald`}
                                                                    onClick={() => {
                                                                        if (deliverable.is_done === "processed" || deliverable.status !== "approved") {
                                                                            alert("DR has been processed!");
                                                                        }
                                                                    }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                                                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                                                    </svg>
                                                                </Link>

                                                                <Link
                                                                    href={deliverable.status !== "approved" ? route('deliverables.updateReject', deliverable.id) : "#"}
                                                                    className={`px-2 mx-2 py-1 font-semibold rounded-full text-nowrap text-crimson`}
                                                                    onClick={() => {
                                                                        if (deliverable.status !== "approved") {
                                                                            alert("DR rejected");
                                                                        }
                                                                    }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                                                                    </svg>
                                                                </Link>

                                                                <Link
                                                                    href={deliverable.status !== "approved" ? route('deliverables.updateCancel', deliverable.id) : "#"}
                                                                    className={`px-2 py-1 font-semibold rounded-full text-nowrap text-red-400`}
                                                                    onClick={() => {
                                                                        if (deliverable.status !== "approved") {
                                                                            alert("DR cancelled");
                                                                        }
                                                                    }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                                                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                                                    </svg>
                                                                </Link>
                                                            </td>
                                                        </>
                                                    )}

                                                    <td className="w-[100px] py-2 text-nowrap">
                                                        <div className="w-[100px] flex flex-row justify-end items-center">
                                                            <Link
                                                                href={route(
                                                                    "deliverables.edit",
                                                                    deliverable.id
                                                                )}
                                                                className="text-blue-600 mx-1 hover:text-gray-600"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="w-5 h-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                                    />
                                                                </svg>
                                                            </Link>
                                                            <button
                                                                onClick={(e) =>
                                                                    deleteDeliverables(
                                                                        deliverable
                                                                    )
                                                                }
                                                                className="text-red-600 mx-1 hover:text-gray-600"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="w-5 h-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={deliverables.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
