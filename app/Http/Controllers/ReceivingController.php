<?php

namespace App\Http\Controllers;

use App\Models\Receiving;
use App\Http\Requests\StoreReceivingRequest;
use App\Http\Requests\UpdateReceivingRequest;
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
use App\Models\Item;
use App\Models\Location;
use App\Models\ReceivingItem;

class ReceivingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         //
         $query = Receiving::query() ;
         $sortField = request("sort_field", 'created_at');
         $sortDirection = request("sort_direction", "desc");
         if (request("name")) {
             $query->where("name", "like", "%" . request("name") . "%");
         }
         if(request("uom")){
             $query->where("uom", request("uom"));
         }
         if(request("category_id")){
            $query->where('category_id', (request("category_id")));
         }
        
         $receivings = $query->orderBy($sortField, $sortDirection)
         ->paginate(10);
         
         return inertia("Receiving/Index", [
             "receivings" => ReceivingResource::collection($receivings),
             'queryParams' => request()-> query() ?: null,
             'success' => session('success'),
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
    //    $receivingItems = ReceivingItem::query()->orderBy('id','asc')->get();
       $mrrData = Item::select('mrr_no')->distinct()->get(); //get only unique values

         
// dd($mrr_nos);

      return Inertia("Receiving/Create",[
       'items' => ItemResource::collection($items),
          'brands' => BrandResource::collection($brands),
          'categories' =>  CategoryResource::collection($categories),
          'employees' =>  EmployeeResource::collection($employees),
          'locations' =>  LocationResource::collection($locations),
        //   'receivingItems' => ReceivingItemResource::collection($receivingItems),
          'mrrData' =>  $mrrData,
      ]);
    }
   
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReceivingRequest $request)
    {
        $data = $request->validated();
        Receiving::create($data);
        return redirect()->route('receiving.index') ->with('success', "Receiving added successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Receiving $receiving)
    {
            // JSON string  ==> PHP associative array
            $parsedId = json_decode($receiving, true);

            // Access the value of the 'id' key
            $id = $parsedId['id'];
            
        $item_no = Receiving::where('id', $id)->pluck('group_item_id');
        $receiving_item_ids = Item::find($item_no)
       
            ->all();
            // dd( $receiving_item_ids);
        return inertia('Receiving/Show', [
            'receiving' => new ReceivingResource($receiving),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
             // getting all the items under the specific mrr
             'receiving_item_ids'=> $receiving_item_ids
            
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Receiving $receiving)
    {
    
    // show the stored info from creation
       $items = Item::query()->orderBy('name', 'asc')->get();
       $receivingItems = ReceivingItem::query()->orderBy('id','asc')->get();
        
       $parsedmrr_no = json_decode($receiving, true);  // JSON string  ==> PHP associative array
    // Access the value of the 'id' key
        $mrr_no= $parsedmrr_no['mrr_no'];
        $mrrItems = Item::where('mrr_no', $mrr_no)->pluck('id');
        $mrr_item_ids = Item::find($mrrItems) 
        ->all();
        // dd($mrr_item_ids);
        // dd($mrrItems);
       return inertia('Receiving/Edit',[
        //retrieve from resource collection
        'receiving' => new ReceivingResource($receiving),
        'items' => ItemResource::collection($items),
        'receivingItems' => ReceivingItemResource::collection($receivingItems),
        // 'mrrData' =>  $mrrData
           'mrr_item_ids' => $mrr_item_ids
       ]
       );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReceivingRequest $request, Receiving $receiving)
    {
          //save the info from the edit section
       $data = $request->validated();
       //    $data['updated_by'] = Auth::id();
          $receiving->update($data);
          // $receiving->update($request->validated());
   
          return to_route('receiving.index')
          ->with('success', "Receiving \"$receiving->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Receiving $receiving)
    {
        $id = $receiving->id;
        // $receiving = Receiving::find($receiving);
        $receiving->delete();
       
        return to_route('receiving.index')
       ->with('success', "Receiving \"$id\" was deleted");
    
    }
}
