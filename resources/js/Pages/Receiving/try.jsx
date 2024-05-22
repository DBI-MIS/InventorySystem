<button
                                className="flex  m-5  float-end flex-nowrap gap-2 font-semibold bg-green-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-green-700"
                                    onClick={handleAddSelect} >
                                    Add Items
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                           </button>
                            <div className="mt-20">
                                {receivings.map((selectedOptions, index) => (
                                    <div key={index}>
                                        <div className=" mt-2  col-span-2 ">
                                             <InputLabel htmlFor="item" value="Item"/>
                                             <div className=" flex h-[11]">
                                             <SelectInput
                                                value={selectedOptions}
                                                onChange={(e) =>
                                                handleSelectChange(
                                                index,
                                                Array.from(e.target.selectedOptions, (option) => option.value)
                                                )}
                                                id="item_id"
                                                name="item_id[]"
                                                className="mt-1 block w-full">
                                                <option value="">Select item </option>
                                                 {items.data.map((item)=>(
                                                     <option value={item.id} key={item.id}>{item.name}</option>
                                                 ))}
                                            </SelectInput>
                                        <button onClick={() => handleRemoveSelect(index)}>Remove</button>
                                            </div>
                                                {/* <InputError message={errors.item_id} className="mt-2"/> */}
                                        </div> 
                                    </div>
                                    
                                ))}
                                 <div>
                                    <h2>Selected Item IDs:</h2>
                                     <ul>
                                        {receivings.map((selectedOptions, index) => (
                                        <li key={index}>{selectedOptions}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>