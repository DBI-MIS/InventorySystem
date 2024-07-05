<?php

namespace App\Http\Controllers;

use App\Http\Requests\MarkAsDoneRequest;
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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class DeliverablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(MarkAsDoneRequest $request)
    {
        if (! Gate::allows('viewAny', Deliverables::class)) { 
            abort(403, 'You are not authorized to view.');
        }
        $query = Deliverables::query() ;
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("dr_no")) {
            $query->where("dr_no", "like", "%" . request("dr_no") . "%");
        }

       
        if($request->is_done == true){
            
        }
        //query is done
        // if($done == true){
            //method ng replicate
            // $status equivalent sa processed
        // }
        
        $deliverabless =  $query->orderBy($sortField, $sortDirection)
        ->paginate(20)
        ->onEachSide(1);

    return inertia("Deliverables/Index",[
        "deliverables" => DeliverablesResource::collection($deliverabless),
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

        $subquery = DB::table('items')
        ->select(DB::raw('MAX(id) as id'))
        ->groupBy('name');

        $deliverablesss = Item::select('items.*')
        ->joinSub($subquery, 'latest_items', function ($join) {
            $join->on('items.id', '=', 'latest_items.id');
        })
        ->get();
        // $deliverablesss = Item::query()->orderBy('name', 'asc')->get();
      
        // $clients = Client::query()->orderBy('name', 'asc')->get();
        $clients = Client::select('id', 'name', 'address')->distinct()->orderBy('name', 'asc')->get();
        $stockrequests = StockRequisition::query()->orderBy('rs_no', 'asc')->get();
        // dd($stockrequisitions);
        return inertia("Deliverables/Create", [
            "deliverables" => ItemResource::collection($deliverablesss),
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

    $data['user_id'] = Auth::id();

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
            'deliverables_items' =>  $deliverable->itemsDeliverables, //Load relationship
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deliverables $deliverable)
    {

        $items = Item::query()->orderBy('name', 'asc')->get();
        // dd($items);
            $itemResults = [];

            // Check if each item has an integer ID
            foreach ($items as $item) {
                $itemId = $item->getKey(); 

                if (is_int($itemId)) {
                    //  integer
                    $itemResults[] = [
                        'item' => $item,
                        'message' => 'Item ID is an integer.'
                    ];
                } else {
                    //  not an integer
                    $itemResults[] = [
                        'item' => $item,
                        'message' => 'Item ID is not an integer.'
                    ];
                }
            }
        $clients = Client::query()->orderBy('name', 'asc')->get();
        $stockrequests = StockRequisition::query()->orderBy('rs_no', 'asc')->get();

        $deliverable->load('client', 'stockrequest', 'itemsDeliverables');
        // dd($deliverable->itemsDeliverables);

        //  foreach ($items as $item) {
        // if ($item->quantity == $item->qty_out) {
        //     unset($item->id);
        // }
        // }

         return Inertia('Deliverables/Edit', [
        'deliverables' => $deliverable,
        'items' => ItemResource::collection($items),
        'itemResults' => $itemResults,
        'clients' => ClientResource::collection($clients), 
        'stockrequests' => StockRequisitionResource::collection($stockrequests),
        'item_deliverables' => $deliverable->itemsDeliverables,
    ]);




    }


    /**
     * Update the specified resource in storage.
     */
    // protected $list_item_id = [];

    public function update(UpdateDeliverablesRequest $request, Deliverables $deliverable)
    {

        $data = $request->validated(); 
       

        $allItemsDone = true;
        foreach ($data['items'] as $item) {
            if (!$item['is_done']) {
                $allItemsDone = false;
                break;
            }
        };


        if (!$deliverable->is_done || !$allItemsDone) {
            $deliverable->update($data);

            $items = $data['items'];
    
            $data['user_id'] = Auth::id();
    
                foreach ($items as $item) {
                    if ($item['qty_out'] > $item['quantity']) {
                        return redirect()->back()->withInput()->withErrors(['items' => 'Quantity cannot exceed available amount.']);
                    }
                }
                
                foreach ($items as $item) {
                    $itemModel = Item::find($item['id']);
                    if ($itemModel) {
                        $itemModel->qty_out = $item['qty_out'];
                        $itemModel->save();
                    }
                }
            
                // Sync the items with the deliverable (if needed)
                $itemIds = collect($items)->pluck('id')->map(function ($id) {
                    return (int) $id;
                })->toArray();
            
                $deliverable->itemsDeliverables()->sync($itemIds);
                
             return Redirect::route('deliverables.index')
            ->with('success', "Deliverables \"{$deliverable->dr_no}\" was updated successfully");
        }
        else{

            return redirect()->route('deliverables.index')->with('success', "Error: You cannot update DR \"{$deliverable->dr_no}\" already been processed.");
          
        }
        
      
        
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

    // UpdateDoneRequest $request,
    
    public function updateDone(Item $item, int $id) {
        $deliverable = Deliverables::find($id);
    
        if ($deliverable) {
           
            $hasProcessedItems = $deliverable->itemsDeliverables()->where('is_done', true)->exists();
    
            if ($hasProcessedItems) {  //check if theres item that has processed status if true throw error message.
                
                return back()->with('success', 'Warning: Some selectecd Items have already been processed. Kindly remove the items  or delete the DR.');
            } else { 
                // if all items are pending we can push through to process DR and replication of items
               
                $deliverable->is_done = true; // Set deliverable as done
                $deliverable->save();
    
               
                foreach ($deliverable->itemsDeliverables as $item) {
                  
                    $quantity = (int) $item->quantity;
                    $qty_out = (int) $item->qty_out;
                    $diff = max(0, $quantity - $qty_out);
    
                    if ($diff > 0) {
                        $newItem = $item->replicate();
                        $newItem->quantity = $diff;
                        $newItem->qty_out = 0;
                        $newItem->is_done = false; // Set as available
                        $newItem->remark = 'Split from item ' . $item->id;
                        $newItem->save();
                    }
    
                  
                    $item->quantity = $qty_out; 
                    $item->is_done = true; 
                    $item->save();
                }
    
              
                return back()->with('success', "DR \"{$deliverable->dr_no}\" marked as Processed and items updated.");
            }
        }
    
       
        return back()->with('success', "Error: DR \"{$deliverable->id}\" not found.");
    }
    
   
}
