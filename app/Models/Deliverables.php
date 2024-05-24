<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deliverables extends Model
{
    use HasFactory;

    protected $fillable = [
        'project',
        'receiving_id',
        'dr_no',
        'rs_no_id',
        'address_id',
        'dr_date',
        'item_qty',
        'item_name_id',
        'item_description_id',
    ]
}
