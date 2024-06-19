<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Brand::query();
       
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

          
        if (request("name")) {
            $query->where("name", 'LIKE', "%" . request("name") . "%");
        }

        $brands = $query->orderBy($sortField, $sortDirection)
        ->paginate(12);

        return inertia("Brand/Index", [
            "brands" => BrandResource::collection($brands),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("Brand/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        Brand::create($data);
        return to_route('brand.index')->with('success', 'Brand was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return inertia('Brand/Show', [
            'brand' => new BrandResource($brand),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
         return inertia('Brand/Edit',[
            'brand' => new BrandResource($brand),
          ]);
   }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $data = $request->validated();
        $brand->update($data);
 
        return to_route('brand.index')
        ->with('success', "Brand \"$brand->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $name = $brand->name;
        $brand->delete();
       
        return to_route('brand.index')->with('success', "Brand \" $name \" was deleted!");
    }
}
