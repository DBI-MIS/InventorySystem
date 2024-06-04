<div className="w-5/6 mx-auto sm:px-6 lg:px-8">
<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
      <form onSubmit={onSubmit}  formData-page="{{ json_encode($page) }}"
          className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
          
           {/* START */}
           <div className="grid grid-cols-3 gap-2">

           {/* 1ST GRID COLUMN */}
           <div className="col-span-2 grid grid-cols-2 gap-2 content-start">

              {/* item */}
              <div className="mt-6 col-span-1">
                          <InputLabel htmlFor="item_name" value="Item Name"/>
                          <TextInput 
                          id="item_name"
                          type="text"
                          name="name"
                          value={formData.name}
                          className="mt-1 block w-full"
                          isFocused={true}
                          onChange={e => setFormData('name', e.target.value)}
                          />
                          <InputError message={errors.name} className="mt-2"/>
                      </div>

                      <div className=" mt-6  col-span-1">
                <InputLabel htmlFor="item_category_sku" value="Category"/>
                  <div className=" flex h-[11]">
                      <SelectInput
                          value={formData.category_id}
                          onChange={(e) =>setFormData('category_id', e.target.value)}
                          id="item_category_sku"
                          name="category_id"
                          className="mt-1 block w-full">
                              <option value="">Select Category </option>
                              {categories.formData.map((category)=>(
                                  <option value={category.id} key={category.id}>{category.name}</option>
                              ))}
                      </SelectInput>
                      <InputError message={errors.category_id} className="mt-2"/>
                  </div>

                 
            </div>
            <div className=" mt-4 col-span-1">
              <InputLabel htmlFor="item_brand_id" value="Brand"/>
              <SelectInput
              id="item_brand_id"
              name="brand_id"
              className="mt-1 block w-full"
              onChange={(e) => setFormData("brand_id", e.target.value)}>
                  <option value="">Select Brand </option>
                  {brands.formData.map((brand)=>(
                      <option value={brand.id} key={brand.id}>{brand.name}</option>

                  ))}
              </SelectInput>
              <InputError message={errors.brand_id} className="mt-2"/>
              <h1 id="hello"></h1>
          </div>
          <div className="mt-4 col-span-1 col-start-2 grid grid-cols-2 gap-1">
          <div className="col-span-1">
                  <InputLabel htmlFor="item_quantity" value="Quantity"/>
                  <TextInput 
                  id="item_quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  className="mt-1 block w-full"
                  onChange={e => setFormData('quantity', e.target.value)}
                  />
                  <InputError message={errors.quantity} className="mt-2"/>
              </div>
              <div className="col-span-1">
              <InputLabel htmlFor="item_brand_id" value="UOM"/>
              <SelectInput
                id="item_uom"
                name="uom"
                className="mt-1 block w-full"
                onChange={e => setFormData('uom', e.target.value)} >
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
              name="description"
              value={formData.description}
              className="mt-1 block w-full resize-none"
              rows="5"
              onChange={e => setFormData('description', e.target.value)}
              />
              <InputError message={errors.description} className="mt-2"/>
          </div>

          <div className="mt-4 col-span-2">
              <InputLabel htmlFor="item_specs" value="Specification"/>
              <TextAreaInput
              id="item_description"
              name="specs"
              value={formData.specs}
              className="mt-1 block w-full resize-none"
              rows="5"
              onChange={e => setFormData('specs', e.target.value)}
              />
              <InputError message={errors.specs} className="mt-2"/>
          </div>

          <div className="mt-4 col-span-2">
              <InputLabel htmlFor="item_remarks" value="Remarks"/>
              <TextAreaInput
              id="item_remarks"
              name="remarks"
              value={formData.remarks}
              className="mt-1 block w-full resize-none"
                      rows="5"
              onChange={e => setFormData('remarks', e.target.value)}
              />
              <InputError message={errors.remarks} className="mt-2"/>
          </div>

           </div>

           {/* 2ND GRID COLUMN */}
           <div className="col-span-1 grid grid-cols-1 content-start">
          
          <div className="col-span-1 grid grid-cols-2 ">

          {/* <div className="mt-6 col-span-1">
                      <InputLabel htmlFor="item_mrr_no" value="MRR No."/>
                      <SelectInput
                          value={formData.mrr_no}
                          onChange={e => setFormData('mrr_no',e.target.value)}
                          id="receiving_mrr_no"
                          name="mrr_no"
                          className="mt-1 block w-full"
                   >
                  <option value="">Select Mrr No</option>
                  {mrrData.map((formData, index) => (
                      <option key={index} value={formData.mrr_no}>
                          {formData.mrr_no}
                      </option>
                  ))}
              </SelectInput>
                     
                     
                  </div> */}
                  <div className="mt-6 col-span-q ">
                   <TextInput 
                      id="item_sku"
                      type="text"
                      name="sku"
                      readOnly
                      placeholder={sku}
                      value={formData.sku=sku} 
                      className="mt-6 block w-full"
                      />
            </div>
          </div>
           

            <div className="mt-4 col-span-1">
                  <InputLabel htmlFor="item_employee_id" value="Status"/>
                  <TextInput
                      id="item_status"
                      type="text"
                      name="status"
                      className="mt-1 block w-full"
                      onChange={(e) => setFormData("status", e.target.value)}
                  />
                  <InputError message={errors.item_status} className="mt-2"/>
              </div>

              <div className="mt-4 col-span-1">
                  <InputLabel htmlFor="item_serial_no" value="Serial No."/>
                  <TextInput 
                  id="item_serial_no"
                  type="text"
                  name="serial_no"
                  value={formData.serial_no}
                  className="mt-1 block w-full"
                  onChange={e => setFormData('serial_no', e.target.value)}
                  />
                  <InputError message={errors.serial_no} className="mt-2"/>
              </div>

              <div className="mt-4 col-span-1">
                  <InputLabel htmlFor="item_model_no" value="Model No."/>
                  <TextInput 
                  id="item_model_no"
                  type="text"
                  name="model_no"
                  value={formData.model_no}
                  className="mt-1 block w-full"
                  onChange={e => setFormData('model_no', e.target.value)}
                  />
                  <InputError message={errors.model_no} className="mt-2"/>
              </div>

              <div className="mt-4 col-span-1">
                  <InputLabel htmlFor="item_part_no" value="Part No."/>
                  <TextInput 
                  id="item_part_no"
                  type="text"
                  name="part_no"
                  value={formData.part_no}
                  className="mt-1 block w-full"
                  onChange={e => setFormData('part_no', e.target.value)}
                  />
                  <InputError message={errors.part_no_id} className="mt-2"/>
              </div>

              <div className="mt-4 col-span-1">
                  <InputLabel htmlFor="item_location_id" value="Location"/>
                  <SelectInput
                  id="item_location_id"
                  name="location_id"
                  className="mt-1 block w-full"
                  onChange={(e) => setFormData("location_id", e.target.value)}>
                      <option value="">Select Location</option>
                      {locations.formData.map((location)=>(
                          <option value={location.id} key={location.id}>{location.name}</option>

                      ))}
                  </SelectInput>
                  <InputError message={errors.location_id} className="mt-2"/>
              </div>

              <div className="mt-4 col-span-1">
              <InputLabel htmlFor="item_employee_id" value="Created By:"/>
              <SelectInput
              id="item_employee_id"
              name="employee_id"
              className="mt-1 block w-full"
              onChange={(e) => setFormData("employee_id", e.target.value)}>
                  <option value="">Select Employee</option>
                  {employees.formData.map((employee)=>(
                      <option value={employee.id} key={employee.id}>{employee.name}</option>

                  ))}
              </SelectInput>
              <InputError message={errors.brand_id} className="mt-2"/>
          </div>

           </div>

            </div>
        
          <div className="mt-4 text-right">
              <Link href={route('item.index')}
              className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-none hover:bg-gray-200 mr-2"
              >
              Cancel
              </Link>
              <button className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600">
                  Submit
              </button>
              </div>
      </form>
  </div>
</div>