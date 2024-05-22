<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceivingItem extends Model
{
    protected $casts = [ 
        'id' => 'string' ,
        'item_id' => 'array',
    ];
   
    use HasFactory;
    protected $fillable = [
        'ref_id',
        'reference_no',
        'item_id',
         'receiving_id',
       
    
    ];
    // // Accessor to deserialize array data when retrieved
    // public function getYourColumnAttribute($value)
    // {
    //     return json_decode($value, true);
    // }

    // // Mutator to serialize array data before saving
    // public function setYourColumnAttribute($value)
    // {
    //     $this->attributes['item_id'] = json_encode($value);
    // }

    public function items(){
        return $this->hasMany(Item::class);
    }
    
    public function receiving(){
        return $this->belongsTo(Receiving::class);
    }
    // public function receivings(){
    //     return $this->hasMany(Receiving::class, 'receiving_item_id');
    // }
}
