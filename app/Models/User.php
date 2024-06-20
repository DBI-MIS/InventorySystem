<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;


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
        'email',
        'password',
        'role'
    ];
    public function items()
    {
        return $this->hasMany(Item::class);
    }
    public function receivings(){
        return $this->belongsToMany(Receiving::class);
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
}
