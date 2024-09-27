<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreFormDataRequest;
use App\Http\Requests\StoreItemReceivingRequest;
use App\Http\Requests\StoreItemRequest;
use App\Models\Receiving;
use App\Http\Requests\StoreReceivingRequest;
use App\Http\Requests\UpdateItemReceivingRequest;
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
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class ReceivingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        $user = auth()->user();
        $userRole = $user->role;

         $query = Receiving::query() ;
         $sortField = request("sort_field", "created_at");
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
        //  $user = Auth::id();
        //  dd($user->name);

         
        if ($userRole === 'editor') { //it shoould be editor  for testing lang muna kaya super_admin
            $query->where('status', '!=', 'pending');
        } 
        // elseif (in_array($userRole, ['user', 'admin','super_admin'])) {
        //     $query->where('status', '!=', 'for_approval');  //if ever ieexclude yung for approval
        // }
       

         $receivings = $query->orderBy($sortField, $sortDirection)
         ->paginate(24);

         return inertia("Receiving/Index", [
             "receivings" => ReceivingResource::collection($receivings),
             'queryParams' => request()-> query() ?: null,
             'success' => session('success'),
             'user' => $user,
            
              ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create(User $user)
    {
       //
    //    $items = Item::query()->orderBy('name', 'asc')->get();
       
    // $items = $this->getItems();      $items = Item::query()->orderBy('name', 'asc')->groupBy('name')->get();
    // dd($items);
        $subquery = DB::table('items')
        ->select(DB::raw('MAX(id) as id'))
        ->groupBy('name');

        $items = Item::select('items.*')
        ->joinSub($subquery, 'latest_items', function ($join) {
            $join->on('items.id', '=', 'latest_items.id');
        })
        ->get();
     
       $brands = Brand::query()->orderBy('name', 'asc')->get();
       $categories = Category::query()->orderBy('name', 'asc')->get();
       $employees = Employee::query()->orderBy('name', 'asc')->get();
       $locations = Location::query()->orderBy('name', 'asc')->get();
       $clients =  Client::query()->distinct()->orderBy('name', 'asc')->get();
      $delivers = Deliverables::query()->orderBy('dr_no', 'asc')->get();


      $userId =Auth::id(); 
      $item = Item::where('user_id', $userId)->latest()->first(); 
    //   $latestItem = $item->id;
        //  for Mrr No
        $mrr_no= $this->generateMrrNo();
        $input['mrr_no'] =  $mrr_no;
        $sku = $this->generateSkuId();
        $input['sku'] = $sku;
        // dd($latestItem);
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
            'skuuu' =>  $sku,
        // 'latestItem' => $latestItem
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

    // public function getItems()
    // {
    //   $items = Item::query()
    //     ->select('items.name')  
    //     ->where('deleted_at', null)  
    //     ->orderBy('name', 'asc')  
    //     ->groupBy('name',)  
    //     ->get();
    
    //   return $items;
    // }
    
    function generateMrrNo() {

        $id = Receiving::select('id')->get()->last(); // e.g id = 35 -> latest id ang kinukuha
        $year = Carbon::now()->format('Y');
        $stringID= $id["id"]+1;      // add +1 kasi new code sya para sa bagong iccreate na item meaning mag iincrement
        $mrr_no = ($year. str_pad( $stringID, 4, '0', STR_PAD_LEFT)); 
        //000002
        // 35 = 000035 --> 6 digits, zeros are being added on the left kaya str pad left     
        return $mrr_no;


        
    }
    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreReceivingRequest $request,)
    {
        $data = $request->validated();
        // dd($data);
            $items = $data['items'];
        // dd($items);//
            $data['user_id'] = Auth::id();
                $receiving =Receiving::create($data);
            

        foreach ($items as $itemData) {
            if (isset($itemData['id'])) {
                $receiving->items()->attach($itemData['id']);
            } else {

                  // Remove sku_prefix and isNew from item data
                unset($itemData['sku_prefix']);
                unset($itemData['isNew']);
                
                $itemData['updated_by'] = Auth::id();
                $itemData['user_id'] = Auth::id();
                // dd($itemData);
                $newItem = Item::create($itemData);
                $receiving->items()->attach($newItem->id);
                // $receiving->items()->attach($itemData['id']);
            }
        }
        // $itemIds = array_map(function ($item) {
        //     return (int) $item['id'];
        // }, $items);
        // // dd($itemIds);
  
        //   // Attach items to receiving
        //   $receiving->items()->attach($itemIds);
  
          return redirect()->route('receiving.index')->with('success', 'Receiving created successfully!');
      
    }

    public function storeItem(StoreItemRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        $item = Item::create($data);
        return inertia("Receiving/Create", [
            'newItem' => $item,
        ])->with('success', 'Item was created');
        // Determine where to redirect based on the source
    }
    /**
     * Display the specified resource.
     */

public function show(Receiving $receiving, Request $request)
{
    
    // $groupItemIds = is_array($receiving->group_item_id) ? $receiving->group_item_id : [];
    // $receiving_items = collect(); // Initialize as an empty collection for validation 

    // if (count($groupItemIds) > 0) {
    //     $receiving_items = Item::with(['brand', 'category', 'employee', 'location'])
    //         ->whereIn('id', $groupItemIds)
    //         ->get()
    //     ;
    // }
    $receiving->load('items.category'); // Load Relation to Item with relation to Category
    // $user->load('profile.address')
    $user = auth()->user();


// dd($receiving);
    
    return inertia('Receiving/Show', [
        'receiving' => new ReceivingResource($receiving),
        'queryParams' => $request->query() ?: null,
        'success' => session('success'),
        'receiving_items' => $receiving->items, // Load Relation
        'userr' => $user
        
    ]);
}

    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Receiving $receiving)
    {
        $response = Gate::authorize('update', $receiving);

                if ($response->allowed()) {
                    $items = Item::query()->whereNotIn('items.statuses', ['on_process', 'processed'])->orderBy('name', 'asc')->get();
                    $clients = Client::query()->orderBy('name', 'asc')->get();
                // $clients = Client::select('name')->distinct()->orderBy('name', 'asc')->get();
                $delivers = Deliverables::query()->distinct()->orderBy('dr_no', 'asc')->get();
                // dd($clients);
                // Fetch brand name and category name for existing items
                
               $receiving->load('items.category', 'items.brand');
                // dd( $receiving->items);
                // $parsedId = json_decode($receiving, true);
            
                // // Access the value of the 'id' key
                // $id = $parsedId['id'];
                
                // $receiving = Receiving::find($id);
                // $existingItems = $receiving->items;
                // //   dd($existingItems);
                // $sortField = request("sort_field", 'created_at');
                // $sortDirection = request("sort_direction", "desc");
                // $existingItemIds= $receiving->items()->pluck('items.id');
                // // dd($existingItemIds);
                // // Convert array strings => array of integers
                // $existingItemIds = array_map('intval', $existingItemIds->toArray());

            
            return inertia('Receiving/Edit',[
                'items' => ItemResource::collection($items),
                'clients' => ClientResource::collection($clients),
                    'receiving' => $receiving,
                    // 'existingItems' =>  $existingItems,
                    // 'existingItemIds' => $receiving->items,
                    'receiving_items' => $receiving->items,
                    'delivers' => DeliverablesResource::collection($delivers),
            ]
            );
        }
        else{
            return abort(403, $response->message());
        }
    }
    /**
     * Update the specified resource in storage.
     */
    protected $group_item_id = [];

    public function update(UpdateReceivingRequest $request, Receiving $receiving)
    {
        $data = $request->validated();
        // dd($data);
            $items = $data['items'];
        // dd($items);//
            $data['user_id'] = Auth::id();
            $receiving->update($data);
            

        foreach ($items as $itemData) {
          $itemIds = $receiving->items()->attach($itemData['id']);
          dd($itemIds);
          $receiving->items()->sync($itemIds); 
        }
        
        return to_route('receiving.index')
            ->with('success', "Receiving \"{$receiving->id}\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Receiving $receiving)
    {
          

            // $id = $receiving->id;
            // $receiving->delete();
            // return to_route('receiving.index')->with('success', "Receiving \"$id\" was deleted");

        $response = Gate::authorize('delete', $receiving);

        if ($response->allowed()) {
            $id = $receiving->id;
            $receiving->delete();
            return to_route('receiving.index')
        ->with('success', "Receiving \"$id\" was deleted");
        }else{
            return abort(403, $response->message());
        }
    
    }
    public function myReceiving(Receiving  $receivingId) {
        
        // dd($receivingId);
        // $receiving = Receiving::
        // $groupItemIds = is_array($receivingId->group_item_id) ? $receivingId->group_item_id : [];
        // $receiving_items = collect(); // Initialize as an empty collection for validation 
        
        // if (count($groupItemIds) > 0) {
        //     // Fetch receiving items with relationships only if there are item ids
        //     $receiving_items = Item::with(['brand', 'category', 'employee', 'location'])
        //         ->whereIn('id', $groupItemIds)
        //         ->get();
        // }
        // $receiving = Receiving::find($id);
        // dd($receiving);
        $receivingId->load('items.category');

        return inertia("Receiving/PrintReceiving", [
            'receiving' => new ReceivingResource($receivingId),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'receiving_items' =>  $receivingId->items
            
        ]);
    }
    public function restoreReceiving($id)
    {
        $receiving= Receiving::onlyTrashed()->find($id);

        if ($receiving) {
            $name = Receiving::withTrashed()->where('id',$id)->pluck('mrr_no')->first();
            $receiving->restore();
            return to_route('archive.index')->with('success', "Item \"$name\" restored successfully!");
        } else {
            return redirect()->back()->with('error', 'Item not found!');
        }
    }
    public function forceDelete(Receiving $receiving, $id)
    {
        if (! Gate::allows('forceDelete', $receiving)) {  
            abort(403, 'You are not authorized to permanently delete items.');
          }

        $name = Receiving::withTrashed()->where('id',$id)->pluck('mrr_no')->first();

         Receiving::withTrashed()->where('id',$id)->first()->forceDelete();

          return to_route('archive.index')->with('success',"MRR \"$name\" is permanently deleted");
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
        // public function restore(Receiving $receiving, $id)
        // {
        //     // $receiving->restore();
        //     $name = Receiving::withTrashed()->where('id',$id)->pluck('name')->first();
        //     Receiving::withTrashed()->where('id',$id)->first()->restore();

        //     return redirect()->route('archive.index')->with('success', "Receiving\"$name\" restored successfully!");
        // }
    public function updatemrrStatus(int $id) {
        $receiving = Receiving::find($id);
        $receiving->status = "for_approval";
        $receiving->save();
    }
     public function updateApprove(int $id) {
            $receiving = Receiving::find($id);
            $receiving->status = "approved";
            $receiving->save();
    }
    public function updateReject(int $id) {
        $receiving = Receiving::find($id);
        $receiving->status = "rejected";
        $receiving->save();
    }
    public function updateCancel(int $id) {
        $receiving = Receiving::find($id);
        $receiving->status = "cancel";
        $receiving->save();
    }

    //   public function storeItemReceiving(StoreItemReceivingRequest $request)
    //   {
    //       $validated = $request->validate([
    //          'sku_prefix' => 'required|string',
    //         'sku' => 'required|string',
    //         'name' => 'required|string',
    //         'brand_id' => 'required|integer',
    //         'category_id' => 'required|integer',
    //         'description' => 'nullable|string',
    //         'specs' => 'nullable|string',
    //         'part_no' => 'nullable|string',
    //         'serial_no' => 'nullable|string',
    //         'model_no' => 'nullable|string',
    //         'uom' => 'required|string',
    //         'quantity' => 'required|integer',
    //         'location_id' => 'required|integer',
    //         'employee_id' => 'required|integer',
    //         'items' => 'required|array',
    //         'items.*.sku_prefix' => 'required|string',
    //         'items.*.sku' => 'required|string',
    //         'items.*.name' => 'required|string',
    //         'items.*.brand_id' => 'required|integer',
    //         'items.*.category_id' => 'required|integer',
    //         'items.*.description' => 'nullable|string',
    //         'items.*.specs' => 'nullable|string',
    //         'items.*.part_no' => 'nullable|string',
    //         'items.*.serial_no' => 'nullable|string',
    //         'items.*.model_no' => 'nullable|string',
    //         'items.*.uom' => 'required|string',
    //         'items.*.quantity' => 'required|integer',
    //         'items.*.location_id' => 'required|integer',
    //         'items.*.employee_id' => 'required|integer',
    //       ]);

    //       $itemreceived = Receiving::create([
            
    //           'sku_prefix' => $validated['sku_prefix'],
    //               'sku' => $validated['sku'],
    //               'name' => $validated['name'],
    //               'brand_id' => $validated['brand_id'],
    //               'category_id' => $validated['category_id'],
    //               'description' => $validated['description'],
    //               'specs' => $validated['specs'],
    //               'part_no' => $validated['part_no'],
    //               'serial_no' => $validated['serial_no'],
    //               'model_no' => $validated['model_no'],
    //               'uom' => $validated['uom'],
    //               'quantity' => $validated['quantity'],
    //               'location_id' => $validated['location_id'],
    //               'employee_id' => $validated['employee_id'],
            
    //       ]);

    //       foreach ($validated['items'] as $item) {
    //           $newItem = Item::create([
    //               'sku_prefix' => $item['sku_prefix'],
    //               'sku' => $item['sku'],
    //               'name' => $item['name'],
    //               'brand_id' => $item['brand_id'],
    //               'category_id' => $item['category_id'],
    //               'description' => $item['description'],
    //               'specs' => $item['specs'],
    //               'part_no' => $item['part_no'],
    //               'serial_no' => $item['serial_no'],
    //               'model_no' => $item['model_no'],
    //               'uom' => $item['uom'],
    //               'quantity' => $item['quantity'],
    //               'location_id' => $item['location_id'],
    //               'employee_id' => $item['employee_id'],
    //           ]);
    //           $itemreceived->items()->attach($newItem->id);
    //       }
    //       return redirect()->route('receiving.create');
    //   }

    // public function updateItemReceiving(UpdateItemReceivingRequest $request, Receiving $receiving)
    // {
    
    // }
}
