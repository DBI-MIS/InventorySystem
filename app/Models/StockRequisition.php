<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class StockRequisition extends Model
{
    use HasFactory,LogsActivity;

    protected $casts = [ 
        'created_at' => 'date: M d, Y',
    ];

    protected $fillable = [
        'sr_to',
        'rs_no',
        'sr_date',
        'sr_qty',
        'sr_unit',
        'sr_item',
        'sr_description',
        'sr_notes',
        'user_id'
    ];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('stockrequisition')
            ->setDescriptionForEvent(fn(string $eventName) => "Stock Requisition has been {$eventName}")
            ->logOnly([
                'sr_to',
                'rs_no',
                'sr_date',
                 'user.name'
            ]); 
    }

    // public function stockrequisition()
    // {
    //     return $this->hasMany(StockRequisition::class);
    // }

    public function deliverables()
    {
        return $this->hasOne(Deliverables::class,'stockrequest_id');
    }
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sritems()
    {
        return $this->belongsToMany(Sritem::class, 'stock_sritem')->withTimestamps();
    }
    // public function rsnoStockRequest()
    // {
    //     return $this->belongsToMany(Item::class, 'stockrequest_item')->withTimestamps();
    // }

}
