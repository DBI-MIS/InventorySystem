<?php

namespace App\Policies;

use App\Models\Item;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ArchivePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        if ($user->isSuperAdmin() || $user->isAdmin()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.'); 
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Item $item)
    {
        if ($user->isSuperAdmin() || $user->isAdmin()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Item $item)
    {

    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Item $item)
    {
       
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Item $item)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to restore items.'); //message
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Item $item)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to permanently delete items.'); //message
    }
}
