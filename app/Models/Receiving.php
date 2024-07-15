<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Receiving extends Model
{
    protected $casts = [ 
        'id' => 'string' ,
         'group_item_id' => 'array',
         'created_at' => 'date: M d, Y',
];
    use HasFactory,SoftDeletes, LogsActivity;

    protected $fillable = [
        'mrr_no',
        'group_item_id', 
        'client_id',
        'si_no',
        'deliver_id',
        'address',
        'location_id',
        'employee_id',
        'remarks',
        'status',
        'sku_prefix',
        'sku',
        'name',
        'brand_id',
        'category_id',
        'description',
        'specs',
        'part_no',
        'serial_no',
        'model_no',
        'uom',
        'quantity',
        'user_id'
    
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('receiving')
            ->setDescriptionForEvent(fn(string $eventName) => "Receiving has been {$eventName}")
            ->logOnly([
                'mrr_no',
                'client_id',
                'si_no',
                'deliver_id',
                'address',
                'location_id',
                'employee_id',
                'remarks',
                'status',
                'user_id'
               
            ]); 
    }

    
    public function location(){
        return $this->belongsTo(Location::class);
    }
    public function employee(){
        return $this->belongsTo(Employee::class);
    } 
    public function category(){
        return $this->hasManyThrough(Category::class, Item::class);
    } 
    public function brand(){
        return $this->hasManyThrough(Brand::class,Item::class);
    } 
    public function items(){
        return $this->belongsToMany(Item::class, 'item_receiving')->withTimestamps();
    }
    public function client(){
        return $this->belongsTo(Client::class);
    }
    public function deliver(){
        return $this->belongsTo(Deliverables::class);
    }
    // public function createdBy(){
    //     //relation of uodated and createdby
    //     return $this->belongsTo(User::class,'created_by');
    // }
    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'created_by');
    // }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    
/**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}

