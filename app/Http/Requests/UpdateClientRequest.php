<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
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
            "name" => ['required', 'max:255'],
            "address" => ['required', 'max:255'],
            "contact_person"=> ['required', 'max:255'],
            "contact_no"=> ['required', 'max:13', "min:12"],
            "tin_no"=> ['required',  'max:15', 'min:12'],
            "status"=> ['required', 'max:20'],
            "remarks"=> ['nullable','string'],
        ];
    }
}
