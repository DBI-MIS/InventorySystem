<?php

namespace App\Http\Controllers;

use App\Models\Deliverables;
use App\Http\Requests\StoreDeliverablesRequest;
use App\Http\Requests\UpdateDeliverablesRequest;
use App\Http\Resources\DeliverablesResource;
use App\Models\Item;
use App\Models\Receiving;
use Inertia\Inertia;

class DeliverablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Deliverables::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%". request("name") ."%");
        }

        $deliverabless= $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

        return inertia("Deliverables/Index",[
            
            "deliverabless" => DeliverablesResource::collection($deliverabless),
            'queryParams' => request()->query() ?: null,

        ] );

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $items = Item::all(); // Assuming you have an Item model
    $receivings = Receiving::all(); // Assuming you have a Detail model

    return Inertia::render("Deliverables/Create", [
        'items' => $items,
        'receivings' => $receivings,
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeliverablesRequest $request)
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
    public function update(UpdateDeliverablesRequest $request, Deliverables $deliverables)
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
