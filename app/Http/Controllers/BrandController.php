<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Gate::allows('viewAny', Brand::class)) { 
            abort(403, 'You are not authorized to view brands.');
        }
        $query = Brand::query();
       
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

          
        if (request("name")) {
            $query->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("name")) . "%"]);
            // $query->where("name", "like", "%" . request("name") . "%");
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
        if (! Gate::allows('create', Brand::class)) {  
            abort(403, 'You are not authorized to create brands.');
          }
        return Inertia("Brand/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        // dd($data);
        Brand::create($data);
        return to_route('brand.index')->with('success', 'Brand was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        $response = Gate::authorize('update', $brand);

        if ($response->allowed()) {
          
            return inertia('Brand/Edit',[
                'brand' => new BrandResource($brand),
            ]);
        }else{
            return abort(403, $response->message());
        }
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
        $response = Gate::authorize('delete', $brand);

        if ($response->allowed()) {
             $name = $brand->name;
             $brand->delete();
       
            return to_route('brand.index')->with('success', "Brand \" $name \" was deleted!");
        }else{
            return abort(403,$response->message());
        }
    }
}
