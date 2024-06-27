<?php

namespace App\Policies;

use App\Models\Sritem;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SrItemPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Sritem $sritem)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Sritem $sritem)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Sritem $sritem)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Sritem $sritem)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Sritem $sritem)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.');
    }
}
