<?php

namespace App\Http\Controllers;

use App\Models\Deliverables;
use App\Http\Requests\StoreDeliverablesRequest;
use App\Http\Requests\UpdateDeliverablesRequest;
use App\Http\Resources\DeliverablesResource;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Models\Receiving;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DeliverablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $deliverable = Deliverables::query()->where('list_item_id')->get()->dd();

        // $receiving_items = Item::with(['brand', 'category', 'employee', 'location'])
        // ->whereIn('id', $deliverable)
        // ->get();
        
        $deliverables = Deliverables::all();

        // Loop through each user to retrieve pivot data
        foreach ($deliverables as $deliverable) {
            // Retrieve pivot data using raw SQL query
            $pivotData = DB::table('deliverable_item')
                            ->where('deliverables_id', $deliverable->id)
                            ->join('items', 'deliverable_item.item_id', '=', 'items.id')
                            ->select('deliverable_item.*', 'items.name as deliverable_item')
                            ->get();
    
            // Attach the pivot data to the user object
            $deliverable->pivotData = $pivotData;

        // $query = Deliverables::query();
        // $sortField = request("sort_field", 'created_at');
        // $sortDirection = request("sort_direction", "asc");

        // if (request("name")) {
        //     $query->where("name", "like", "%". request("name") ."%");
        // }

        

        // $deliverabless= $query->orderBy($sortField, $sortDirection)
        // ->paginate(10)
        // ->onEachSide(1);

        // return inertia("Deliverables/Index",[
            
        //     "deliverabless" => DeliverablesResource::collection($deliverabless),
        //     'queryParams' => request()->query() ?: null,

        // ] );
    }

    // Pass the users data to the view
    return inertia('Deliverables/index', compact('deliverables'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $items = Item::query()->orderBy('name', 'asc')->get();

        return inertia("Deliverables/Create", [
            "items" => ItemResource::collection($items)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeliverablesRequest $request)
    {
        $data = $request->validated();
        $items = $data['list_item_id'];
        $deliverable=Deliverables::create($data);
        $deliverable->itemsDeliverables()->attach($items);


         

        return redirect()->route('deliverables.index');
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
