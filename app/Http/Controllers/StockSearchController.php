<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockSearchResource;
use App\Http\Resources\ItemResource;
use App\Models\StockSearch;
use App\Models\Item;
use Illuminate\Http\Request;

class StockSearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

//         $query = Item::query();
// $sortField = request("sort_field", 'created_at');
// $sortDirection = request("sort_direction", "asc");

// if (request("name")) {
//     $query->where("name", "like", "%". request("name") ."%");
// }

// $totalitems = $query
//     ->selectRaw('name, SUM(quantity) as total_quantity, uom')
//     ->groupBy('name','uom')
//     // ->orderBy($sortField, $sortDirection)
//     ->get();
//     // ->paginate(10)
//     // ->onEachSide(1);

// return inertia("StockSearch/Index",[
//     "items" => $totalitems,
//     'queryParams' => request()->query() ?: null,
// ]);

//  $query = Item::query();
        //   $sortField = request("sort_field", 'created_at');
        //   $sortDirection = request("sort_direction", "asc");
        

        //   $query1 = Item::query()->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        //   $query2 = Item::query()->selectRaw('name, SUM(quantity) as total_quantity, uom')->groupBy('name','uom')->get();

        //   $sortField = request("sort_field", 'created_at');
        //   $sortDirection = request("sort_direction", "asc");

        

        //  if (request("name")) {
        // $query->where("name", "like", "%". request("name") ."%");
        //  }
       
        //   $totalitems = $query;

        
//          $items= Item::orderBy($sortField, $sortDirection)
//          ->paginate(10)
//          ->onEachSide(1);

        //    $totalitems = $query2;
        //    $totalitems1 = $query1;
// $totalitems = Item::selectRaw('name, SUM(quantity) as total_quantity, uom')
//         ->groupBy('name','uom')
//         ->get();

        //  return inertia("StockSearch/Index",[
        //        "totalitems1" => ItemResource::collection($totalitems1),
        //      "totalitems" => $totalitems,
        //      'queryParams' => request()->query() ?: null,

        //  ] );

// $perPage = Request::get('perPage', 10); // Set a default per page value
// $totalitems = Item::selectRaw('name, SUM(quantity) as total_quantity, uom')
//     ->groupBy('name','uom')
//     ->paginate($perPage);

// // You might want to include this check if you're using Inertia with Vue.js
// if (Request::header('X-Inertia')) {
//     return inertia("StockSearch/Index", [
//         "totalitems" => $totalitems,
//         'queryParams' => request()->query() ?: null,
//     ])->toResponse(Request::create(''));
// }

// // If not using Inertia, return the paginated data directly
// return ItemResource::collection($totalitems);

$perPage = 15;

$query = Item::query();

if (request("name")) {
    $query->where("name", "like", "%". request("name") ."%");
}

$totalitems = $query->selectRaw('name, SUM(quantity) as total_quantity, uom')
    ->groupBy('name','uom')
    ->paginate($perPage);

    

$totalitems->getCollection()->transform(function ($item) {
    return [
        'name' => $item->name,
        'uom' => $item->uom,
        'total_quantity' => $item->total_quantity,
        // Add more fields if needed
    ];
});

// Transform pagination metadata to match Inertia's structure
$paginationMeta = $totalitems->toArray();
$paginationLinks = $totalitems->toArray()['links'];
unset($paginationMeta['links']);

return inertia("StockSearch/Index", [
    "totalitems" => $totalitems->items(),
    "paginationMeta" => $paginationMeta,
    "paginationLinks" => $paginationLinks,
    'queryParams' => request()->query() ?: null,
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StockSearch $stocksearch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StockSearch $stocksearch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StockSearch $stocksearch)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StockSearch $stocksearch)
    {
        //
    }
}
