import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, deliverabless, deliverables, queryParams = null }) {

    queryParams = queryParams || {};

  const searchFieldChanged = (name, value, ) => {
    if(value){
      queryParams[name] = value;
    }
    else{
      delete queryParams[name];
    }
    // change the url path everytime option changes
    router.get(route('deliverables.index'), queryParams)
  };

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
};
const sortChanged = (name) => { 
  if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
          queryParams.sort_direction = 'desc';
      }else {
          queryParams.sort_direction = "asc";
      }
  } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
  }
  router.get(route("deliverables.index"), queryParams)
};

    return(
        <Authenticated
        user={auth.user}
        header={
          <div className="flex justify-between categories-center relative">
            <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">Deliverables</h2>
          </div>
      }
        >
            <Head title="Deliverables" />

            <div className="py-12">
        <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 ">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <div className="overflow-auto">
                  <div className="w-full flex flex-row justify-between items-center mb-2">
                          <div>
                          <Link href={route('deliverables.create')} className="flex flex-nowrap gap-2 font-semibold bg-blue-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-blue-700">
                 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg> New Item
            </Link></div>
                          <div className="flex flex-row items-center relative">
                          <div className="absolute pointer-events-none right-2"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                          </div>
                          {/* <SelectInput className="w-[300px] mx-2"
                          defaultValue={queryParams.category.id}
                            onChange={(e) => {
                            const value = e.target.value;
                            if (value === "reset") {
                            // Logic to reset the query parameter
                            searchFieldChanged('category.id', '');
                            } else {
                          searchFieldChanged('category.id', value);
                            }
                              }}
                                >
                                    <option value=" ">Select Category</option>
                                    <option value="reset">All</option>
                                    {uniqueCategories.map((item) => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))}
                                </SelectInput> */}


                          <TextInput  className="w-[500px]" 
                                  defaultValue={queryParams.name}
                                  placeholder="Search Item Name Here" 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                  
                                
                          </div>

                            
                          
                          </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                
                     <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">

                        <tr className="text-nowrap ">

                            <TableHeading className="pr-10" name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>ID</TableHeading>
                            <TableHeading className="pr-10" name="project"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>PROJECT</TableHeading>
                            <TableHeading className="pr-10" name="dr_no"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>DR NO.:</TableHeading>
                            <TableHeading className="pr-10" name="rs_no"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>RS NO.:</TableHeading>
                            <TableHeading className="pr-10" name="address_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>ADDRESS</TableHeading>
                            <TableHeading className="pr-10" name="dr_date"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>DATE</TableHeading>
                            <TableHeading className="pr-10" name="item_qty"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>QTY</TableHeading>
                            <TableHeading className="pr-10" name="item_unit"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>UNIT</TableHeading>
                            <TableHeading className="pr-10" name="item_name_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>ITEM NAME</TableHeading>
                            <TableHeading className="pr-10" name="item_description_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>ITEM DESCRIPTION</TableHeading>

                        </tr>

                     </thead>
                     {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                  <tr className="text-nowrap ">
                                        <th className="px-3 py-3" >
                                        <TextInput  className="w-[500px]" 
                                  defaultValue={queryParams.name}
                                  placeholder="Search Item Name Here" 
                                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                  onKeyPress={(e) => onKeyPress('name', e )}/>
                                        </th>
                                        
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>

                                        
                                        
                                  </tr>
                          </thead> */}
                          <tbody>
                            {deliverables.data.map((deliverable)=>(
                              <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={deliverable.id}>
                                <td className="px-3 py-2">{deliverable.name}</td>
                                <td className="px-3 py-2">{deliverable.project}</td>
                                <td className="px-3 py-2">{deliverable.dr_no}</td>
                                <td className="px-3 py-2">{deliverable.rs_no}</td>
                                <td className="px-3 py-2">{deliverable.address}</td>
                                <td className="px-3 py-2">{deliverable.dr_date}</td>
                                <td className="px-3 py-2">{deliverable.item_qty}</td>
                                <td className="px-3 py-2">{deliverable.item_unit}</td>
                                <td className="px-3 py-2">{deliverable.item_name}</td>
                                <td className="px-3 py-2">{deliverable.item_description}</td>
                              </tr>
                              
                            ))}
                          </tbody> 

                </table>

                  </div>
                </div>
            </div>
        </div>
            </div>
        </Authenticated>
    )
}