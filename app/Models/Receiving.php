<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receiving extends Model
{
    protected $casts = [ 
        'id' => 'string' ,
        'group_item_id' => 'array',
];
    use HasFactory;

    protected $fillable = [
        'mrr_no',
        'group_item_id', 
        'client_id',
        'si_no',
        'dr_no',
        'address',
        // 'receiving_item_id',
        'location_id',
        'employee_id',
        'remarks',
    
    ];



    public function items(){
        return $this->hasMany(Item::class);
    }
    public function location(){
        return $this->belongsTo(Location::class);
    }
    public function employee(){
        return $this->belongsTo(Employee::class);
    } 
    public function category(){
        return $this->hasManyThrough(Category::class, Item::class);
    } 
    public function brand(){
        return $this->hasManyThrough(Brand::class,Item::class);
    } 
    
}

