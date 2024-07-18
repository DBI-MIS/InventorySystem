<?php

namespace App\Http\Controllers;

use App\Models\Deliverables;
use App\Models\Item;
use App\Models\Receiving;
use App\Models\Sritem;
use App\Models\StockRequisition;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        

        $query = Activity::with('causer'); //  causer relationship
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("log_name")) { //search l0g name
            $query->whereRaw("LOWER(log_name) LIKE ?", ["%" . strtolower(request("log_name")) . "%"]);
        }
        if (request("causer_name")) { // causer name
            $query->whereHas('causer', function ($q) {
                $q->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("causer_name")) . "%"]);
            });
        }

        $logs = $query->orderBy($sortField, $sortDirection)->paginate(20);
    
           // Transformmmm the logs to include causer's name, subject name and roure
            $logs->getCollection()->transform(function ($log) {
                $log->causer_name = $log->causer ? $log->causer->name : 'Unknown';
                $log->route = $log->properties['route'] ?? 'Unknown';
                $log->subject_name = $this->getSubjectName($log);
                return $log;
            });
           
    
        // dd($logs);
        return inertia("Log/Index", [
            'logs' => $logs,
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),
             ]);
    }
    private function getSubjectName($log)
    {
        switch ($log->log_name) {
            case 'item':
                return Item::find($log->subject_id)->name ?? 'N/A';
            case 'receiving':
                return Receiving::find($log->subject_id)->mrr_no ?? 'N/A';
            case 'deliverable':
                return Deliverables::find($log->subject_id)->dr_no ?? 'N/A';
            case 'sritem':
                return Sritem::find($log->subject_id)->sr_item ?? 'N/A';
            // case 'stockrequisition':
            //     return StockRequisition::find($log->subject_id)->rs_no ?? 'N/A';
            case 'stockrequisition':
                $stockRequest = StockRequisition::find($log->subject_id);
                if ($stockRequest) { //if true
                    return $stockRequest->rs_no ?? ($stockRequest->sr_to ??  'No information');
                }
                return 'No info'; //false
            default:
                return $log->subject_type::find($log->subject_id)->name ?? 'N/A';
        }
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
