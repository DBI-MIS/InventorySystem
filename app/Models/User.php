<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable
{
    use HasFactory, Notifiable,LogsActivity;

    protected $casts = [ 
        'created_at' => 'date: M d, Y',
    ];


    const ROLE_SUPER_ADMIN = 'super_admin';
    const ROLE_ADMIN = 'admin';
    const ROLE_EDITOR = 'editor';
    const ROLE_USER = 'user';
    const ROLE_DEFAULT = self::ROLE_USER;


    const ROLES = [
        self::ROLE_SUPER_ADMIN => "super_admin",
        self::ROLE_ADMIN => "admin",
        self::ROLE_EDITOR => "editor",
        self::ROLE_USER => "user"
    ];

    public function isSuperAdmin(){
        return $this->role === self::ROLE_SUPER_ADMIN;
    }
    public function isAdmin(){
        return $this->role === self::ROLE_ADMIN;
    }
    public function isEditor(){
        return $this->role === self::ROLE_EDITOR;
    }
    public function isUser(){
        return $this->role === self::ROLE_USER;
    }
   
   
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'password',
        'role',
        'email_verified_at'

    ];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('user')
            ->setDescriptionForEvent(fn(string $eventName) => "User has been {$eventName}")
            ->logOnly([
               'name',
                'surname',
                'email',
                'role',
                'email_verified_at'
            ]); 
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }
    public function receivings(){
        return $this->belongsToMany(Receiving::class);
    }
    public function categories(){
        return $this->hasMany(Category::class);
    }
    public function brands(){
        return $this->hasMany(Brand::class);
    }
    public function clients(){
        return $this->hasMany(Client::class);
    }
    public function deliverables(){
        return $this->hasMany(Deliverables::class);
    }
    public function employees(){
        return $this->hasMany(Employee::class);
    }
    public function locations(){
        return $this->hasMany(Location::class);
    }
    public function stockrequisitions(){
        return $this->hasMany(StockRequisition::class);
    }
}
