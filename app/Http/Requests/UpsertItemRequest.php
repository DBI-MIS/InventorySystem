<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpsertItemRequest extends FormRequest
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
         
        'items' => 'required|array',
        'items.*.id' => 'required|exists:items,id',
        'items.*.qty_out' => 'required|integer|min:1',
         
      ];
      
  }

 
  public function messages()
{
    return [
        'items.required' => 'Item is required.',
       
    ];
}
}