<?php

namespace App\Http\Controllers;
use App\Models\Receiving;
use App\Http\Requests\StoreReceivingRequest;
use App\Http\Requests\UpdateReceivingRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\ReceivingResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Employee;
use App\Models\Item;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReceivingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $query = Receiving::query() ;
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
        
         $receivingPivot = Item::with('receivings')->get();
        //  dd($receivingPivot);

         $receivings = $query->orderBy($sortField, $sortDirection)
         ->paginate(10);
         
         return inertia("Receiving/Index", [
             "receivings" => ReceivingResource::collection($receivings),
             'queryParams' => request()-> query() ?: null,
             'success' => session('success'),
              ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {

        
       //
       $items = Item::query()->orderBy('name', 'asc')->get();
       $brands = Brand::query()->orderBy('name', 'asc')->get();
       $categories = Category::query()->orderBy('name', 'asc')->get();
       $employees = Employee::query()->orderBy('name', 'asc')->get();
       $locations = Location::query()->orderBy('name', 'asc')->get();
  
        //  for Mrr No
        $mrr_no= $this->generateMrrNo();
        $input['mrr_no'] =  $mrr_no;

        //use dd for checking
        //dd($name)

      return Inertia("Receiving/Create",[
       'items' => ItemResource::collection($items),
          'brands' => BrandResource::collection($brands),
          'categories' =>  CategoryResource::collection($categories),
          'employees' =>  EmployeeResource::collection($employees),
          'locations' =>  LocationResource::collection($locations),
          'mrr_no' =>  $mrr_no
      ]);
    }
    function generateMrrNo() {

        $id = Receiving::select('id')->get()->last(); // e.g id = 35 -> latest id ang kinukuha
        $stringID= $id["id"]+1;      // add +1 kasi new code sya para sa bagong iccreate na item meaning mag iincrement
        $sku = str_pad( $stringID, 6, '2024', STR_PAD_LEFT); 
        // 35 = 000035 --> 6 digits, zeros are being added on the left kaya str pad left
        return $sku;
        
    }
    /**
     * Store a newly created resource in storage.
     */

    //  public function assignItem(Request $request, $itemId, $receivingId){
    //     $item = Item::findorFail($itemId);
    //     $receiving = Receiving::findorFail($receivingId);
     

    //     $receiving->items()->attach($item);
    //     return response()->json(['message' => 'Item assigned successfully']);
    //  }
    public function store(StoreReceivingRequest $request)
    {

        $data = $request->validated();
        $items = $data['group_item_id'];
        // $items =[2,3,5];
        // $item_ids = [];

//         foreach ($data as $item) {
//             if (isset($item['group_item_id'])) {
//                 $item_ids[] = $item['group_item_id'];
//             }
           
// }    
// dd($items);
// dd($data);
        // $data['created_by'] = Auth()->user()->id;
        // $data['created_by'] = Auth::id();
        // $data['updated_by'] = Auth::id();
        $receiving =Receiving::create($data);
        $receiving->items()->attach($items);  
        return redirect()->route('receiving.index')->with('success', "Receiving added successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Receiving $receiving)
    {
        $groupItemIds = is_array($receiving->group_item_id) ? $receiving->group_item_id : [];
        $receiving_items = collect(); // Initialize as an empty collection for validation 
        
        if (count($groupItemIds) > 0) {
            // Fetch receiving items with relationships only if there are item ids
            $receiving_items = Item::with(['brand', 'category', 'employee', 'location'])
                ->whereIn('id', $groupItemIds)
                ->get();
        }
        

        return inertia('Receiving/Show', [
            'receiving' => new ReceivingResource($receiving),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'receiving_items' => $receiving_items,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Receiving $receiving)
    {
    //    $parsedmrr_no = json_decode($receiving, true);  // JSON string  ==> PHP associative array

    //    // Access the value of the 'id' key
    //     $mrr_no= $parsedmrr_no['mrr_no'];
    //     $mrrItems = Item::where('mrr_no', $mrr_no)->pluck('id');
    //     $mrr_item_ids = Item::find($mrrItems) 
    //     ->all();
   
    //     // JSON string  ==> PHP associative array
    //     $parsedId = json_decode($receiving, true);
    
    //     // Access the value of the 'id' key
    //     $id = $parsedId['id'];
    //     $existingItems = Receiving::where('id', $id)->pluck('group_item_id');
    //     $existingGroupItems = Item::find($existingItems) 
    //     ->all();
        // dd($existingGroupItems);
        //  dd($mrr_item_ids);
           // Fetch brand name and category name for mrr items
        // foreach ($mrr_item_ids as $mrr_item) {
        //     $mrr_item->brand_name = $mrr_item->brand->name; //get the name under brand then s-net sa brand_name
        //     $mrr_item->category_name = $mrr_item->category->name;
        //     $mrr_item->sku_prefix = $mrr_item->category->sku_prefix;
        // }

        // // Fetch brand name and category name for existing items
        // foreach ($existingGroupItems as $existingItem) {
        //     $existingItem->brand_name = $existingItem->brand->name;
        //     $existingItem->category_name = $existingItem->category->name;
        //     $existingItem->sku_prefix = $existingItem->category->sku_prefix;
        // }

       return inertia('Receiving/Edit',[
            //retrieve from resource collection
            'receiving' => new ReceivingResource($receiving),
            // 'mrr_item_ids' => $mrr_item_ids,
            // 'existingGroupItems' =>  $existingGroupItems,
       ]
       );
    }
    /**
     * Update the specified resource in storage.
     */
    protected $group_item_id = [];

    public function update(UpdateReceivingRequest $request, Receiving $receiving)
    {
        $data = $request->validated();
        // Ensure group_item_id is properly managed if it exists in the data
        if (isset($data['group_item_id'])) {
            $data['group_item_id'] = json_encode($data['group_item_id']);  // Convert the array to JSON
        }
        Receiving::upsert(
            [$data],
            ['mrr_no'],  // Unique key to determine insert or update
            ['group_item_id','updated_at']  // Fields to update
        );
    
        // Retrieve the updated record
        $updatedReceiving = Receiving::where('mrr_no', $data['mrr_no'])->first();
    
        return to_route('receiving.index')
            ->with('success', "Receiving \"{$updatedReceiving->name}\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Receiving $receiving)
    {
        $id = $receiving->id;
        $receiving->delete();
        return to_route('receiving.index')
       ->with('success', "Receiving \"$id\" was deleted");
    
    }
}
