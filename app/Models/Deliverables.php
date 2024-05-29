<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deliverables extends Model
{

    protected $casts = [
        'id' => 'string',
        'list_item_id' => 'array',

    ];

    use HasFactory;

    protected $fillable = [
        'project',
        'group_item_id',
        'dr_no',
        'rs_no',
        'address',
        'dr_date',
        'project_id',
        'address_id',
        'rs_no_id',
    ];


    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function itemsDeliverables(){
        return $this->belongsToMany(Item::class, 'deliverable_item')->withTimestamps();
    }

    
}
