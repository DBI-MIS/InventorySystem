<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
       $user = $this->route("user");
        return [
            "name" => ['required', 'string', 'min:2','max:255'],
            "surname" => ['required', 'string', 'min:2','max:255'],
            "email" => [
                "required", 
                "email", 
                Rule::unique('users')->ignore($user->id)
            ],
            "password" => [
                'nullable',
                'confirmed',
                Password::min(8)->letters()->symbols(),
            ],
            "role"=> ['required','string', ],
            // "role"=> ['required','string', 'in:[super_admin, admin, user, editor]'],
        ];
    }
}
