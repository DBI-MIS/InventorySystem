<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockRequisition extends Model
{
    use HasFactory;

    protected $fillable = [
        'sr_to',
        'rs_no',
        'sr_date',
        'sr_qty',
        'sr_unit',
        'sr_description',
        'sr_notes'
    ];

    // public function stockrequisition()
    // {
    //     return $this->hasMany(StockRequisition::class);
    // }

    public function deliverables()
    {
        return $this->hasOne(Deliverables::class);
    }
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    // public function rsnoStockRequest()
    // {
    //     return $this->belongsToMany(Item::class, 'stockrequest_item')->withTimestamps();
    // }

}
