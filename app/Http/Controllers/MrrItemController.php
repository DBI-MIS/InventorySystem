<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\ReceivingResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Employee;
use App\Models\Location;
use App\Models\Receiving;

class MrrItemController extends Controller
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
       
         // select
         $items = Item::query()->orderBy('name', 'asc')->get();
        
           

        return Inertia("MrrItem/Create",[
            'items' => ItemResource::collection($items),
            
        ]
    );

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        $data = $request->validated();
        Item::create($data);
        // return inertia('Receving/Index', [
        //     'success' => session('success'),
        //     // $tryDeleted,
            
        // ]);
        return redirect()->route('receivingItem.index')->with('success', 'Item was created');
      
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        //
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
}
