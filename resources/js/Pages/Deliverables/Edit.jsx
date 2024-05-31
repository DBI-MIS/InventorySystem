import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react"
import { useEffect } from "react";
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
        value: databaseItemIds.id,
        label: databaseItemIds.id,
    }));

    const [selectedOptions, setSelectedOptions] = useState(allSelectedItemIds);
    const [selectedItemIds, setSelectedItemIds] = useState(selectedValueItems.map(option => option.value));

    useEffect(() => {
        setSelectedItemIds(selectedOptions.map(option => option.value));
    }, [selectedOptions]);

    const handleSelectChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
        const selectedOptionsss = Array.from(selectedOption, (option) => option.value);
        setSelectedItemIds(selectedOptionsss);
        setSelectedOptions(selectedOption);
    };
    console.log("selected Item ids" + selectedItemIds)

    const handleAddSelect = (e) => {
        e.preventDefault();

        const newSelectedItemIds = selectedItemIds.filter(id => !databaseItemIds.includes(parseInt(id, 10)));
        if (newSelectedItemIds.length === 0) {
            setNotification('Items are on the tables already!');
            setSelectedOptions([]);
            return;
        }
        const selectedItems = existingItemss.filter(item => newSelectedItemIds.includes(item.id.toString()));

        setDeliverables(prevDeliverables => [...prevDeliverables, ...selectedItemIds]);

        const intSelectedItemIds = newSelectedItemIds.map(id => parseInt(id, 10));

        const newAllSelectedItemIds = [...allSelectedItemIds, ...intSelectedItemIds];
        const newDatabaseItemIds = [...databaseItemIds, ...intSelectedItemIds];

        setAllSelectedItemIds(newAllSelectedItemIds);
        setDatabaseItemIds(newDatabaseItemIds);
        setData('list_item_id', newDatabaseItemIds);

        setSelectedItemIds([]);
        setSelectedOptions([]);
        setNotification('');
    };

    useEffect(() => {
        setData('list_item_id', databaseItemIds);
    }, [databaseItemIds]);

    console.log("selected Item ids", selectedItemIds);
      console.log("deliverables", deliverables);
      console.log("existing Items", existingItemsss);
      console.log("selectedOptions", selectedOptions);
      console.log("allSelectedItemIds", allSelectedItemIds);
      console.log("databaseItemIds", databaseItemIds);

      const handleRemoveExistingItem = (selectedItemIds, index) => {
        const remainIds = [...databaseItemIds];
        remainIds.splice(index, 1);
        setDatabaseItemIds(remainIds);
        setAllSelectedItemIds(remainIds);
      };
      useEffect(() => {
        console.log('Current data:', data);
      }, [data]);

      const onSubmit = (e) =>{
        e.preventDefault();
        post(route("deliverables.update",deliverablessss.id));
      }


    return (
        <Authenticated
        
        >

        </Authenticated>
    )
}