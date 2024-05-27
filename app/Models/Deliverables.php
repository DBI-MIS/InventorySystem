<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deliverables extends Model
{
    use HasFactory;

    protected $fillable = [
        'project',
        'receiving_id',
        'dr_no',
        'rs_no',
        'address_id',
        'dr_date',
        'item_qty',
        'item_unit',
        'item_name_id',
        'item_description_id',
    ];

    public function receiving(){
        return $this->belongsTo(Receiving::class);
    }
    public function item(){
        return $this->belongsTo(Item::class);
    }
    public function receivingAddress(){
        return $this->belongsTo(Receiving::class, 'address_id');
    }
    public function itemQuantity(){
        return $this->belongsTo(Item::class, 'item_qty');
    }
    public function itemName(){
        return $this->belongsTo(Item::class, 'item_name_id');
    }
    public function itemUnit(){
        return $this->belongsTo(Item::class, 'item_unit');
    }
    public function itemDescription(){
        return $this->belongsTo(Item::class, 'item_description_id');
    }

    
}
