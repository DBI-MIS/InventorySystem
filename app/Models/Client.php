<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $casts = [ 
        'created_at' => 'date: M d, Y',
    ];

    protected $fillable = [
        'name',
        'address',
        'contact_person',
        'contact_no',
        'tin_no',
        'status',
        'remarks',
        'user_id'
    ];
    public function receiving(){
        return $this->belongsTo(Employee::class);
    }

    public function deliverables()
    {
        return $this->hasMany(Deliverables::class);
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }










}
