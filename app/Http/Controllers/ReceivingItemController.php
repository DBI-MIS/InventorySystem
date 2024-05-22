<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\StoreReceivingItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\ReceivingItemResource;
use App\Http\Resources\ReceivingResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Employee;
use App\Models\Location;
use App\Models\Receiving;
use App\Models\ReceivingItem;

class ReceivingItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $reference_nos= ReceivingItem::select('item_id')->where('reference_no', 'mrr05');
        // $reference_nos= ReceivingItem::where('reference_no', 'mrr05')->pluck('item_id', 'ref_id')->all();
        // foreach ($receiving_items as  $receiving_item) {
        //     return $receiving_item;
        // }
        $reference_no = ReceivingItem::where('reference_no', 'mrr05')->get()
        ->pluck('item_id')
        ->flatten()
        ->filter()
        ->values()
        ->all();
        $query = ReceivingItem::query() ;
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        
        $receivingItems = $query->orderBy($sortField, $sortDirection)
        ->paginate(10);
        // $receiving_items= ReceivingItem::all();
        $item_no = ReceivingItem::where('reference_no', 'may13')->pluck('item_id');
        // $receiving_item_ids = Item::find('id',$item_id);
        $receiving_item_ids = Item::find($item_no)
            ->all();
        // dd($receiving_item_ids);
        // // dd($receivingItems);
        // dd($item_id);

        return inertia("ReceivingItem/Index", [
            "receivingItems" => ReceivingItemResource::collection($receivingItems),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),
           'reference_nos' => $reference_no,
           'receiving_item_ids'=> $receiving_item_ids
             ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
       $items = Item::query()->orderBy('name', 'asc')->get();
       $brands = Brand::query()->orderBy('name', 'asc')->get();
       $categories = Category::query()->orderBy('name', 'asc')->get();
       $employees = Employee::query()->orderBy('name', 'asc')->get();
       $locations = Location::query()->orderBy('name', 'asc')->get();
       $receivings = Receiving::query()->orderBy('id','asc')->get();

      return Inertia("ReceivingItem/Create",[
          'items' => ItemResource::collection($items),
          'brands' => BrandResource::collection($brands),
          'categories' =>  CategoryResource::collection($categories),
          'employees' =>  EmployeeResource::collection($employees),
          'locations' =>  LocationResource::collection($locations),
          'receivings' => ReceivingResource::collection($receivings),  
      ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store( StoreReceivingItemRequest $request)
    {

        // ReceivingItem::create(['item_id' => $data]); 
        //   $id = $request->validated();
        // //   $data = json_encode($id);
       
        //   $data = array_map('intval', json_decode($id, true));
        //   dd($data);

          
    // $data = json_decode($request->input('item_id'), true); // Decode JSON string into an array
   

    $data = $request->validated();
    ReceivingItem::create($data);
    
     
       return to_route('receivingItem.index')->with('success', 'Selecting Receiving Items successful!');
    }

    /**
     * Display the specified resource.
     */
    public function show( ReceivingItem $receivingItem, Item $item)
    {
            // JSON string  ==> PHP associative array
            $parsedId = json_decode($receivingItem, true);

            // Access the value of the 'id' key
            $id = $parsedId['id'];
            
        $item_no = ReceivingItem::where('id', $id)->pluck('item_id');
        $receiving_item_ids = Item::find($item_no)
            ->all();
        return inertia('ReceivingItem/Show', [
            'receivingItem' => new ReceivingItemResource($receivingItem),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            // getting all the items under the specific mrr
            'receiving_item_ids'=> $receiving_item_ids
            
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
    }
    public function storeItem(StoreItemRequest $request)
    {
        $data = $request->validated();
        Item::create($data);
           return to_route('receivingItem.index')->with('success', 'Selecting Receiving Items successful!');
    }
}
