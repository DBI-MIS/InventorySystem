<?php

namespace App\Http\Controllers;

use App\Models\StockRequisition;
use App\Http\Requests\StoreStockRequisitionRequest;
use App\Http\Requests\UpdateStockRequisitionRequest;
use App\Http\Resources\StockRequisitionResource;
use App\Models\Item;
use App\Models\Sritem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class StockRequisitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = StockRequisition::query();
        // dd($query);

        $sortFields = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        // if(request("rs_no")) {
        //     $query->where("rs_no", "like", "%" . request("rs_no") . "%");
        // }

        // $stockrequisitionPivot = Item::query()->with('stockrequest_items')->get();  

        $stockrequest = $query->orderBy($sortFields, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

        

        return inertia("StockRequisition/Index", [
            "stockrequest" => StockRequisitionResource::collection($stockrequest),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("StockRequisition/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockRequisitionRequest $request)
    {
        // $data = $request->validated();
        // $data['user_id'] = Auth::id();
        //     StockRequisition::create($data);
        
        // // StockRequisition::create($data);

        // // return to_route('stockrequisition.index')->with('success', 'Stock Requisition was created');
        // return redirect()->route('stockrequisition.index')->with('success', 'Stock Requisition was created');
        
        $validated = $request->validate([
            'sr_to' => 'required|string|max:255',
            'rs_no' => 'required|string|max:255',
            'sr_date' => 'required|date',
            'sr_notes' => 'nullable|string',
            'items' => 'required|array',
            'items.*.sr_item' => 'required|string',
            'items.*.sr_qty' => 'required|integer',
            'items.*.sr_unit' => 'required|string',
            'items.*.sr_description' => 'required|string',
        ]);

        // $validated['user_id'] = Auth::id();

        $requisition = StockRequisition::create([
            'sr_to' => $validated['sr_to'],
            'rs_no' => $validated['rs_no'],
            'sr_date' => $validated['sr_date'],
            'sr_notes' => $validated['sr_notes'],
            'user_id' => $request->user()->id,
        ]);

        foreach ($validated['items'] as $item) {
            $sritem = Sritem::create([
                'item' => $item['sr_item'],
                'qty' => $item['sr_qty'],
                'uom' => $item['sr_unit'],
                'description' => $item['sr_description'],
            ]);
            $requisition->sritems()->attach($sritem->id);
        }

        return redirect()->route('stockrequisition.index')->with('success', 'Stock Requisition created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(StockRequisition $stockrequisition)
    {
        
        return inertia('StockRequisition/Show', [
            'stockrequisition' => new StockRequisitionResource($stockrequisition),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StockRequisition $stockrequisition)
    {
        // $response = Gate::authorize('update', $stockrequisition);

        // if ($response->allowed()) {
        //     // dd($stockrequisition);
        //     return inertia('StockRequisition/Edit', [
        //         'stockrequisition' => new StockRequisitionResource($stockrequisition)
        //     ]);
        // }else{
        //     return abort(403,$response->message());
        // }
        $response = Gate::authorize('update', $stockrequisition);

    if ($response->allowed()) {
        return inertia('StockRequisition/Edit', [
            'stockrequisition' => new StockRequisitionResource($stockrequisition->load('sritems'))
        ]);
    } else {
        return abort(403, $response->message());
    }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequisitionRequest $request, StockRequisition $stockrequisition)
    {
        // dd($stockrequisition);
        // $data = $request->validated();
        // $stockrequisition->update($data);

        // return to_route('stockrequisition.index')->with('success', "StockRequest was updated");
        $validated = $request->validated();

    // Update StockRequisition
    $stockrequisition->update([
        'sr_to' => $validated['sr_to'],
        'rs_no' => $validated['rs_no'],
        'sr_date' => $validated['sr_date'],
        'sr_notes' => $validated['sr_notes'],
    ]);

    // Sync Sritems
    $sritemIds = [];
    foreach ($validated['items'] as $item) {
        $sritem = Sritem::updateOrCreate(
            ['id' => $item['id'] ?? null], // Use id if exists
            [
                'sr_item' => $item['sr_item'],
                'sr_qty' => $item['sr_qty'],
                'sr_unit' => $item['sr_unit'],
                'sr_description' => $item['sr_description'],
            ]
        );
        $sritemIds[] = $sritem->id;
    }
    
    // Sync the sritems with the stockrequisition
    $stockrequisition->sritems()->sync($sritemIds);

    return redirect()->route('stockrequisition.index')->with('success', "Stock Request was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StockRequisition $stockrequisition)
    {
        $response = Gate::authorize('delete', $stockrequisition);

            if ($response->allowed()) {
            // dd($stockrequisition);
            $rsno = $stockrequisition->rs_no;
            $stockrequisition->delete();

            return to_route('stockrequisition.index')->with('success', "Stock Requisition no.\"$rsno\" was deleted");
        }
        else{
            return abort(403, $response->message());
        }
    }

    public function myStockRequest(StockRequisition $stockrequestId)
    {
        return inertia("StockRequisition/PrintStockRequest", [
            'stockrequest' => new StockRequisitionResource($stockrequestId),
            'queryParams' => request()->query() ?: null,
        ]);
    }
}
