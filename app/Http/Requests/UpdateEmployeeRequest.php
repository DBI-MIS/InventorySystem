<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => [
                'required',
                'alpha',
                'min:2', 
                'max:255'
            ],
            "company" => [
                'nullable', 
                'alpha', 
                'max:255'
            ],
            "department" => [
                'nullable', 
                'alpha', 
                'max:255'
            ],
            "remarks" => ['
                nullable',
                'string'
            ],
        ];
    }
    public function messages()
    {
        return[
            'name.required' => 'Employee name is required.'

        ];
    }
}
