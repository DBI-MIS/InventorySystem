<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.'); 
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function view(User $user, User $model)
    {
        
          if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to cto access this page.'); 
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        
          if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.'); 
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, user $model)
    {
        
          if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.'); 
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, user $model)
    {
        if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to delete users.'); 
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, user $model)
    {
        
          if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to restore users.'); 
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, user $model)
    {
        
          if ($user->isSuperAdmin() || $user->isAdmin()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to permanently delete users.'); 
        //
    }
}
