<?php
namespace App\Http\Controllers;
use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\LocationResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Employee;
use App\Models\Location;
use App\Models\Receiving;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {  
        //   $receivingPivot = Item::with('receivings')->get();
        // dd($receivingPivot);
        $query = Item::query() ;
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if(request("uom")){
            $query->where("uom", request("uom"));
        }
        
        if(request("category_id")){
           $query->where('category_id', (request("category_id")));
        }
        $items = $query->with('category')->orderBy($sortField, $sortDirection)->paginate(20);

        return inertia("Item/Index", [
            "items" => ItemResource::collection($items),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),
             ]);


        
       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Item $item)
    {
         // select
         $brands = Brand::query()->orderBy('name', 'asc')->get();
         $categories = Category::query()->orderBy('name', 'asc')->get();
         $employees = Employee::query()->orderBy('name', 'asc')->get();
         $locations = Location::query()->orderBy('name', 'asc')->get();
         
        //  for sku code
         $sku = $this->generateSkuId();
         $input['sku'] = $sku;
         $mrrData = Receiving::select('mrr_no')->distinct()->get(); //get only unique values
        return Inertia("Item/Create",[
            'brands' => BrandResource::collection($brands),
            'categories' =>  CategoryResource::collection($categories),
            'employees' =>  EmployeeResource::collection($employees),
            'locations' =>  LocationResource::collection($locations),
            'sku' =>$sku,
            'mrr_no' => session('mrr_no'),
            'mrrData' =>  $mrrData,
        ]);

    }
    function generateSkuId() {
        // $id = "9";
        // $user->orders()->where('service_id', $request->service_id)->orderBy('id', 'DESC')->first();
        $id = Item::select('id')->get()->last(); // e.g id = 35 -> latest id ang kinukuha
            $stringID= $id["id"]+1;      // add +1 kasi new code sya para sa bagong iccreate na item meaning mag iincrement
        $sku = str_pad( $stringID, 6, '0', STR_PAD_LEFT); 
        // 35 = 000035 --> 6 digits, zeros are being added on the left kaya str pad left
        return $sku;
        
    }
  
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $formData)
    {
        dd($formData);
        $data = $formData->validated();
        // dd($data);
        Item::create($data);
        return to_route('item.index')->with('success', 'Item was created');
        // Determine where to redirect based on the source
        // $source = $request->path();
        // // dd($source);
        // if ($source == 'mrrItem.create') {
        //     Item::create($data);
        //     return redirect()->route('receivingItem.index')->with('success', 'Item created successfully from MRR.');
        // } else if ($source == 'item.create') {
        //     Item::create($data);
        //     return redirect()->route('item.index')->with('success', 'Item created successfully from Item.');
        // } 
        // // Check the origin and redirect accordingly
        // if ($request->origin === 'mrrItem.create') {
        //     Item::create($data);
        //     return redirect()->route('receivingItem.index')->with('success', 'MRR Item created successfully.');
        // } elseif ($request->origin === 'item.create') {
        //     Item::create($data);
        //     return redirect()->route('item.index')->with('success', 'Item created successfully.');
        // }
        // $path = $request->path();

        // if ($path === 'itemMrr/create') {
        //      Item::create($data);
        //      dd($data);
        //      return to_route('receivingItem.create')->with('success', 'Item was created');
        //     // return redirect()->route('ReceivingItem.create');
        // }

        // if ($path === 'item/create') {
        //    Item::create($data);
        // return to_route('item.index')->with('success', 'Item was created');
        // }

        
           
    }
    public function storeItem(StoreItemRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        Item::create($data);
        return to_route('item.index')->with('success', 'Item was created');
        // Determine where to redirect based on the source
    }
    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    { 
        $onlySoftDeletedItems = Item::onlyTrashed()->get();

        return inertia('Item/Show', [
            'item' => new ItemResource($item),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            $onlySoftDeletedItems,
            // $tryDeleted,
            
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
       // show the stored info from creation
            $categories = Category::query()->orderBy('name', 'asc')->get();
            $brands =Brand::query()->orderBy('name', 'asc')->get();
            $locations = Location::query()->orderBy('name', 'asc')->get();
            $employees = Employee::query()->orderBy('name', 'asc')->get();

            return inertia('Item/Edit',[
                'item' => new ItemResource($item),
                //retrieve from resource collection
                'categories' =>  CategoryResource::collection($categories),
                'brands' => BrandResource::collection($brands),
                'locations' =>  LocationResource::collection($locations),
                'employees' => EmployeeResource::collection($employees),
                
            ]
            );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
       //save the info from the edit section
       $data = $request->validated();
       
    //    $data['updated_by'] = Auth::id();
       $item->update($data);
       // $item->update($request->validated());

       return to_route('item.index')
       ->with('success', "Item \"$item->name\" was updated");
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $name = $item->name;
        // $item = Item::find($item);
        $item->delete();
       
        return to_route('item.index')
       ->with('success', "Item \"$name\" was deleted");
    }
    public function itemMrr(StoreItemRequest $request)
    {
          
          $firstName = $request->input('firstName');
          $lastName = $request->input('lastName');
          $email = $request->input('email');
          
          
         // return response()->json(['success' => true]);
        // $validatedData = $request->validated();
        // dd($validatedData);
        // $item = Item::create($validatedData);//
        return redirect()->route('receiving.create')->with('success', 'Item created successfully!');
    }
    public function submit(StoreItemRequest $request)
    {
        // dd($request);
        $validatedData = $request->validated();
        dd($validatedData);
        $item = Item::create($validatedData);
        dd($item);
        return redirect()->route('receiving.create')->with('success', 'Item created successfully!');
        // return response()->json(['success' => true]);
    }
}
