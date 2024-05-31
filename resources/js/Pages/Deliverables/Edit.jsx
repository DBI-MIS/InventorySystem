import { useForm } from "@inertiajs/inertia-react"
import { useState } from "react";

export default function Edit({ auth, existingItemss, existingItemsIds, deliverablessss, items }){

    const {data, setData, post, errors, processing} = useForm({
        project: deliverablessss.project || "",
        address: deliverablessss.address || "",
        dr_no:     deliverablessss.dr_no || "",
        rs_no:     deliverablessss.rs_no || "",
        dr_date: deliverablessss.dr_date || "",
        dr_qty:   deliverablessss.dr_qty || "",
        list_item_id:   existingItemsIds || "",
        _method: "PUT",
    });

    const [databaseItemIds, setDatabaseItemIds] = useState(Array.isArray(existingItemsIds) ? existingItemsIds : []);
    const existingItemsss = items.data.map(item => ({ ...item, id: parseInt(item.id) }));
    const [notification, setNotification] = useState('');
    const [allSelectedItemIds, setAllSelectedItemIds] = useState([]);
    const [deliverables, setDeliverables] = useState({});

    const options = items.data.map(item => ({
        value: item.id,
        label: item.name
    }));

    const selectedValueItems = databaseItemIds.map(databaseItemIds=> ({
        
    }))



    return (
        <div></div>
    )
}