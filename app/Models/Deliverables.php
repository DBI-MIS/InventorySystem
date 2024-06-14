<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deliverables extends Model
{

    protected $casts = [
        'id' => 'string',
        'list_item_id' => 'array',
        'created_at' => 'date: m-d-Y'

    ];

    use HasFactory;

    protected $fillable = [
        'list_item_id',
        'dr_no',
        'address',
        'stock_requisition_id',
        'dr_date',
        'dr_qty',
        'client_id',
        'address_id',
        'remarks',
        'created_by'
        
    ];


    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function receiving()
    {
        return $this->hasMany(Receiving::class);
    }
    public function stock_requisition()
    {
        return $this->belongsTo(StockRequisition::class);
    }
    

    public function itemsDeliverables()
    {
        return $this->belongsToMany(Item::class, 'deliverable_item')->withTimestamps();
    }

    
}
