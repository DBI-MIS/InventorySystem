<div className="grid grid-cols-3 gap-2">

{/* 1ST GRID COLUMN */}
<div className="col-span-2 grid grid-cols-2 gap-2 content-start">

   {/* item */}
  
       <input type="text"
        id="item_user_id"
        name="user_id"
        defaultValue={formData.user_id}
        hidden="true"
       />
      
   <div className="mt-6 col-span-1">
       <InputLabel htmlFor="item_name" value="Item Name"/>
         <TextInput 
         id="item_name"
         type="text"
         name="name"
         minLength={3}
         placeholder="Enter Item Name"
         value={formData.name}
         className="mt-1 block w-full"
          isFocused={true}
         onChange={e => setData('name', e.target.value)}
         />
          <InputError message={errors.name} className="mt-2"/>
   </div>
   <div className=" mt-6  col-span-1">
       <InputLabel htmlFor="item_category_sku" value="Category"/>
       <div className=" flex h-[11]">
           <SelectInput
                value={formData.category_id}
                  onChange={(e) =>setData('category_id', e.target.value)}
               id="item_category_sku"
               name="category_id"
                       className="mt-1 block w-full">
                   <option value="">Select Category </option>
                   {categories.data.map((category)=>(
                       <option value={category.id} key={category.id}>{category.name}</option>
                   ))}
                   </SelectInput>
       </div>
       <InputError message={errors.category_id} className="mt-2"/>
   </div>
   <div className=" mt-4 col-span-1">
       <InputLabel htmlFor="item_brand_id" value="Brand"/>
       <SelectInput
       id="item_brand_id"
       name="brand_id"
       className="mt-1 block w-full"
       onChange={(e) => setData("brand_id", e.target.value)}>
           <option value="">Select Brand </option>
           {brands.data.map((brand)=>(
               <option value={brand.id} key={brand.id}>{brand.name}</option>
           ))}
       </SelectInput>
       <InputError message={errors.brand_id} className="mt-2"/>
   </div>
   <div className="mt-4 col-span-1 col-start-2 grid grid-cols-2 gap-1">

       <div className="col-span-1">
           <InputLabel htmlFor="item_quantity" value="Quantity"/>
           <TextInput 
               id="item_quantity"
               type="number"
               placeholder="Enter Quantity"
               name="quantity"
               min={1}
               value={formData.quantity}
               className="mt-1 block w-full"
               onChange={e => setData('quantity', e.target.value)}
           />
           <InputError message={errors.quantity} className="mt-2"/>
       </div>
       <div className="col-span-1">
           <InputLabel htmlFor="item_brand_id" value="UOM"/>
           <SelectInput
               id="item_uom"
               name="uom"
               className="mt-1 block w-full"
               onChange={e => setData('uom', e.target.value)} >
               <option value="">Select UOM </option>
               <option value="M">Meters</option>
               <option value="Kg">Kilograms</option>
               <option value="L">Liters</option>
               <option value="Pcs">Pieces</option>
               <option value="Pc">Piece</option>
               <option value="Set">Set</option>
               <option value="Sets">Sets</option>
           </SelectInput>
           <InputError message={errors.uom} className="mt-2"/>
       </div>
   </div>

  <div className="mt-4 col-span-2">
       <InputLabel htmlFor="item_description" value="Description"/>
       <TextAreaInput
       id="item_description"
       placeholder="Enter Item Description"
       name="description"
       value={formData.description}
       className="mt-1 block w-full resize-none"
       rows="5"
       onChange={e => setData('description', e.target.value)}
       />
       <InputError message={errors.description} className="mt-2"/>
 </div>

   <div className="mt-4 col-span-2">
       <InputLabel htmlFor="item_specs" value="Specification"/>
       <TextAreaInput
       id="item_specs"
       name="specs"
       placeholder="Enter Item Specifications"
       value={formData.specs}
       className="mt-1 block w-full resize-none"
       rows="5"
       onChange={e => setData('specs', e.target.value)}
       />
       <InputError message={errors.specs} className="mt-2"/>
   </div>

   <div className="mt-4 col-span-2">
       <InputLabel htmlFor="item_remark" value="Remarks"/>
       <TextAreaInput
       id="item_remark"
       name="remark"
       placeholder="Enter Item Remarks"
       value={formData.remark}
       className="mt-1 block w-full resize-none"
               rows="5"
       onChange={e => setData('remark', e.target.value)}
       />
       <InputError message={errors.remark} className="mt-2"/>
   </div>

</div>

{/* 2ND GRID COLUMN */}
<div className="col-span-1 grid grid-cols-1 content-start">
      
<div className="mt-7 col-span-1">
       <InputLabel htmlFor="item_sku" value="SKU"/>
        <TextInput 
           id="item_sku"
           type="text"
           name="sku"
           readOnly
           placeholder={sku}
           value={formData.sku=sku} 
           className=" block w-full"
           />
</div>
<div className="mt-4 col-span-1">
 <InputLabel htmlFor="item_statuses" value="Status"/>
 <Select
       className="basic-single"
       placeholder="Select Status"
       isDisabled={isDisabled}
       isLoading={isLoading}
       isClearable={isClearable}
       isRtl={isRtl}
       defaultValue={formData.statuses} 
       onChange={({ value }) => setData({ ...formData, statuses: value })}
       isSearchable={isSearchable}
       name="statuses"
       options={statusesOptions}
   />
       <InputError message={errors.statuses} className="mt-2"/>
   </div>

 {/* <div className="mt-4 col-span-1">
 <InputLabel htmlFor="item_statuses" value="Status"/>
       <SelectInput
       id="item_statuses"
       name="statuses"
       className="mt-1 block w-full"
       onChange={e => setData('statuses', e.target.value)} >
           <option value="">Select Status </option>
           <option value="new">Brand New</option>
           <option value="used">Used</option>
           <option value="defective">Defective</option>
           <option value="for_repair">For Repair</option>
           <option value="for_disposal">For Disposal</option>
           <option value="delivered">Delivered</option>
           <option value="reviewing">Reviewing</option>
           <option value="unassigned">Unassigned</option>
           <option value="processed">Processed</option>
       </SelectInput>
       <InputError message={errors.statuses} className="mt-2"/>
   </div> */}

   <div className="mt-4 col-span-1">
       <InputLabel htmlFor="item_serial_no" value="Serial No."/>
       <TextInput 
       id="item_serial_no"
       type="text"
       placeholder="Enter Serial Number"
       name="serial_no"
       value={formData.serial_no}
       className="mt-1 block w-full"
       onChange={e => setData('serial_no', e.target.value)}
       />
       <InputError message={errors.serial_no} className="mt-2"/>
   </div>

   <div className="mt-4 col-span-1">
       <InputLabel htmlFor="item_model_no" value="Model No."/>
       <TextInput 
       id="item_model_no"
       type="text"
       name="model_no"
       placeholder="Enter Model Number"
       value={formData.model_no}
       className="mt-1 block w-full"
       onChange={e => setData('model_no', e.target.value)}
       />
       <InputError message={errors.model_no} className="mt-2"/>
   </div>

   <div className="mt-4 col-span-1">
       <InputLabel htmlFor="item_part_no" value="Part No."/>
       <TextInput 
       id="item_part_no"
       type="text"
       name="part_no"
       placeholder="Enter Part Number"
       value={formData.part_no}
       className="mt-1 block w-full"
       onChange={e => setData('part_no', e.target.value)}
       />
       <InputError message={errors.part_no} className="mt-2"/>
   </div>

   <div className="mt-4 col-span-1">
       <InputLabel htmlFor="item_location_id" value="Location"/>
       <SelectInput
       id="item_location_id"
       name="location_id"
       className="mt-1 block w-full"
       onChange={(e) => setData("location_id", e.target.value)}>
           {locations.data.map((location)=>(
               <option value={location.id} key={location.id}>{location.name}</option>

           ))}
       </SelectInput>
       <InputError message={errors.location_id} className="mt-2"/>
   </div>

   {/* <div className="mt-4 col-span-1">
   <InputLabel htmlFor="item_employee_id" value="Created By:"/>
   <SelectInput
   id="item_employee_id"
   name="employee_id"
   className="mt-1 block w-full"
   onChange={(e) => setData("employee_id", e.target.value)}>
       <option value="">Select Employee</option>
       {employees.data.map((employee)=>(
           <option value={employee.id} key={employee.id}>{employee.name}</option>

       ))}
   </SelectInput>
   <InputError message={errors.employee_id} className="mt-2"/>
</div> */}

</div>

 </div>