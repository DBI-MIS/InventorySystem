<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
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
            "name" => ['required','alpha:ascii', 'min:2', 'max:255'],
            "description" => ['nullable','string' ],
            "sku_prefix" => ['required','alpha:ascii', 'max:3', "min:3"],
            
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Category ame is required.',
            'sku_prefix.required' => 'Sku Prefix is required.',
            'sku_prefix.min' => 'Sku prefix must be at least 3 letters',
            
        ];
    }
    
}
