<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Http\Requests\StoreLocationRequest;
use App\Http\Requests\UpdateLocationRequest;
use App\Http\Resources\LocationResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $query = Location::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("name")) . "%"]);
        }
        $locations = $query->orderBy($sortField, $sortDirection)
        ->paginate(12);

        return inertia("Location/Index", [
            "locations" => LocationResource::collection($locations),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia("Location/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        $data['user_id'] = Auth::id();
        Location::create($data);
        return to_route('location.index')->with('success', 'Location was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        $response = Gate::authorize('update', $location);

        if ($response->allowed()) {
            return inertia('Location/Edit',[
            
                'location' => new LocationResource($location),
            ]);
        }else{
            return abort(403, $response->message());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, Location $location)
    {
        $data = $request->validated();
       $location->update($data);

       return to_route('location.index')
       ->with('success', "Location \"$location->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        $response = Gate::authorize('delete', $location);

        if ($response->allowed()) {
        $name = $location->name;
        $location->delete();
       
        return to_route('location.index')
        ->with('success', "Location \" $name \" was deleted!");
    }else{
        return abort(403, $response->message());
    }
    }
}
