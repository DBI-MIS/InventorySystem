import React from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'


export default function TableHeading({
    name, 
    sortable = true, 
    sort_field = null,
    sort_direction = null,
    sortChanged = null,
    children
}) {
  return (
    <th onClick={(e)=>sortChanged(name)}>
    <div className="flex flex-row items-center cursor-pointer px-5 relative py-1">
    
        {children}
       {sortable && ( 
       <div className="justify-end absolute right-0">
          <ChevronUpIcon className={"w-3 " + (sort_field === name && sort_direction === 'asc' ? 'text-red-500' : "") } />
          <ChevronDownIcon className={"w-3 " + (sort_field === name && sort_direction === 'desc' ? 'text-red-500' : "") } /> 
        </div>
       )}
    </div>
     </th>
  );
}
