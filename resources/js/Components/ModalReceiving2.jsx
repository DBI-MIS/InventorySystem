import React, { useState } from 'react';
import Modal from 'react-modal'; // Ensure you have this package installed
import InputLabel from './InputLabel';
import TextInput from './TextInput';
// import InputError from './InputError';
import SelectInput from './SelectInput';
import TextAreaInput from './TextAreaInput';

const ModalReceiving2 = ({ isOpen, onClose, categories, brands, locations, employees, onSubmit }) => {
    const [itemData, setItemData] = useState({
        item_name: '',
        item_code: '',
        category_id: '',
        brand_id: '',
        location_id: '',
        requested_by: '',
        // other fields
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add New Item Modal">
            <div className="">

                <div className="q-full sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit}
                            className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" >
                            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Item</h2>
                            {/* START */}
                            <div className="grid grid-cols-3 gap-2">

                                {/* 1ST GRID COLUMN */}
                                <div className="col-span-2 grid grid-cols-2 gap-2 content-start">

                                    {/* item */}
                                    <div className="mt-6 col-span-1">
                                        <InputLabel htmlFor="item_name" value="Item Name" />
                                        <TextInput
                                            id="item_name"
                                            type="text"
                                            name="name"
                                            placeholder="Enter New Item Name"
                                            value={itemData.name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={handleChange}
                                        />
                                        {/* <InputError message={errors.name} className="mt-2" /> */}
                                    </div>
                                    <div className=" mt-6  col-span-1">
                                        <InputLabel htmlFor="item_category_id" value="Category" />
                                        <div className=" flex h-[11]">
                                            <SelectInput
                                                value={itemData.category_id}
                                                onChange={handleChange}
                                                id="item_category_id"
                                                name="category_id"
                                                className="mt-1 block w-full">
                                                <option value="">Select Category </option>
                                                {categories.data.map((category) => (
                             <option value={category.id} key={category.id}>{category.name}</option>
                                                ))}
                                            </SelectInput>
                                            {/* <InputError message={errors.category_id} className="mt-2" /> */}
                                        </div>
                                    </div>

                                    <div className=" mt-4 col-span-1">
                                        <InputLabel htmlFor="item_brand_id" value="Brand" />
                                        <SelectInput
                                            id="item_brand_id"
                                            name="brand_id"
                                            value={itemData.brand_id}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}>
                                            <option value="">Select Brand </option>
                                            {brands.data.map((brand) => (
                                                <option value={brand.id} key={brand.id}>{brand.name}</option>
                                            ))}
                                        </SelectInput>
                                        {/* <InputError message={errors.brand_id} className="mt-2" /> */}
                                    </div>
                                    <div className="mt-4 col-span-1 col-start-2 grid grid-cols-2 gap-1">
                                        <div className="col-span-1">
                                            <InputLabel htmlFor="item_quantity" value="Quantity" />
                                            <TextInput
                                                id="item_quantity"
                                                type="number"
                                                name="quantity"
                                                placeholder="Enter Quantity"
                                                value={itemData.quantity}
                                                className="mt-1 block w-full"
                                                onChange={handleChange}
                                            />
                                            {/* <InputError message={errors.quantity} className="mt-2" /> */}
                                        </div>
                                        <div className="col-span-1">
                                            <InputLabel htmlFor="item__uom" value="UOM" />
                                            <SelectInput
                                                id="item_uom"
                                                name="uom"
                                                className="mt-1 block w-full"
                                                onChange={handleChange} >
                                                <option value="">Select UOM </option>
                                                <option value="M">Meters</option>
                                                <option value="Kg">Kilograms</option>
                                                <option value="L">Liters</option>
                                                <option value="Pcs">Pieces</option>
                                                <option value="Pc">Piece</option>
                                                <option value="Set">Set</option>
                                                <option value="Sets">Sets</option>
                                            </SelectInput>
                                            <InputError message={errors.uom} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="mt-4 col-span-2">
                                        <InputLabel htmlFor="item_description" value="Description" />
                                        <TextAreaInput
                                            id="item_description"
                                            name="description"
                                            placeholder="Enter Item Description"
                                            value={itemData.description}
                                            className="mt-1 block w-full resize-none"
                                            rows="5"
                                            onChange={handleChange}
                                        />
                                        {/* <InputError message={errors.description} className="mt-2" /> */}
                                    </div>

                                    <div className="mt-4 col-span-2">
                                        <InputLabel htmlFor="item_specs" value="Specification" />
                                        <TextAreaInput
                                            id="item_specs"
                                            name="specs"
                                            placeholder="Enter Item Specification"
                                            value={itemData.specs}
                                            className="mt-1 block w-full resize-none"
                                            rows="5"
                                            onChange={handleChange}
                                        />
                                        {/* <InputError message={errors.specs} className="mt-2" /> */}
                                    </div>

                                    <div className="mt-4 col-span-2">
                                        <InputLabel htmlFor="item_remarks" value="Remarks" />
                                        <TextAreaInput
                                            id="item_remarks"
                                            name="remarks"
                                            placeholder="Enter Item Remarks"
                                            value={itemData.remarks}
                                            className="mt-1 block w-full resize-none"
                                            rows="5"
                                            onChange={handleChange}
                                        />
                                        {/* <InputError message={errors.remarks} className="mt-2" /> */}
                                    </div>

                                </div>
                                {/* 2ND GRID COLUMN */}
                                <div className="col-span-1 grid grid-cols-1 content-start">

                                    <div className="col-span-1 grid grid-cols-2 ">
                                        <div className="mt-6 col-span-2 ">
                                            <TextInput
                                                id="item_sku"
                                                type="text"
                                                name="sku"
                                                readOnly
                                                placeholder={skuu}
                                                className="mt-6 block w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_employee_id" value="Status" />
                                        <TextInput
                                            id="item_status"
                                            type="text"
                                            name="status"
                                            placeholder="Enter Item Status"
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        {/* <InputError message={errors.item_status} className="mt-2" /> */}
                                    </div>

                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_serial_no" value="Serial No." />
                                        <TextInput
                                            id="item_serial_no"
                                            type="text"
                                            placeholder="Enter Serial Number"
                                            name="serial_no"
                                            value={itemData.serial_no}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        {/* <InputError message={errors.serial_no} className="mt-2" /> */}
                                    </div>

                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_model_no" value="Model No." />
                                        <TextInput
                                            id="item_model_no"
                                            type="text"
                                            name="model_no"
                                            placeholder="Enter Model Number"
                                            value={itemData.model_no}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.model_no} className="mt-2" />
                                    </div>

                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_part_no" value="Part No." />
                                        <TextInput
                                            id="item_part_no"
                                            type="text"
                                            name="part_no"
                                            placeholder="Enter Part Number"
                                            value={itemData.part_no}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        {/* <InputError message={errors.part_no_id} className="mt-2" /> */}
                                    </div>

                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_location_id" value="Location" />
                                        <SelectInput
                                            id="item_location_id"
                                            name="location_id"
                                            className="mt-1 block w-full"
                                            value={itemData.location_id}
                                            onChange={handleChange}>
                                            <option value="">Select Location Name</option>
                                            {locations.data.map((location) => (
                                                <option value={location.id} key={location.id}>{location.name}</option>

                                            ))}
                                        </SelectInput>
                                        {/* <InputError message={errors.location_id} className="mt-2" /> */}
                                    </div>

                                    <div className="mt-4 col-span-1">
                                        <InputLabel htmlFor="item_employee_id" value="Created By:" />
                                        <SelectInput
                                            id="item_employee_id"
                                            name="employee_id"
                                            className="mt-1 block w-full"
                                            value={itemData.employee_id}
                                            onChange={handleChange}>
                                            <option value="">Select Employee</option>
                                            {employees.data.map((employee) => (
                                                <option value={employee.id} key={employee.id}>{employee.name}</option>

                                            ))}
                                        </SelectInput>
                                        {/* <InputError message={errors.employee_id} className="mt-2" /> */}
                                    </div>

                                </div>

                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route('receiving.create')}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button type="submit" className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalReceiving2;
