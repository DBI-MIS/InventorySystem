
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, router} from "@inertiajs/react" ;
import * as XLSX from "xlsx";
import { format } from 'date-fns';
export default function Index({logs, auth,queryParams}) {
  console.log("LOGS", logs)
  queryParams = queryParams || {};
    
  //search function
  const searchFieldChanged = (fieldName, value) => {
    if (value) {
        queryParams[fieldName] = value;
    } else {
        delete queryParams[fieldName];
    }
    
    router.get(route('log.index'), queryParams);
  };

  //Function to handle key presses 
  const onKeyPress = (fieldName, e) => {
    if (e.key !== 'Enter') return;
    
    const lowerCaseName = fieldName.toLowerCase();
    searchFieldChanged(lowerCaseName, e.target.value);
  };


  


const exportToExcel = () => {
  const fieldsToInclude = [
    'id',
    'log_name',
    'description',
    'subject_id',
    'subject_name',
    'properties',
    'created_at',
    'updated_at',
    'event',
    'causer_name',
    'subject_type',
  ];

  const titleMapping = {
    'id': 'ID',
    'log_name': 'Log Name',
    'description': 'Description',
    'subject_id': 'Subject ID',
    'subject_name': 'Subject Name',
    'properties': 'Properties',
    'created_at': 'Created Date',
    'updated_at': 'Updated Date',
    'event': 'Event',
    'causer_name': 'Performed By',
    'subject_type': 'Subject Type',
  };

  const formatProperties = (properties) => {
    if (!properties) return '';

    const flattenedProperties = [];

    if (properties.attributes) {
      Object.entries(properties.attributes).forEach(([key, value]) => {
        flattenedProperties.push(`${key}: ${value}`);
      });
    }

    if (properties.old) {
      Object.entries(properties.old).forEach(([key, value]) => {
        flattenedProperties.push(`old.${key}: ${value}`);
      });
    }

    return flattenedProperties.join('\n');
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm:ss');
  };

  const exportData = logs.data.map(log => {
    const formattedLog = {};

    fieldsToInclude.forEach(field => {
      if (field === 'properties' && log.properties) {
        formattedLog[field] = formatProperties(log.properties);
      } else if (field === 'created_at' || field === 'updated_at') {
        formattedLog[field] = log[field] ? formatDate(log[field]) : '';
      } else {
        formattedLog[field] = log[field] !== undefined ? log[field] : '';
      }
    });

    return formattedLog;
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData, { header: fieldsToInclude });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Activity Logs");

  // Set custom title labels
  const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
  for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
    const cell = worksheet[cellAddress];
    if (cell && cell.v) {
      cell.v = titleMapping[cell.v] || cell.v;
    }
  }

  const calculateColumnWidths = (data, headers) => {
    const widths = headers.map(header => header.length);

    data.forEach(row => {
      Object.keys(row).forEach((key, index) => {
        const lines = String(row[key]).split('\n');
        const maxLength = Math.max(...lines.map(line => line.length));
        widths[index] = Math.max(widths[index], maxLength);
      });
    });

    worksheet['!cols'] = widths.map(length => ({ wch: length + 2 }));
  };

  calculateColumnWidths(exportData, fieldsToInclude);

  //filename 
  // const filename = prompt("Enter the filename:", "Activity_Logs.xlsx") || "Activity_Logs.xlsx";
  //
  if (exportData.length > 0) {
    XLSX.writeFile(workbook,"Activity_Logs.xlsx"); // "Activity_Logs.xlsx"
  } else {
    console.error("No data to export.");
  }
};

  
  
  const customLabelKey = {
    'client.name': 'client name',
    'deliver.dr_no': 'dr no',
    'user.name': 'created by',
    'updatedBy.name': 'updated by',
    'stockrequest.rs_no': 'rs_no',
    'category.sku_prefix (old)' : 'sku prefix',
    'category.sku_prefix' : 'sku prefix'
  };


  const formatAttributes = (attributes, oldAttributes) => {
    const currentAttributes = Object.entries(attributes).map(([key, value]) => {
      const displayKey = customLabelKey[key] || key;
      return (
        <span
          key={key}
          className="inline-block px-2 py-1 mr-2 mb-2 text-xs font-semibold text-white bg-main/60 rounded"
        >
          <strong>{displayKey}:</strong> {key === 'id' ? Number(value) : String(value)}
        </span>
      );
    });

    const oldAttrs = oldAttributes ? Object.entries(oldAttributes).map(([key, value]) => {
      const displayKey = customLabelKey[key] || key;
      return (
        <span
          key={key}
          className="inline-block px-2 py-1 mr-2 mb-2 text-xs font-semibold text-gray-500  bg-main/20 rounded"
        >
          <strong>{displayKey} (old):</strong> {key === 'id' ? Number(value) : String(value)}
        </span>
      );
    }) : null;

    return (
      <>
        {currentAttributes}
        {oldAttrs}
      </>
    );
  };

  //subject name and label
    const labelMapping = {
      receiving: { label: 'MRR No', key: 'mrr_no' },
      deliverable: { label: 'DR No', key: 'dr_no' },
      stockrequisition: { label: 'RS No', key: 'rs_no' },
      sritem: { label: 'SR Item', key: 'sr_item' },
      // stockrequisition: { label: 'RS No', key: 'rs_no' },
  };

  const defaultLabel = { label: 'Name', key: 'name' };

  const getSubjectLabel = (log) => {
      const mapping = labelMapping[log.log_name] || defaultLabel;
      return `  ${mapping.label}: ${log.subject_name} - ID: ${log.subject_id}`;
  };

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <div className="flex justify-between items-center">
      <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">Activity Logs</h2>
      
    </div>
      
  }
    >
      {/* head displayed together with the appname */}
       <Head title="Activity Logs" />
      <div className="py-5">
          <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 relative">
         
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              
              <div className="flex justify-end relative px-6 pt-6">
              
              <div className="absolute left-6">
                  <button onClick={exportToExcel}
                   className="flex flex-nowrap gap-2 font-semibold bg-blue-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-blue-700"
                   >Export to Excel</button>
                </div>
              <div className="flex flex-row items-center relative mr-4">
                      <div className="absolute pointer-events-none right-2">
                          <svg
                              fill="none"
                              height="24"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" x2="16.65" y1="21" y2="16.65" />
                          </svg>
                      </div>
                      <TextInput
                          className="w-[300px]"
                          defaultValue={queryParams.causer_name}
                          placeholder="Search Causer Here"
                          onBlur={(e) => searchFieldChanged("causer_name", e.target.value)}
                          onKeyPress={(e) => onKeyPress("causer_name", e)}
                      />
                </div>

                <div className="flex flex-row items-center relative ">
                    <div className="absolute pointer-events-none right-2">
                        <svg
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" x2="16.65" y1="21" y2="16.65" />
                        </svg>
                    </div>
                    <TextInput
                        className="w-[500px]"
                        defaultValue={queryParams.log_name}
                        placeholder="Search Logs Here"
                        onBlur={(e) => searchFieldChanged("log_name", e.target.value)}
                        onKeyPress={(e) => onKeyPress("log_name", e)}
                    />
                </div>
              
              </div>

                  <div className="px-6 text-gray-900 dark:text-gray-100">
                      <div className="overflow-auto">
                        <div className="w-full flex flex-row justify-between items-center mb-2">
                          <div className="flex flex-row items-center relative gap-2">
                           
                          <div className="absolute pointer-events-none right-2"><svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                          </div>
                         
                          </div>
                        </div>
                        <div>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className="">
                              <TableHeading  className=""  
                              >ID</TableHeading>
                              <TableHeading  className="" 
                              >Log Name </TableHeading>
                                <TableHeading  className=""  
                              >Description</TableHeading>
                              
                                <TableHeading className="" 
                              >Subject</TableHeading>
                                <TableHeading  className=""  
                              >Properties</TableHeading>
                              {/* <TableHeading  className=""  
                              >Pivot Tables</TableHeading> */}
                                <TableHeading  className=""  
                              >Action By</TableHeading>
                              <TableHeading className=""  
                              >Created Date</TableHeading>
                               
                              </tr>
                            </thead>
                                <tbody>
                                    {logs.data.map((log, index)=>(
                                         <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/20'} border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700`} key={log.id}>
                                            <td  className="w-[50px] py-2 ">{log.id}</td>
                                            <td className="px-3 py-4 whitespace-nowrap ">{log.log_name}</td>
                                            <td className="w-[200px] py-2 ">{log.description}</td>
                                            {/* <td className="px-6 py-4 whitespace-nowrap ">{log.subject_id}</td> */}
                                            {/* <td className="px-1 py-2 whitespace-nowrap">ID: {log.subject_id} - {log.subject_name} </td> */}
                                           <td className="px-3 py-2 whitespace-nowrap">
                                                  {getSubjectLabel(log)}
                                          </td>
                                          {/* <td className="px-6 py-4">
                                            {log.properties.attributes ? (
                                              formatAttributes(log.properties.attributes, log.properties.old)
                                            ) : (
                                              'No attributes found'
                                            )}
                                          </td> */}
                                           <td className="px-2 py-2 ">
                                                {log.event === 'created' || log.event === 'restored' ? (
                                                  log.properties.attributes ? (
                                                    formatAttributes(log.properties.attributes, {})
                                                  ) : (
                                                    'No attributes found'
                                                  )
                                                ) : log.event === 'updated' ? (
                                                  formatAttributes(log.properties.attributes, log.properties.old)
                                                ) : log.event === 'deleted' ? (
                                                  formatAttributes({}, log.properties.old)
                                                ) : (
                                                  'No attributes found'
                                                )}
                                              </td>
                                            <td className="px-3 py-2 whitespace-nowrap">{log.causer_name}</td>
                                            <td className="px-3 py-2 ">{new Date(log.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                      </div> 
                 </div>
                 {/* pagination not visible */}
                 {/* <Pagination links={logs.meta.links} />
                  */}
                   {logs.meta && logs.meta.links && <Pagination links={logs.meta.links} />}
              </div>
          </div>
      </div>
    </AuthenticatedLayout>
  )
}
