<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'company',
        'department',
        'remarks'
    ];

    public function item(){
        return $this->belongsTo(item::class);
    }
}