<?php

namespace App\Http\Controllers;

use App\Http\Resources\SritemResource;
use App\Models\Sritem;
use Illuminate\Http\Request;

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

        $sritems = $query->orderBy($sortField, $sortDirection)
        ->paginate(10);
        // dd($sritem);

        return inertia("SrItem/Index", [
            "sritems" => SritemResource::collection($sritems),
            'queryParams' => request()-> query() ?: null,
            // 'success' => session('success'),

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
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sritem $sritem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sritem $sritem)
    {
        //
    }
}
