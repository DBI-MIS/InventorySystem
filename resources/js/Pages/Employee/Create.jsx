import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
export default function Create({auth}){
    // data will hold/contain the ff:
   const {data, setData, post,errors,reset} = useForm({
        name: '',
        company: '',
        department: '',
        remarks: '',
        user_id:''
    })

    const onSubmit = (e) =>{
        e.preventDefault();
        post(route("employee.store"));
    }
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center"  >
            <h2 className="font-semibold text-2xl text-blue-500 dark:text-gray-200 leading-tight">Create New Employee</h2>
          </div>
        }
        >
             <Head title="Categories" />
      <div className="py-12">
      <div className="w-5/6 mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={onSubmit}  
                        className="p-4 sm:p8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" >
                              <input type="text"
                                 id="item_user_id"
                                 name="user_id"
                                 defaultValue={data.user_id}
                                 hidden="true"
                                />
                               
                        <div className="mt-4">
                            <InputLabel htmlFor="employee_name" value="Employee Name"/>
                            <TextInput 
                            id="employee_name"
                            type="text"
                            name="name"
                            placeholder="Enter Employee Name"
                            value={data.name}
                            minLength={3}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="employee_company" value="Employee Company"/>
                            <TextInput 
                            id="employee_company"
                            placeholder="Enter Employee Company"
                            type="text"
                            name="company"
                            value={data.company}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData('company', e.target.value)}
                            />
                            <InputError message={errors.company} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="employee_department" value="Employee Department"/>
                            <TextInput 
                            id="employee_department"
                            placeholder="Enter Employee Department"
                            type="text"
                            name="department"
                            value={data.department}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData('department', e.target.value)}
                            />
                            <InputError message={errors.department} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="employee_remarks" value="Employee Remarks"/>
                            <TextAreaInput
                            id="employee_remarks"
                            name="remarks"
                            placeholder="Enter Remarks or Stattus of Employee "
                            value={data.remarks}
                            className="mt-1 block w-full"
                            rows="5"
                            isFocused={true}
                            onChange={e => setData('remarks', e.target.value)}
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