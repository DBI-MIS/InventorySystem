<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Deliverables extends Model
{

    Use SoftDeletes;

    protected $casts = [
        'id' => 'string',
        'list_item_id' => 'array',
        'created_at' => 'date: m-d-Y',

    ];

    use HasFactory;

    protected $fillable = [
        'dr_no',
        'address',
        'stockrequest_id',
        'dr_date',
        'dr_qty',
        'client_id',
        'address_id',
        'remarks',
         'user_id'
        
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
    public function stockrequest()
    {
        return $this->belongsTo(StockRequisition::class);
    }
    

    public function itemsDeliverables()
    {
        return $this->belongsToMany(Item::class, 'deliverable_item', 'deliverables_id', 'item_id')->withTimestamps();
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    
}
