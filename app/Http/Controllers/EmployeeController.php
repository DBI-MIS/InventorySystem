<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Gate::allows('viewAny', Employee::class)) { 
            abort(403, 'You are not authorized to view employees.');
        }
        $query = Employee::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("name")) . "%"]);
        }
        $employees = $query->orderBy($sortField, $sortDirection)
        ->paginate(12);

        return inertia("Employee/Index", [
            "employees" => EmployeeResource::collection($employees),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("Employee/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        $data['user_id'] = Auth::id();
        Employee::create($data);
        return to_route('employee.index')->with('success', 'Employee was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
          return inertia('Employee/Edit',[
              'employee' => new EmployeeResource($employee),
           ]);
    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $data = $request->validated();
       $employee->update($data);

       return to_route('employee.index')
       ->with('success', "Employee \"$employee->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $name = $employee->name;
        $employee->delete();
       
        return to_route('employee.index')->with('success', "Employee \" $name \" was deleted!");
    }
}
