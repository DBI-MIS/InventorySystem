<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeliverablesRequest extends FormRequest
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
            "project" => ['required','max:255'],
            "dr_no" => ['required','max:255'],
            "rs_no" => ['required','max:255'],
            "address" => ['required','max:255'],
            "dr_date" => ['nullable','date'],
            "list_item_id" => ['required', 'exists:items,id'],
            
        ];
    }
}
