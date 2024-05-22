<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deliverables extends Model
{
    use HasFactory;

    protected $fillable = [
        'item',
        'quantity',
    ];

    public function item(){
        return $this->belongsTo(item::class);
    }
}
