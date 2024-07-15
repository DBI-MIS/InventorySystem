<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Category extends Model
{
    use HasFactory,LogsActivity;

    protected $casts = [ 
        'created_at' => 'date: M d, Y',
    ];

    protected $fillable = [
        'name',
        'description',
        'sku_prefix',
        'user_id'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('category')
            ->setDescriptionForEvent(fn(string $eventName) => "Category has been {$eventName}")
            ->logOnly([
                'name',
                'description',
                'sku_prefix',
                'user_id'
               
            ]); 
    }

    

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