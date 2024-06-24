<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {   
       
        $user = Auth::user();

        if ($user && ( $user->role === 'super_admin' || $user->role === 'admin' )) {
            return true;
        }

        return false;
      
        
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required', 'string', 'min:2','max:255'],
            "surname" => ['required', 'string', 'min:2','max:255'],
            "email"=> ['required','string', 'email', 'unique:users', 'max:255'],
            "password"=> ['required','min:6', 'confirmed',
            Password::min(8)->letters()->symbols() ],
          
            "role"=> ['required','string', ],
            // "role"=> ['required','string', 'in:[super_admin, admin, user, editor]'],
        ];
    }
}
