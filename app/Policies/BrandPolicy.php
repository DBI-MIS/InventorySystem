<?php

namespace App\Policies;

use App\Models\Brand;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BrandPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.'); //message
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Brand $brand)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to view this page.'); //message
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to create brand.'); //message
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Brand $brand)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to update brand.'); //message
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Brand $brand)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin()) {
            return Response::allow(); 
        }
 
        return Response::deny('F0RBIDDEN! You are not authorize to delete brand.'); //message
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Brand $brand)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to restore brand.'); //message
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Brand $brand)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to permanently delete brand.'); //message
    }
}
