<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLocationRequest extends FormRequest
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
                'max:255'
            ],
            "company" => [
                'nullable', 
                'alpha_num',
                'string'
            ],
            "address" => [
                'nullable',
                'regex:/(^[-0-9A-Za-z.,\/ ]+$)/', 
                'max:255'
            ],
        ];
    }
    public function messages()
    {
        return[
            'name.required' => 'Location name is required.'

        ];
    }
}
