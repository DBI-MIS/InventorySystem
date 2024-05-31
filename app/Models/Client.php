<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'address',
        'contact_person',
        'contact_no',
        'tin_no',
        'status',
        'remarks'
    ];
    public function receiving(){
        return $this->belongsTo(Employee::class);
    }

}
