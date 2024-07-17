<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        

        $query = Activity::with('causer'); // Ensure the causer relationship is loaded
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
    
        $logs = $query->orderBy($sortField, $sortDirection)->paginate(10);
    
           // Transform the logs to include causer's name and route
            $logs->getCollection()->transform(function ($log) {
                $log->causer_name = $log->causer ? $log->causer->name : 'Unknown';
                $log->route = $log->properties['route'] ?? 'Unknown';
                return $log;
            });

    
        // dd($logs);
        return inertia("Log/Index", [
            'logs' => $logs,
            'success' => session('success'),
             ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
