import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Alert } from "@material-tailwind/react";

export default function Index({ auth }) {
    return(
        <Authenticated
        user={auth.user}
        header={
          <div className="flex justify-between categories-center relative">
            <h2 className="font-semibold text-2xl text-blue-600 dark:text-gray-200 leading-tight">Deliverables</h2>
          </div>
      }
        >

            <Head title="StockRequisition" />

    <div className="py-12">
        <div className="max-w-5/6 mx-auto sm:px-6 lg:px-8 ">
        {/* <div className="max-w-5/6">
              {success && (
                  <Alert
                  className=" absolute z-50 w-11/12 px-4 py-4 mb-5 rounded text-slate-800 bg-green-100 ring-2 ring-green-800"
                  open={open}
                  onClose={() => setOpen(false)}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                  }}
                > {success}</Alert>
              )}
            </div> */}
        
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">

                    <div className="overflow-auto">
                    
                    
                    </div>

                </div>

            </div>
        
        </div>
        
    </div>

        </Authenticated>
    )
}