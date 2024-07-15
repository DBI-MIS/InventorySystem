<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Employee extends Model
{
    use HasFactory,LogsActivity;

    protected $casts = [ 
        'created_at' => 'date: M d, Y',
    ];
    
    protected $fillable = [
        'name',
        'company',
        'department',
        'remarks',
        'user_id'
    
    ];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('employee')
            ->setDescriptionForEvent(fn(string $eventName) => "employee has been {$eventName}")
            ->logOnly([
                'name',
                'company',
                'department',
                'remarks',
                'user_id'
               
            ]); 
    }

    public function item(){
        return $this->belongsTo(item::class);
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}