<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $casts = [ 
    'created_at' => 'date: M d, Y',
    ];

    protected $fillable = [
        'name',
        'description',
          'user_id'
    ];

    public function item(){
        return $this->belongsTo(item::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function location(){
        return $this->belongsTo(Location::class);
    }
    public function employee(){
        return $this->belongsTo(Employee::class);
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}