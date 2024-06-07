<?php

namespace App\Http\Controllers;

use App\Models\StockRequisition;
use App\Http\Requests\StoreStockRequisitionRequest;
use App\Http\Requests\UpdateStockRequisitionRequest;

class StockRequisitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = StockRequisition::query();

        $query->paginate(10);

        return inertia("StockRequisition/Index", [
            
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
    public function store(StoreStockRequisitionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StockRequisition $stockRequisition)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StockRequisition $stockRequisition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequisitionRequest $request, StockRequisition $stockRequisition)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StockRequisition $stockRequisition)
    {
        //
    }
}
