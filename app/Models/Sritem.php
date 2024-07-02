<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sritem extends Model
{
    use HasFactory;

    protected $casts = [ 
        'created_at' => 'date: M d, Y',
    ];
    
    protected $fillable = [
        'sr_item',
        'sr_qty',
        'sr_unit',
        'sr_description', 
     ];
 
     public function sritem_stock()
     {
         return $this->belongsToMany(StockRequisition::class, 'stock_sritem')->withTimestamps();
     }
}
