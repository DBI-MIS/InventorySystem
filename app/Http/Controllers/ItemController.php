<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreFormDataRequest;
use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Requests\UpsertItemRequest;
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
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {  
        if (! Gate::allows('viewAny', Item::class)) { 
            abort(403, 'You are not authorized to view items.');
        }
        // dd($user);
        // $duser= auth()->user()->role;
        // dd($duser);
      
        $query = Item::query() ;
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        if (request("name")) {
            $query->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("name")) . "%"]);
        }
        if(request("uom")){
            $query->where("uom", request("uom"));
        }
        if(request("statuses")){
            $query->where("statuses", request("statuses"));
            $count = $query->count();
            // dd($count);
        };
        
        if(request("category_id")){
           $query->where('category_id', (request("category_id")));
        }
        $items = $query->with('category','brand')->orderBy($sortField, $sortDirection)->paginate(20);

      
        return inertia("Item/Index", [
            "items" => ItemResource::collection($items),
            'queryParams' => request()-> query() ?: null,
            'success' => session('success'),
            'count' => isset($count) ? $count : null
             ]);
       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Item $item)
    {
        if (! Gate::allows('create', $item)) {  
            abort(403, 'You are not authorized to create items.');
          }
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
    public function store(StoreItemRequest $request)
    {
        // dd($formData);
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $data['updated_by'] = Auth::id(); //comment this
    
        // dd($data);s
        Item::create($data);
        return to_route('item.index')->with('success', 'Item was created');
        
           
    }
    /**
     * Display the specified resource.
     */
    public function show(Item $item, User $user) 
    { 
        $response = Gate::authorize('view', $item);
        $itemId = $item['id'];
        $item = Item::with('user')->find($itemId); 
        $userName = $item->user->name;


        //  //  difference
        // $remainingQuantity = $item->quantity - $item->qty_out;
        // // dd($item);
        // // Create new item only if there's a difference
        // if ($remainingQuantity > 0) {
        //     $newItem = $item->replicate(); // Replicate 
        //     $newItem->quantity = $remainingQuantity;
        //     $newItem->remark = 'Split from item ' . $item->id;
        //     $newItem->create();
        //      }
        // dd( $userName);
        // dd($item);
        $replicatedItem = Item::where('remark', 'like', 'Split from item ' . $item->id)->first();
    
        if ($replicatedItem) {
          $this->replicateEditItemDr($item, $replicatedItem); 
        } else {
          $item->replicateItemDr();
        }
        // dd($replicatedItem);

        if ($response->allowed()) {
            return (inertia('Item/Show', [
                'item' => new ItemResource($item),
                'userName' =>  $userName ?: null,
                'queryParams' => request()->query() ?: null,
                'success' => session('success'),
                
            ]));
        } else
        {
            return redirect()->route('item.index')->with('error', $response->message());
        }
   
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        $response = Gate::authorize('update', $item);

        if ($response->allowed()) {
        
        // dd($item);
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
            ); } else {
                return redirect()->route('item.index')->with('error', $response->message());
            }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {

         $response = Gate::authorize('update', $item);

        if ($response->allowed()) {
            $data = $request->validated();
            $data['updated_by'] = Auth::id();
                $item->update($data);
        
                return to_route('item.index')
                ->with('success', "Item \"$item->name\" was updated");
        } else {
            return abort(403, $response->message()); 
        }

        
     
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item, User $user)
    {
        // dd($user);
        // true
        // abort_if(Auth::user()->isUser(), 403); 
        // if (! (Auth::user()->isUser()) || Auth::user()->isEditor())  {
        //     abort(403, 'You are not authorized to delete this item.');
        // }
        if (! Gate::allows('delete', $item)) {  
            abort(403, 'You are not authorized to delete items.');
          }
        
    
      //bort_unless() //false
        $name = $item->name;
        $item->delete();
        
        
        return to_route('item.index')
        ->with('success', "Item \"$name\" was deleted");
    }
    public function restoreItem($itemId)
    {
        $item = Item::onlyTrashed()->find($itemId);

        if ($item) {
            $name = Item::withTrashed()->where('id',$itemId)->pluck('name')->first();
            $item->restore();
            return to_route('archive.index')->with('success', "Item \"$name\" restored successfully!");
        } else {
            return redirect()->back()->with('error', 'Item not found!');
        }
    }

    public function forceDeleteItem(Item $item, $id)
    {
        if (! Gate::allows('forceDelete', $item)) {  
            abort(403, 'You are not authorized to permanently delete items.');
          }

        //   dd($id);
        // get the name of the selected item to be force deleted
        $name = Item::withTrashed()->where('id',$id)->pluck('name')->first();

         Item::withTrashed()->where('id',$id)->first()->forceDelete();

          return to_route('archive.index')->with('success',"Item \"$name\" is permanently deleted");
      
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
    public function submit(StoreFormDataRequest $formData)
    {
        // dd($formData);
        $validatedData = $formData->validated();
        // dd($validatedData);
       Item::create($validatedData);
       $item = Item::query()->latest('created_at')->first();
    //    dd($item);
        $newItem = $item->id;
        // dd($newItem );
        Inertia::share('success', 'Item created successfully!');
    Inertia::share('newItem', $item->id);
        return redirect()->route('receiving.create')->with('message', 'Item created successfully!');
    }

   
    public function upsert(UpsertItemRequest $request, Item $item)
    {
      $items = $request->input('items');

    //   $replicatedItem = Item::where('remark', 'like', 'Split from item ' . $item->id)->first();
      foreach ($items as $itemData) {
        $item = Item::find($itemData['id']);
    
        if ($item) {
          $item->qty_out = $itemData['qty_out'];
          $item->save();
          $item->replicateItemDr();
           $item->itemEqual();
    
        
    
        //   if ($replicatedItem) {
        //     $this->replicateEditItemDr($item, $replicatedItem); 
        //   } else {
        //     $item->replicateItemDr();
        //     // $item->itemEqual();
        //   }
        }
      }
    
      return redirect()->back()->with('success', 'Items updated successfully.');
    }
    
    public function replicateEditItemDr(Item $item, Item $replicatedItem)
    {
      $replicatedQuantity = max(0, $item->quantity - $item->qty_out);
    
      if ($replicatedQuantity !== $replicatedItem->quantity) {
        $replicatedItem->quantity = $replicatedQuantity;
        $replicatedItem->update();
      }
    }
}
//     public function upsert(UpsertItemRequest $request, Item $item)
// {
//     $items = $request->input('items');

//     foreach ($items as $itemData) {
//         $item = Item::find($itemData['id']);

//         if ($item) {
//             $item->qty_out = $itemData['qty_out'];
//             $item->save();

//             $item->replicateItemDr(); 
//         } else {
//         }
//     }

//     return redirect()->back()->with('success', 'Items updated successfully.');
// }
// }
