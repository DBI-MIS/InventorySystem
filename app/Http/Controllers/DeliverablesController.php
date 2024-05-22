<?php

namespace App\Http\Controllers;

use App\Http\Resources\DeliverablesResource;
use App\Http\Resources\ItemResource;
use App\Models\Deliverables;
use App\Models\Item;
use Illuminate\Http\Request;

class DeliverablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $query = Item::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%". request("name") ."%");
        }

        $items= $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

        return inertia("Deliverables/Index",[
            
            "items" => ItemResource::collection($items),
            'queryParams' => request()->query() ?: null,

        ] );
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
    public function show(Deliverables $deliverables)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deliverables $deliverables)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Deliverables $deliverables)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deliverables $deliverables)
    {
        //
    }
}
