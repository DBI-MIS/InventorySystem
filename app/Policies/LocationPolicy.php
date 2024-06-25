<?php

namespace App\Policies;

use App\Models\Location;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LocationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
          if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.'); 
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Location $location)
    {
          if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page.'); 
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
          if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to create location.'); 
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Location $location)
    {
          if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to update location.'); 
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Location $location)
    {
          if ($user->isSuperAdmin() || $user->isAdmin()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to delete location.'); 
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Location $location)
    {
          if ($user->isSuperAdmin() || $user->isAdmin()  ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to restore location.'); 
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Location $location)
    {
          if ($user->isSuperAdmin() || $user->isAdmin()  ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to permanently delete location.'); 
    }
}
