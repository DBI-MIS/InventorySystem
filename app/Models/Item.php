<?php

namespace App\Models;

use App\Http\Requests\UpsertItemRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Item extends Model
{
    protected $casts =
     [ 
        'id' => 'integer',
     'created_at' => 'date: M d, Y',
    
    //  'statuses' => 'array',
];
    use HasFactory, SoftDeletes;
    protected $fillable = [
        
        'sku_prefix',
        'sku',
        'name',
        'brand_id',
        'category_id',
        'description',
        'specs',
        'part_no',
        'serial_no',
        'model_no',
        'uom',
        'quantity',
        'qty_out',
        'location_id',
        'employee_id',
        'statuses',
        'remark',
        'user_id',
        'updated_by'
    
    ];
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);                    
    }
    public function sku_prefix(){
        return $this->belongsTo(Category::class,'sku_prefix');
    }
    public function sku_prefixes(){
        return $this->belongsTo(Category::class,'sku_prefix');
    }
    public function location(){
        return $this->belongsTo(Location::class);
    }
    public function locations(){
        return $this->hasMany(Location::class);
    }
    public function employee(){
        return $this->belongsTo(Employee::class);
    }
    public function receivings(){
        return $this->belongsToMany(Receiving::class, 'item_receiving')->withTimestamps();
    }
    public function deliverable_items(){
        return $this->belongsToMany(Deliverables::class, 'deliverable_item')->withTimestamps();
    }
    public function stockrequisition(){
        return $this->hasOne(StockRequisition::class);
    }
    public function user(){
        return $this->belongsTo(User::class,  'user_id', 'id');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // public function replicateItemDr(Item $item, UpsertItemRequest $request)
    // {
    //        $quantity = (int) $item->quantity;
    //        $qty_out = (int) $request->qty_out;

    //        $diff = max(0, $quantity - $qty_out);

    //        if ($diff > 0) {
    //            $newItem = $item->replicate();
    //            $newItem->quantity = $diff;
    //            $newItem->qty_out = intval("0");
    //            $newItem->remark = 'Split from item ' . $item->id;

    //         //    $newItem->id = (int) $newItem->id;
    //            $newItem->save();
    //        }
               
    // }

    public function itemEqual(Item $item, UpsertItemRequest $request){
        $item->quantity =  $request->qty_out;
        $item->save();

        
    }

    // public function replicateEditItemDr()
    // {
    //     $quantity = (int) $this->quantity;
    //     $qty_out = (int) $this->qty_out;
    
    //     $diff = max(0, $quantity - $qty_out);
    
    //     $replicatedItem = Item::where('remark', 'like', 'Split from item ' . $this->id)->first();
    //     if ($replicatedItem) {
    //         $replicatedItem->quantity = $diff;
    //         $replicatedItem->save();
    //     }
    // }
    

//     public function replicateEditItemDr()
// {
//     $quantity = (int) $this->quantity;
//     $qty_out = (int) $this->qty_out;

//     $diff = max(0, $quantity - $qty_out);

//     $replicatedItem = self::where('qty_out', 0)->first();

//     if ($diff > 0) {

//        if ($replicatedItem) {
//             $replicatedItem->quantity = $diff;
//             $replicatedItem->save();
//         } else {
//             $newItem = $this->replicate();
//             $newItem->quantity = $diff;
//             $newItem->qty_out = 0;
//             $newItem->remark = 'Split from item ' . $this->id;
//             $newItem->save();
//         }
//     } elseif ($replicatedItem) {
//         $replicatedItem->delete();
//     }
// }


    
     
   

    
 /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}

