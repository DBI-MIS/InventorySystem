import TableHeading from "@/Components/TableHeading";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Index({ auth, queryParams = null }) {

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
                            <TableHeading className="pr-10" name="item_name_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>ITEM NAME</TableHeading>
                            <TableHeading className="pr-10" name="item_description_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}sortChanged={sortChanged}>ITEM DESCRIPTION</TableHeading>

                        </tr>

                     </thead>

                </table>

                  </div>
                </div>
            </div>
        </div>
            </div>
        </Authenticated>
    )
}