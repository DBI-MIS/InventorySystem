// resources/js/Components/ItemInput.jsx
import React from 'react';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";

const ItemInput = ({ item, index, categories, brands, employees, locations, errors, handleItemChange }) => {
  console.log(item)
    return (
        <div className="border p-4 mb-4 rounded-lg">
            <div className="grid grid-cols-6 gap-2">
                <div className="mt-4 col-span-3">
                    <InputLabel htmlFor={`item_name_${index}`} value="Item Name" />
                    <TextInput
                        id={`item_name_${index}`}
                        type="text"
                        name={`items[${index}].name`}
                        value={item.name}
                        className="mt-1 block w-full"
                        onChange={handleItemChange(index)}
                    />
                    <InputError message={errors[`items.${index}.name`]} className="mt-2" />
                </div>
                <div className="mt-4 col-span-3">
                    <InputLabel htmlFor={`item_description_${index}`} value="Item Description" />
                    <TextAreaInput
                        id={`item_description_${index}`}
                        name={`items[${index}].description`}
                        value={item.description}
                        className="mt-1 block w-full"
                        onChange={handleItemChange(index)}
                    />
                    <InputError message={errors[`items.${index}.description`]} className="mt-2" />
                </div>
                <div className="mt-4 col-span-2">
                    <InputLabel htmlFor={`item_category_${index}`} value="Category" />
                    <SelectInput
                        id={`item_category_${index}`}
                        name={`items[${index}].category_id`}
                        value={item.category_id}
                        className="mt-1 block w-full"
                        onChange={handleItemChange(index)}
                    >
                        <option value="">Select Category</option>
                        {categories.data.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </SelectInput>
                    <InputError message={errors[`items.${index}.category_id`]} className="mt-2" />
                </div>
                <div className="mt-4 col-span-2">
                    <InputLabel htmlFor={`item_brand_${index}`} value="Brand" />
                    <SelectInput
                        id={`item_brand_${index}`}
                        name={`items[${index}].brand_id`}
                        value={item.brand_id}
                        className="mt-1 block w-full"
                        onChange={handleItemChange(index)}
                    >
                        <option value="">Select Brand</option>
                        {brands.data.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </SelectInput>
                    <InputError message={errors[`items.${index}.brand_id`]} className="mt-2" />
                </div>
                <div className="mt-4 col-span-2">
                    <InputLabel htmlFor={`item_employee_${index}`} value="Employee" />
                    <SelectInput
                        id={`item_employee_${index}`}
                        name={`items[${index}].employee_id`}
                        value={item.employee_id}
                        className="mt-1 block w-full"
                        onChange={handleItemChange(index)}
                    >
                        <option value="">Select Employee</option>
                        {employees.data.map((employee) => (
                            <option key={employee.id} value={employee.id}>{employee.name}</option>
                        ))}
                    </SelectInput>
                    <InputError message={errors[`items.${index}.employee_id`]} className="mt-2" />
                </div>
                <div className="mt-4 col-span-2">
                    <InputLabel htmlFor={`item_location_${index}`} value="Location" />
                    <SelectInput
                        id={`item_location_${index}`}
                        name={`items[${index}].location_id`}
                        value={item.location_id}
                        className="mt-1 block w-full"
                        onChange={handleItemChange(index)}
                    >
                        <option value="">Select Location</option>
                        {locations.data.map((location) => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                    </SelectInput>
                    <InputError message={errors[`items.${index}.location_id`]} className="mt-2" />
                </div>
            </div>
        </div>
    );
};

export default ItemInput;
