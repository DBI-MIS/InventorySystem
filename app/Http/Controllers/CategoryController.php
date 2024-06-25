<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

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
    public function create(User $user)
    {
        if (! Gate::allows('create', Category::class)) {  
            abort(403, 'You are not authorized to create categories.');
          }
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
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $response = Gate::authorize('update', $category);

        if ($response->allowed()) {
          
          return inertia('Category/Edit',[
            'category' => new CategoryResource($category),
          ]);
        }else{
            return abort(403,$response->message());
        }
           
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

        $response = Gate::authorize('delete', $category);

        if ($response->allowed()) {
          
            $name = $category->name;
            $category->delete();
        
            return to_route('category.index')->with('success', "Category \" $name \" was deleted!");
        }else{
            return abort(403, $response->message());
        }
    }
}
