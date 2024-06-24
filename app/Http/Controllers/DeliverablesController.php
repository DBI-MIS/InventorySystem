<?php

namespace App\Http\Controllers;

use App\Models\Deliverables;
use App\Http\Requests\StoreDeliverablesRequest;
use App\Http\Requests\UpdateDeliverablesRequest;
use App\Http\Requests\UpsertItemRequest;
use App\Http\Resources\ClientResource;
use App\Http\Resources\DeliverablesResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\StockRequisitionResource;
use App\Models\Client;
use App\Models\Item;
use App\Models\Receiving;
use App\Models\StockRequisition;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DeliverablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Deliverables::query() ;
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("dr_no")) {
            $query->where("dr_no", "like", "%" . request("dr_no") . "%");
        }

        $deliverablePivot = Item::query()->with('deliverable_items')->get();

        $stockrequisition = 
    
        // dd( $deliverabless);
        
        // dd( $item_ids );
        
        // dd($deliverableListItems);
        // $existingItems =  $deliverableListItem->items;
        // foreach ($deliverabless as $deliverable) {
                   
        //             foreach ($deliverable->list_item_id as $item) {
                           
               
        //         // echo "Created At: " . $item->deliverable_items->created_at . "\n";
        //         // echo "Updated At: " . $item->pivot->updated_at . "\n";
        //     }}
            // dd($deliverable);
        

        
 

        $deliverabless =  $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);
// dd($query);
    return inertia("Deliverables/Index",[
        "deliverabless" => DeliverablesResource::collection($deliverabless),
        'queryParams' => request()->query() ?: null,
        'success' => session('success'),

    ] );

    // Pass the users data to the view
    // return inertia('Deliverables/index', compact('deliverables'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $deliverablesss = Item::query()->orderBy('name', 'asc')->get();
        // $clients = Client::query()->orderBy('name', 'asc')->get();
        $clients = Client::select('id', 'name', 'address')->distinct()->orderBy('name', 'asc')->get();
        $stockrequests = StockRequisition::query()->orderBy('rs_no', 'asc')->get();
        // dd($stockrequisitions);
        return inertia("Deliverables/Create", [
            "deliverablesss" => ItemResource::collection($deliverablesss),
            "clients" => ClientResource::collection($clients),
            "stockrequests" => StockRequisitionResource::collection($stockrequests)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreDeliverablesRequest $request)
{
    $data = $request->validated();
    $items = $data['items'];
    // dd($data);
   
    foreach ($items as $item) {
        if ($item['qty_out'] > $item['quantity']) {
            return redirect()->back()->withInput()->withErrors(['items' => 'Quantity cannot exceed available amount.']);
        }
    }

    $deliverable = Deliverables::create($data);
    
    $itemIds = array_map(function ($item) {
        return (int) $item['id'];
    }, $items);
    
    $deliverable->itemsDeliverables()->attach($itemIds);

    return redirect()->route('deliverables.index')->with('success', "Deliverables added successfully");
}

    /**
     * Display the specified resource.
     */
    public function show(Deliverables $deliverable)
    {
        $deliverable->load('itemsDeliverables'); //Load relationship
    
        return inertia('Deliverables/Show', [
            'deliverable' => new DeliverablesResource($deliverable),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'deliverables_items' =>  $deliverable->itemsDeliverables, //Load relationship
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deliverables $deliverable)
    {
        // dd($deliverable);
        $itemss = Item::query()->orderBy('name', 'asc')->get();
        $clients = Client::query()->orderBy('name', 'asc')->get();
        $stockrequests = StockRequisition::query()->orderBy('rs_no', 'asc')->get();

        $parsedID = json_decode($deliverable, true);
        $id = $parsedID['id'];

        $deliverable = Deliverables::find($id);
        $existingItemss = $deliverable->itemsDeliverables;

        // dd($existingItemss);

        $existingItemsIds= $deliverable->itemsDeliverables()->pluck('items.id');
        // dd($existingItemsIds);

        $existingItemsIds = array_map('intval', $existingItemsIds->toArray());

        return inertia('Deliverables/Edit',[
            'itemss' => ItemResource::collection($itemss),
            'clients' => ClientResource::collection($clients),
            'stockrequests' => StockRequisitionResource::collection($stockrequests),
            'deliverable' => new DeliverablesResource($deliverable),
            'existingItemss' => $existingItemss,
            'existingItemsIds' => $existingItemsIds

        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    protected $list_item_id = [];

    public function update(UpdateDeliverablesRequest $request, Deliverables $deliverable)
    {
        $data = $request->validated();

        if(isset($data['list_item_id'])) {
            $itemss = $data['list_item_id'];
            $deliverable->update($data);
            $deliverable->itemsDeliverables()->sync($itemss);
        }

        return to_route('deliverables.index')
           ->with('success', "Deliverables \"{$deliverable->id}\" was updated ");
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deliverables $deliverable)
    {
        $id = $deliverable->id;
        $deliverable->delete();
        return to_route('deliverables.index')
       ->with('success', "Deliverables \"$id\" was deleted");
    }

    public function myDeliverable(Deliverables $deliverableId) {
        //  dd($deliverableId);
        $listItemIds = is_array($deliverableId->list_item_id) ? $deliverableId->list_item_id : [];
        $deliverable_items = collect(); // Initialize as an empty collection for validation 
        
        if (count($listItemIds) > 0) {
            // Fetch receiving items with relationships only if there are item ids
            $deliverable_items = Item::with(['brand', 'category', 'employee', 'location'])
                ->whereIn('id', $listItemIds)
                ->get();
        }

        return inertia("Deliverables/PrintDeliverables", [
            'deliverable' => new DeliverablesResource($deliverableId),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'deliverable_items' =>  $deliverable_items
            
        ]);
    }

   
}
