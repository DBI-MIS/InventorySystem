 {/* TABLE */}
 <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
 <div className="p-6 text-gray-900 dark:text-gray-100">
     <div className="overflow-auto">
       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
             <tr className="text-nowrap ">
             <TableHeading  className="pr-10"  name="id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
             sortChanged={sortChanged}>ID</TableHeading>
             <TableHeading  className="pr-10"  name="sku"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
             sortChanged={sortChanged}>Sku </TableHeading>
               <TableHeading  className="pr-10"   name="name"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
             sortChanged={sortChanged}>Name</TableHeading>
               <TableHeading  className="pr-2"   name="brand_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
             sortChanged={sortChanged}>Brand</TableHeading>
               <TableHeading className="pr-10"  name="category_id"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
             sortChanged={sortChanged}>Category</TableHeading>
               <TableHeading  className="pr-10"  name="quantity"sort_field={queryParams.sort_field}sort_direction={queryParams.sort_direction}
             sortChanged={sortChanged}>Qty</TableHeading>
               <TableHeading className="px-3 py-3 text-right">Actions</TableHeading>
             </tr>
           </thead>
           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
             <tr className="text-nowrap ">
               <th className="px-3 py-3"></th>
               <th className="px-3 py-3"></th>
               <th className="px-3 py-3 w-full" >
                 <TextInput  className="max-w-full" 
                 defaultValue={queryParams.name}
                 placeholder="Item Name " 
                 onBlur={(e) => searchFieldChanged('name', e.target.value)}
                 onKeyPress={(e) => onKeyPress('name', e )}/>
               </th>
           
           
               <th className="px-3 py-3"></th>
               <th className="px-3 py-3"></th>
               <th className="px-3 py-3"></th>
               <th className="px-3 py-3 text-right"></th>
             
             </tr>
           </thead>
           <tbody>
             {receiving_item_ids.map((receiving_item_id)=>(
                  <tr className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700" key={receiving_item_id.id}>
                     <td className="px-3 py-2">
                         {receiving_item_id.id}
                     </td>
                     <td className="px-3 py-2">
                       {receiving_item_id.sku_prefix}-{receiving_item_id.sku}
                     </td>
                     <th className="px-3 py-2 text-gray-600 text-nowrap hover:underline">
                       <Link href={route('receivingItem.show', receivingItem.id)}>
                       {receiving_item_id.name}
                       </Link>
                     </th>
                     <td className="px-3 py-2">{receiving_item_id.brand_id}</td>
                     <td className="px-3 py-2">{receiving_item_id.category_id}</td>
                     <td className="px-3 py-2">{receiving_item_id.quantity} {receiving_item_id.uom} </td>
                 
                 </tr>
             ))}
           </tbody>
       </table>
     </div> 
</div>
{/* pagination not visible */}
{/* <Pagination links={receiving_item_ids.meta.links} /> */}
</div>