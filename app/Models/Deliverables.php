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
        'rs_no',
        'dr_no',
        'address',
        'dr_date',
        'dr_qty',
        'client_id',
        'address_id',
        'rs_no_id',
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
    

    public function itemsDeliverables()
    {
        return $this->belongsToMany(Item::class, 'deliverable_item')->withTimestamps();
    }

    
}
