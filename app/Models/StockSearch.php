<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockSearch extends Model
{
    use HasFactory;

    protected $fillable = [
        'item',
        'quantity',
        'uom',
        'created_at'
    ];

    public function item(){
        return $this->belongsTo(item::class);
    }
}
