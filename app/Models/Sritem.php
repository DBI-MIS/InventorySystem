<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sritem extends Model
{
    use HasFactory;

    protected $fillable = [
       'item',
       'qty',
       'uom',
       'description', 
    ];

    public function sritem_stock()
    {
        return $this->belongsToMany(StockRequisition::class, 'stock_sritem')->withTimestamps();
    }
}
