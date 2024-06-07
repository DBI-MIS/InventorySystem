import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, totalName, formattedTotalQuantity, totalCategory, totalClient, totalDeliverable, totalReceiving, totalDeliverableDelivered }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-4xl text-blue-600 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="px-12 w-full mx-auto grid grid-cols-6 gap-2 text-center">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className='text-slate-700 font-light text-md'>
                               No. of Items
                            </h3>
                            <p className='mr-2 text-6xl'>{ totalName ?? "No Data"}</p>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                Total Item Quantity
                            </h3>
                            <span className='mr-2 text-6xl'>{ formattedTotalQuantity ?? "No Data" }</span>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                No. of Categories
                            </h3>
                            <span className='mr-2 text-6xl'>{ totalCategory ?? "No Data" }</span>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                No. of Clients
                            </h3>
                            <span className='mr-2 text-6xl'>{ totalClient ?? "No Data" }</span>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                No. of DR
                            </h3>
                            <span className='mr-2 text-6xl'>{ totalDeliverableDelivered ?? "0" }</span>
                            <span className='mr-2 text-6xl'>/{ totalDeliverable ?? "No Data" }</span>
                            
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-slate-700 font-light text-md'>
                                No. of MRR
                            </h3>
                            <span className='mr-2 text-6xl'>{ totalReceiving ?? "No Data" }</span>
                            
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
