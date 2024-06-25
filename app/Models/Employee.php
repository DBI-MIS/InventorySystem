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
        'remarks',
        'user_id'
    
    ];

    public function item(){
        return $this->belongsTo(item::class);
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}