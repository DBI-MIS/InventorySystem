<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Location extends Model
{
    use HasFactory,LogsActivity;

    protected $casts = [ 
        'created_at' => 'date: M d, Y',
    ];
    
    protected $fillable = [
        'name',
        'company',
        'address',
        'user_id'
    ];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('location')
            ->setDescriptionForEvent(fn(string $eventName) => "Location has been {$eventName}")
            ->logOnly([
                'name',
                'company',
                'address',
                 'user.name'
               
            ]); 
    }


    public function item(){
        return $this->belongsTo(item::class);
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
