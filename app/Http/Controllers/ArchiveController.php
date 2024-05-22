<?php

namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\Restore;
use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use Inertia\Inertia;

class ArchiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Item::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
                $query->onlyTrashed()->where("name", "like", "%" . request("name") . "%");
        }
        $items = $query->onlyTrashed()->orderBy($sortField, $sortDirection)
        ->paginate(10);

        return inertia("Archive/Index", [
            "items" => ItemResource::collection($items),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),
            // $itemss
           
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
    public function store(StoreItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item, $id)
    {
        //static value working siya.
        // $itemss = Item::withTrashed()->where('id', 17)->restore();
        $name = Item::withTrashed()->where('id',$id)->pluck('name')->first();
        Item::withTrashed()->where('id',$id)->first()->restore();
    
            return to_route('archive.index')->with('success', "Item \"$name\" restored successfully!");
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
    public function update(UpdateItemRequest $request, Item $item, $id)
    {
       
    }
    public function delete($id){

        Item::onlyTrashed()->get($id)->forceDelete(); //force delete the selected item

        return Inertia::render('archive.index')->with('success', "Item force deleted successfully!");
            // $itemss = Item::where('id', 16)->delete(); --> working siya static value
            
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item, $id)
    {
        // get the name of the selected item to be force deleted
        $name = Item::withTrashed()->where('id',$id)->pluck('name')->first();

         Item::withTrashed()->where('id',$id)->first()->forceDelete();

          return to_route('archive.index')->with('success',"Item \"$name\" was successfully deleted");
    }
}
