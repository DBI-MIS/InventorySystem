<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Category::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        
        if (request("name")) {
            $query->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("name")) . "%"]);
        }
        $categories = $query->orderBy($sortField, $sortDirection)
        ->paginate(12);

        return inertia("Category/Index", [
            "categories" => CategoryResource::collection($categories),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("Category/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        Category::create($data);
        return to_route('category.index')->with('success', 'Category was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return inertia('Category/Show', [
            'category' => new CategoryResource($category),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
          
          return inertia('Category/Edit',[
            'category' => new CategoryResource($category),
          ]);
           
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
       $data = $request->validated();
       $category->update($data);

       return to_route('category.index')
       ->with('success', "Category \"$category->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $name = $category->name;
        $category->delete();
       
        return to_route('category.index')->with('success', "Category \" $name \" was deleted!");
    }
}
