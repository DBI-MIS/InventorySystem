<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSritemRequest extends FormRequest
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
            "sr_item" => ['required', 'max:255'],
            "sr_qty" => ['required', 'max:255'],
            "sr_unit" => ['required', 'max:255'],
            "sr_description" => ['required', 'max:255'],
        ];
    }
}
