<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deliverables extends Model
{
    use HasFactory;

    protected $fillable = [
        'project',
        'dr_no',
        'rs_no',
        'address',
        'dr_date',
        'item_qty',
        'item_unit',
        'item_id',
        'item_description',
    ];

    public function receiving(){
        return $this->belongsTo(Receiving::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
    public function receivingAddress(){
        return $this->belongsTo(Receiving::class, 'address');
    }
    public function itemQuantity(){
        return $this->belongsTo(Item::class, 'item_qty');
    }
    public function itemUnit(){
        return $this->belongsTo(Item::class, 'item_unit');
    }
    public function itemDescription(){
        return $this->belongsTo(Item::class, 'item_description');
    }

    public function itemsDeliverables(){
        return $this->belongsToMany(Item::class, 'deliverable_item')->withTimestamps();
    }

    
}
