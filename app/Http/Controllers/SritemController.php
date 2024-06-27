<?php

namespace App\Http\Controllers;

use App\Models\Sritem;
use App\Http\Requests\StoreSritemRequest;
use App\Http\Requests\UpdateSritemRequest;
use App\Http\Resources\SritemResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class SritemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Sritem::query();
        
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        if (request("item")) {
            $query->whereRaw("LOWER(item) LIKE ?", ["%" . strtolower(request("item")) . "%"]);
        }

        $sritems = $query->orderBy($sortField, $sortDirection)
        ->paginate(10);
        // dd($sritem);

        return inertia("SrItem/Index", [
            "sritems" => SritemResource::collection($sritems),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("SrItem/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSritemRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();
        Sritem::create($data);

        return redirect()->route('sritem.index')->with('success', "Sr Item added successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Sritem $sritem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sritem $sritem)
    {
        $response = Gate::authorize('update', $sritem);

        if($response->allowed()) {
            return inertia('SrItem/Edit', [
                'sritem' => new SritemResource($sritem)
            ]);
        }else{
            return abort(403, $response->message());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSritemRequest $request, Sritem $sritem)
    {
        $data = $request->validated();
        $sritem->update($data);

        return to_route('sritem.index')->with('success', "Deliverables \"{$sritem->item}\" was updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sritem $sritem)
    {
    
        $response = Gate::authorize('delete', $sritem);

        if ($response->allowed()) {
            $item = $sritem->item;
            $sritem->delete();

            return to_route('sritem.index')->with('success', "Sr Item \" $item \" was deleted!");
        }else{
            return abort(403, $response->message());
        }
    }
}
