<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'sku_prefix',
        'user_id'
    ];

    public function item(){
        return $this->belongsTo(item::class);
    }
    public function receiving(){
        return $this->belongsTo(Receiving::class);
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}