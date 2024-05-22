import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({auth, employee }){
   const {data, setData, post ,errors,reset} = useForm({
        name: employee.name || "",
        department: employee.department || "",
        remarks: employee.remarks || "",
        _method: "PUT", 
    });

    const onSubmit = (e) =>{
        // post function declared above
        e.preventDefault();
        post(route("employee.update",employee.id));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-white dark:text-gray-200 leading-tight">Edit employee {employee.name}</h2>
          </div>
        }
        >
             <Head title="Employees" />
      <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <form onSubmit={onSubmit} 
                    className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" action="">
                        <div className="mt-4">
                            <InputLabel htmlFor="employee_name" value="Employee Name"/>
                            <TextInput 
                            id="employee_name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="employee_department" value="Employee Department"/>
                            <TextAreaInput
                            id="employee_department"
                            name="department"
                            value={data.department}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData('department', e.target.value)}
                            />
                            <InputError message={errors.department} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="employee_remarks" value="Remarks"/>
                            <TextInput 
                            id="employee_remarks"
                            type="text"
                            name="remarks"
                            value={data.remarks}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData("remarks", e.target.value)}
                            />
                            <InputError message={errors.remarks} className="mt-2"/>
                        </div>
                        <div className="mt-4 text-right">
                            <Link href={route('employee.index')}
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
        </div>
        </AuthenticatedLayout>
    )
}