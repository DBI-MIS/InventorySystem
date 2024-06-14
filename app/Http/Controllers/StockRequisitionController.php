<?php

namespace App\Http\Controllers;

use App\Models\StockRequisition;
use App\Http\Requests\StoreStockRequisitionRequest;
use App\Http\Requests\UpdateStockRequisitionRequest;
use App\Http\Resources\StockRequisitionResource;
use App\Models\Item;

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
        $data = $request->validated();
        StockRequisition::create($data);

        return to_route('stockrequisition.index')->with('success', 'Stock Requisition was created');

    }

    /**
     * Display the specified resource.
     */
    public function show(StockRequisition $stockrequisition)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StockRequisition $stockrequisition)
    {
        // dd($stockrequisition);
        return inertia('StockRequisition/Edit', [
            'stockrequisition' => new StockRequisitionResource($stockrequisition)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequisitionRequest $request, StockRequisition $stockrequisition)
    {
        // dd($stockrequisition);
        $data = $request->validated();
        $stockrequisition->update($data);

        return to_route('stockrequisition.index')->with('success', "StockRequest was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StockRequisition $stockrequisition)
    {
        // dd($stockrequisition);
        $rsno = $stockrequisition->rs_no;
        $stockrequisition->delete();

        return to_route('stockrequisition.index')->with('success', "Stock Requisition no.\"$rsno\" was deleted");
    }
}
