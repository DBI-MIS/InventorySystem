<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreFormDataRequest;
use App\Http\Requests\StoreItemRequest;
use App\Models\Receiving;
use App\Http\Requests\StoreReceivingRequest;
use App\Http\Requests\UpdateReceivingRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ClientResource;
use App\Http\Resources\DeliverablesResource;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\ReceivingResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Client;
use App\Models\Deliverables;
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
        //  $itemssss = Receiving::with('deliverables')->get();
        //  dd($itemssss );
         $sortField = request("sort_field", 'created_at');
         $sortDirection = request("sort_direction", "desc");
         if (request("mrr_no")) {
             $query->where("mrr_no", "like", "%" . request("mrr_no") . "%");
         }
         if(request("uom")){
             $query->where("uom", request("uom"));
         }
         if(request("category_id")){
            $query->where('category_id', (request("category_id")));
         }
    
        //  $id = 51;
        // $receiving = Receiving::find($id);
        // $existingItems = $receiving->items;
        
        // dd($existingItems);
        
         $receivingPivot = Item::with('receivings')->get();
        //  dd($receivingPivot);

         $receivings = $query->orderBy($sortField, $sortDirection)
         ->paginate(24);
        //  dd($query);
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
       $clients =  Client::query()->distinct()->orderBy('name', 'asc')->get();
    //     $clients =  Client::select('name')->distinct()->orderBy('name', 'asc')->get();
      $delivers = Deliverables::query()->orderBy('dr_no', 'asc')->get();
       $sku = $this->generateSkuId();
    //    dd($deliverables);
       $input['sku'] = $sku;
       $mrrData = Receiving::select('mrr_no')->distinct()->get();
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
          'clients' => ClientResource::collection($clients),
          'delivers' => DeliverablesResource::collection($delivers),
          'mrr_no' =>  $mrr_no,
          'skuu' => $sku
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
    function generateMrrNo() {

        $id = Receiving::select('id')->get()->last(); // e.g id = 35 -> latest id ang kinukuha
        $stringID= $id["id"]+1;      // add +1 kasi new code sya para sa bagong iccreate na item meaning mag iincrement
        $mrr_no = str_pad( $stringID, 6, '2024', STR_PAD_LEFT); 
        // 35 = 000035 --> 6 digits, zeros are being added on the left kaya str pad left
        return $mrr_no;
        
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
        //    dd($data);
        $items = $data['group_item_id'];
        $receiving =Receiving::create($data);
        $receiving->items()->attach($items);  
        // $data['created_by'] = Auth()->user()->id;
        // $data['created_by'] = Auth::id();
        // $data['updated_by'] = Auth::id();
       
        return redirect()->route('receiving.index')->with('success', "Receiving added successfully");
    }
    public function storeItem(StoreItemRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        Item::create($data);
        return to_route('receiving.create')->with('success', 'Item was created');
        // Determine where to redirect based on the source
    }
    /**
     * Display the specified resource.
     */

public function show(Receiving $receiving, Request $request)
{
    $perPage = 10;
    $groupItemIds = is_array($receiving->group_item_id) ? $receiving->group_item_id : [];
    $receiving_items = collect(); // Initialize as an empty collection for validation 

    if (count($groupItemIds) > 0) {
        $receiving_items = Item::with(['brand', 'category', 'employee', 'location'])
            ->whereIn('id', $groupItemIds)
            ->get()
        ;
    }

    // $paginationData = [
    //     'currentPage' => $receiving_items->currentPage(),
    //     'lastPage' => $receiving_items->lastPage(),
    //     'total' => $receiving_items->total(),
    //     'perPage' => $perPage,
    //     'links' => $receiving_items->linkCollection()->toArray(),
    // ];

    return inertia('Receiving/Show', [
        'receiving' => new ReceivingResource($receiving),
        'queryParams' => $request->query() ?: null,
        'success' => session('success'),
        // 'paginationData' => $paginationData,
        'receiving_items' => $receiving_items // Ensure this is an array
    ]);
}

    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Receiving $receiving)
    {
        $items = Item::query()->orderBy('name', 'asc')->get();
        $clients =  Client::query()->distinct()->orderBy('name', 'asc')->get();
        // $clients = Client::select('name')->distinct()->orderBy('name', 'asc')->get();
        $delivers = Deliverables::query()->distinct()->orderBy('dr_no', 'asc')->get();
        // dd($clients);
        // Fetch brand name and category name for existing items
        foreach ($items as $item) {
            $item->brand_name = $item->brand->name;
            $item->category_name = $item->category->name;
            $item->sku_prefix = $item->category->sku_prefix;
        }
        // dd($receiving);
        $parsedId = json_decode($receiving, true);
    
        // Access the value of the 'id' key
        $id = $parsedId['id'];
        
        $receiving = Receiving::find($id);
        $existingItems = $receiving->items;
        //   dd($existingItems);
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        $existingItemIds= $receiving->items()->pluck('items.id');
        // dd($existingItemIds);
        // Convert array strings => array of integers
        $existingItemIds = array_map('intval', $existingItemIds->toArray());

       
       return inertia('Receiving/Edit',[
        'items' => ItemResource::collection($items),
        'clients' => ClientResource::collection($clients),
            'receiving' => new ReceivingResource($receiving),
            'existingItems' =>  $existingItems,
            'existingItemIds' => $existingItemIds,
            'delivers' => DeliverablesResource::collection($delivers),
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
        // if existing ang group_item_id
        if (isset($data['group_item_id'])) {
           $items = $data['group_item_id'];
         $receiving->update($data);
         $receiving->items()->sync($items); 
        }
        
        return to_route('receiving.index')
            ->with('success', "Receiving \"{$receiving->id}\" was updated");
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
    public function myReceiving(Receiving $receivingId) {
        // dd($receivingId);
        $groupItemIds = is_array($receivingId->group_item_id) ? $receivingId->group_item_id : [];
        $receiving_items = collect(); // Initialize as an empty collection for validation 
        
        if (count($groupItemIds) > 0) {
            // Fetch receiving items with relationships only if there are item ids
            $receiving_items = Item::with(['brand', 'category', 'employee', 'location'])
                ->whereIn('id', $groupItemIds)
                ->get();
        }

        return inertia("Receiving/PrintReceiving", [
            'receiving' => new ReceivingResource($receivingId),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'receiving_items' =>  $receiving_items
            
        ]);
    }
    public function submitItem(StoreFormDataRequest $formData)
    {
         // dd($formData);
         $validatedData = $formData->validated();
         // dd($validatedData);
        Item::create($validatedData);
        $item = Item::query()->latest('created_at')->first();
     //    dd($item);
         $newItem = $item->id;
         // dd($newItem );
         // return redirect()->route('receiving.create')->with($item);
         // return redirect()->back()->with('newItem', $newItem);
         // return Inertia( "Receiving/Create");
         // return Redirect::back()->with('newItem', $newItem);
      
         return inertia("Receiving/Create", [
             'newItem' => $item->id]);
             
     // });
     }
    
}
