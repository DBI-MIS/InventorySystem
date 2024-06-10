<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        $query = Client::query();
        
        if (request("name")) {
            $query->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("name")) . "%"]);
            // $query->where("name", "like", "%" . request("name") . "%");
        }
        if(request("status")){
            $query->where("status", request("status"));
        };
        $clients = $query->orderBy($sortField, $sortDirection)
        ->paginate(20);

        return inertia("Client/Index", [
            "clients" => ClientResource::collection($clients),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("Client/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        Client::create($data);
        return to_route('client.index')->with('success', 'Client was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return inertia('Client/Show', [
            'client' => new ClientResource($client),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        return inertia('Client/Edit',[
            'client' => new ClientResource($client),
          ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        $data = $request->validated();
        $client->update($data);
 
        return to_route('client.index')
        ->with('success', "Client \"$client->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $name = $client->name;
        $client->delete();
       
        return to_route('client.index')->with('success', "Client \" $name \" was deleted!");
    }
}
