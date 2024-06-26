<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receiving extends Model
{
    protected $casts = [ 
        'id' => 'string' ,
         'group_item_id' => 'array',
         'created_at' => 'date: m-d-Y'
];
    use HasFactory;

    protected $fillable = [
        'mrr_no',
        'group_item_id', 
        'client_id',
        'si_no',
        'deliver_id',
        'address',
        'location_id',
        'employee_id',
        'remarks',
        'user_id'
    
    ];
    
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
    public function items(){
        return $this->belongsToMany(Item::class, 'item_receiving')->withTimestamps();
    }
    public function client(){
        return $this->belongsTo(Client::class);
    }
    public function deliver(){
        return $this->belongsTo(Deliverables::class);
    }
    // public function createdBy(){
    //     //relation of uodated and createdby
    //     return $this->belongsTo(User::class,'created_by');
    // }
    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'created_by');
    // }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}

