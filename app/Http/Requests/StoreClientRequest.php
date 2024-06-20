<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
            "name" => ['required', 'alpha_num', 'min:2','max:255'],
            "address" => ['required', 'regex:/(^[-0-9A-Za-z.,\/ ]+$)/','min:2','max:255'],
            "contact_person"=> ['required','min:3', 'alpha','max:255'],
            "contact_no"=> ['required','regex:/^[0-9+]+$/', 'max:13', "min:12"],
            "tin_no"=> ['required','regex:/^[0-9-]+$/', 'max:15', 'min:12'], //num & hypen only
            "status"=> ['required','min:2', 'max:20'],
            "remarks"=> ['nullable','string'],
        ];
    }
    public function messages(){
        return[
            'name.required' => 'Client / Project name is required.',
            'name.alpha_num' => 'Client / Project name must only contain letters and numbers.',
            'name.min' => 'Client / Project name must be at least 2 letters.',
            'address.required' => 'Client address is required.',
            'address.regrex' => 'Client adrress format is invalid.',
            'address.min' => 'Client address must be a valid address.',
            'contact_person.required' => 'Contact person  is required.',
            'contact_person.regrex' => 'Contact person format is invalid.',
            'contact_person.min' => 'Contact person must be at least 3 letters and a valid name.',
            'contact_no' => 'Contact No. is required',
            'tin_no.required' => 'TIN No. is required.',
            'tin_no.regrex' => 'TIN No. must only contain numbers',
            'tin_no.min' => 'TIN No. must be at least 9 numbers.',
            'status.required' => 'Client status is required.'
        ];

    }
}
