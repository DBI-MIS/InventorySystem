<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Archive extends Model
{
    use HasFactory, SoftDeletes;

    protected $casts = [ 
    'created_at' => 'date: M d, Y',
    ];
    
    protected $fillable = [
        'item_id',
        'mrr_id',
        'deliverable_id',
        'trashed_from',
    ];


    public function items()
    {
        return $this->hasMany(Item::class);
    }
    public function item()
    {
        return $this->hasMany(Item::class);
    }
    public function recevings()
    {
        return $this->hasMany(Receiving::class);
    }
    public function deliverables()
    {
        return $this->hasMany(Deliverables::class);
    }
}
