
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head} from "@inertiajs/react" ;
export default function Index({logs, auth}) {
  console.log("LOGS", logs)

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
                  <div className="p-6 text-gray-900 dark:text-gray-100">
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
                              >Subject ID</TableHeading>
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
                                            <td className="px-6 py-4 whitespace-nowrap ">{log.log_name}</td>
                                            <td className="w-[200px] py-2 ">{log.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap ">{log.subject_id}</td>
                                          {/* <td className="px-6 py-4">
                                            {log.properties.attributes ? (
                                              formatAttributes(log.properties.attributes, log.properties.old)
                                            ) : (
                                              'No attributes found'
                                            )}
                                          </td> */}
                                           <td className="px-6 py-4">
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
                                            <td className="w-[105px] py-2">{log.causer_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap ">{new Date(log.created_at).toLocaleString()}</td>
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
