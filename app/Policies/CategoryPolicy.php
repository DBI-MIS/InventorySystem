<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to access this page'); 
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Category $category)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to view this page'); 
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to create category.'); 
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Category $category)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser() ) {
            return Response::allow(); 
        }
 
        return Response::deny('F0RBBIDEN! You are not authorize to update category.'); 
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Category $category)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to delete category.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Category $category)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to restore category.'); 
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Category $category)
    {
        
        if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() ) {
            return Response::allow(); 
        }
 
        return Response::deny('FORBBIDEN! You are not authorize to permanently delete category.'); 
    }
}
