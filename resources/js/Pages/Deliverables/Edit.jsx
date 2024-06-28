import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import Select from "react-select";

export default function Edit({
    auth,
    deliverables, // data with relation
    clients, // collection
    stockrequests, // collection
    item_deliverables, // data items pivot
    list_items, // collection
}) {
    const { data, setData, post, errors } = useForm({
        
        dr_no: deliverables.dr_no || "",
        created_at: deliverables.created_at || "",
        remarks: deliverables.remarks || "",
        item_deliverables: item_deliverables || [],
        items: list_items || [],
        user_id: auth.user.id || "",
        client_id: deliverables.client.id || "",
        address: deliverables.client.address,
        stockrequest_id: deliverables.stockrequest.id || "",
        _method: "PUT", 
    });

    const [selectedOptions, setSelectedOptions] = useState([
        // data.list_items,
    ]);
   

    useEffect(() => {
        if (item_deliverables) {
            const selectedOptions = item_deliverables.map((item) => ({
                value: item.id,
                label: `${item.name} (${item.qty_out})`,
            }));
            setSelectedOptions(selectedOptions);
        }
    }, [item_deliverables]);

    const options = list_items.data.map((item) => ({
      value: item.id,
      label: item.name,
  }));

    const allItems = list_items.data.map((item) => ({
      ...item,
      id: parseInt(list_items.id),
  })); 


    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);

        const items = selectedOptions.map((option) => {
            const selectedItem = allItems.find(
                (item) => item.id === parseInt(option.value)
            );
            return { ...selectedItem, qty_out: selectedItem.qty_out || 1 };
        });

        setData(
            "items",
            data.list_items.map((item) => ({ ...item, items: item.id }))
        );
    };

   
    
    const handleQtyChange = (id, qty) => {
        const updatedItems = list_items.data.map((item) =>
            item.id === id ? { ...item, qty_out: qty } : item
        );
    
        setData("items", updatedItems);
    };

    // const handleQtyChange = (id, qty) => {
    //     const items = items.map((item) =>
    //         item.id === id ? { ...item, qty_out: qty } : item
    //     );
    //     setData(
    //         "items",
    //         data.list_items.map((item) => ({ ...item, items: item.id }))
    //     );
    // };

   

    const handleClientChange = (e) => {
        const selectedClientId = e.target.value;

        const selectedClient = clients.data.find(
            (client) => client.id === parseInt(selectedClientId)
        );

        setData((prevState) => ({
            ...prevState,
            client_id: selectedClientId,
            address: selectedClient ? selectedClient.address : "",
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("deliverables.update"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(
            route("item.upsert"),
            { items: data.items },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );

        post(route("deliverables.update", deliverables.id));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">
                        Edit DR
                    </h2>
                </div>
            }
        >
            <Head title="Edit Delivery Receipt" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-5/6"></div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={(e) => onSubmit()}
                            className="p-4 sm:p8  bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            action=""
                        >
                            <div className="flex">
                                <div className="w-full grid grid-cols-4 gap-2">
                                    <div className="mt-4 col-span-2">
                                        <InputLabel
                                            htmlFor="deliverables_client_id"
                                            value="Project."
                                        />
                                        <SelectInput
                                            id="deliverables_client_id"
                                            name="client_id"
                                            className="mt-1 block w-full"
                                            onChange={handleClientChange}
                                            value={data.client_id}
                                        >
                                            
                                            {clients.data.map((client) => (
                                                <option
                                                    value={client.id}
                                                    key={client.id}
                                                >
                                                    {client.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError
                                            message={errors.client_id}
                                            className="mt-2"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        id="item_user_id"
                                        name="user_id"
                                        defaultValue={data.user_id}
                                        hidden={true}
                                    />

                                    <div className="mt-4 col-span-2">
                                        <InputLabel
                                            htmlFor="deliverables_created_at"
                                            value="Date."
                                        />
                                        <TextInput
                                            id="deliverables_created_at"
                                            type="date"
                                            name="created_at"
                                            value={
                                                data.created_at ||
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "created_at",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.created_at}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4 col-span-2">
                                        <InputLabel
                                            htmlFor="deliverables_address"
                                            value="Address."
                                        />
                                    
                                        <TextInput
                                            id="deliverables_address"
                                            type="text"
                                            name="address"
                                            value={data.address}
                                            className="mt-1 block w-full"
                                            readOnly
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.address}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className=" mt-4 col-span-1 ">
                                        <InputLabel
                                            htmlFor="deliverables_dr_no"
                                            value="DR No."
                                        />

                                        <TextInput
                                            id="deliverables_dr_no"
                                            type="text"
                                            name="dr_no"
                                            value={data.dr_no}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("dr_no", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.dr_no}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4 col-span-1">
                                        <InputLabel
                                            htmlFor="deliverables_stockrequest_id"
                                            value="RS No."
                                        />
                                        <SelectInput
                                            id="deliverables_stockrequest_id"
                                            name="stockrequest_id"
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "stockrequest_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {/* <option value="">
                                                Select RS No.
                                            </option> */}
                                            {stockrequests.data.map(
                                                (stockrequest) => (
                                                    <option
                                                        value={stockrequest.id}
                                                        key={stockrequest.id}
                                                    >
                                                        {stockrequest.rs_no}
                                                    </option>
                                                )
                                            )}
                                        </SelectInput>
                                        <InputError
                                            message={errors.stockrequest_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4 col-span-4">
                                        <InputLabel
                                            htmlFor="Deliverable Items"
                                            value="Group of Items"
                                        />
                                        <div className="w-full">
                                            <Select
                                                value={selectedOptions}
                                                onChange={handleSelectChange}
                                                className="mt-1 block w-full"
                                                isMulti={true}
                                                options={options}
                                                isSearchable={true}
                                                placeholder="Select Items"
                                            ></Select>
                                            <InputError
                                                message={errors.items}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="col-span-3 xs:col-span-2">
                                  {/* <button
                                    className="flex flex-nowrap gap-2 font-semibold text-md bg-green-500 py-2 px-14 text-white rounded shadow transition-all hover:bg-green-700"
                                    onClick={handleAddSelect}
                                  >
                                  Add Items
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="font-bold w-6 h-6"
                                     >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                  </button> */}
                              </div>
                                        <div className="mt-5 min-h-[300px] w-full">
                                            <h1 className="text-2xl text-center p-5 font-semibold">
                                                DELIVERY RECEIPT ITEMS
                                            </h1>
                                            <table className="min-w-full bg-white">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                                    <tr>
                                                        <th className="pr-10">
                                                            ID
                                                        </th>
                                                        <th className="pr-10">
                                                            QTY
                                                        </th>
                                                        <th className="pr-10">
                                                            UNIT
                                                        </th>
                                                        <th className="pr-10">
                                                            ITEM NAME
                                                        </th>
                                                        <th className="pr-10">
                                                            ITEM DESCRIPTION
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {item_deliverables.map((item) => (
                                                        <tr
                                                            key={item.id}
                                                            className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700"
                                                        >
                                                            <td className="px-3 py-2">
                                                                {item.id}
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                <div className="flex flex-row items-center">
                                                                <input
                                                                        type="number"
                                                                        value={item.qty_out}
                                                                        onChange={(e) =>
                                                                            handleQtyChange(
                                                                                item.id,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="mt-1 block w-max border-0 text-right"
                                                                    />
                                                                    <span className="text-xs">
                                                                        /{" "}
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <InputError
                                                                message={
                                                                    errors[
                                                                        `items.${item.id}.qty_out`
                                                                    ]
                                                                }
                                                                className="mt-2"
                                                            />
                                                            <td className="px-3 py-2">
                                                                {item.uom}
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {item.name}
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    item.description
                                                                }
                                                            </td>
                                                          
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mt-4 col-span-4">
                                        <InputLabel
                                            htmlFor="deliverables_remarks"
                                            value="Remarks."
                                        />
                                        <TextAreaInput
                                            id="deliverables_remarks"
                                            type="text"
                                            name="remarks"
                                            value={data.remarks}
                                            className="mt-1 block w-full"
                                            rows="4"
                                            onChange={(e) =>
                                                setData(
                                                    "remarks",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.remarks}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4 text-right col-span-4">
                                        <Link
                                            href={route("deliverables.index")}
                                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            onClick={handleSubmit}
                                            className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
