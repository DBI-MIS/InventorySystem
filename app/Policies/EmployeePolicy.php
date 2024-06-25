<?php

namespace App\Policies;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EmployeePolicy
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
    public function view(User $user, Employee $employee)
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
 
        return Response::deny('You are not authorize to create employee.'); 
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Employee $employee)
    {
         if ($user->isSuperAdmin() || $user->isAdmin() || $user->isEditor() || $user->isUser()) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to update employee.'); 
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Employee $employee)
    {
         if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to delete employee.'); 
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Employee $employee)
    {
         if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to restore employee.'); 
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Employee $employee)
    {
         if ($user->isSuperAdmin() || $user->isAdmin() ) {
            return Response::allow(); 
        }
 
        return Response::deny('You are not authorize to permanently  delete employee.'); 
    }
}
