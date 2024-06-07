<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Item extends Model
{
    protected $casts =
     [ 'id' => 'string' ,
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
        'location_id',
        'employee_id',
        'statuses',
        'remark',
    
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
 /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}