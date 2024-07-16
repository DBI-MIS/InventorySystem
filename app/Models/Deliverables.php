<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;

class Deliverables extends Model
{

    Use SoftDeletes,LogsActivity;

    protected $casts = [
        'id' => 'string',
        'list_item_id' => 'array',
        'created_at' => 'date: M d, Y',
        'is_done' => 'boolean'

    ];

    use HasFactory;

    protected $fillable = [
        'dr_no',
        'address',
        'stockrequest.rs_no',
        'dr_date',
        'dr_qty',
        'client_id',
        'address_id',
        'remarks',
        'status',
        'is_done',
         'user_id'
        
    ];


    protected static function boot()
    {
        parent::boot();
    
        static::created(function ($deliverable) {
            // Load related items with pivot data
            $deliverable->load('itemsDeliverables');
    
            // Prepare log message with items and their pivot data
            $itemsLog = $deliverable->itemsDeliverables->map(function ($item) {
                return [
                    'item_id' => $item->id,
                    'pivot' => $item->pivot->getAttributes(),
                ];
            })->toArray();
    
            // Log the activity
            activity()
                ->performedOn($deliverable)
                ->withProperties(['items' => $itemsLog]) 
                ->log('Deliverable created with items');
              
        });
        
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('deliverable')
            ->setDescriptionForEvent(fn(string $eventName) => "Deliverable has been {$eventName}")
            
            ->logOnly([
                'dr_no',
                'address',
                'stockrequest.rs_no',
                'client.name',
                'address_id',
                'status',
                'user.name'
               
            ])
            ->logOnlyDirty()
             ->dontSubmitEmptyLogs();
    }
    
    

    

    public function itemsDeliverables()
    {
        return $this->belongsToMany(Item::class, 'deliverable_item', 'deliverables_id', 'item_id')->withTimestamps();
    }
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function receiving()
    {
        return $this->hasMany(Receiving::class);
    }
    public function stockrequest()
    {
        return $this->belongsTo(StockRequisition::class);
    }
    

   
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    public function archive()
    {
        return $this->belongsTo(Archive::class);
    }

    
}
