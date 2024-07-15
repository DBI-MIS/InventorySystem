<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Sritem extends Model
{
    use HasFactory, LogsActivity;

    protected $casts = [ 
        'created_at' => 'date: M d, Y',
    ];
    
    protected $fillable = [
        'sr_item',
        'sr_qty',
        'sr_unit',
        'sr_description', 
     ];
     public function getActivitylogOptions(): LogOptions
     {
         return LogOptions::defaults()
             ->useLogName('sritem')
             ->setDescriptionForEvent(fn(string $eventName) => "SrItem has been {$eventName}")
             ->logOnly([
                'sr_item',
                'sr_qty',
                'sr_unit',
                'sr_description', 
                
             ]); 
     }
 
     public function sritem_stock()
     {
         return $this->belongsToMany(StockRequisition::class, 'stock_sritem')->withTimestamps();
     }
}
