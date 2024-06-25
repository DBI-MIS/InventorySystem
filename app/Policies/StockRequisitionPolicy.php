<?php

namespace App\Policies;

use App\Models\StockRequisition;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class StockRequisitionPolicy
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
    public function view(User $user, StockRequisition $stockRequisition)
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
 
        return Response::deny('You are not authorize to create SR.'); 
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, StockRequisition $stockRequisition)
    {
         if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to update SR.'); 
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, StockRequisition $stockRequisition)
    {
         if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to delete SR.'); 
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, StockRequisition $stockRequisition)
    {
         if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to restore SR.'); 
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, StockRequisition $stockRequisition)
    {
         if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to permanently delete SR.'); 
    }
}
