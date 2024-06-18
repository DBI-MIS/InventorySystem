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
            "name" => [
                'required',
                 'alpha', 
                 'min:2',
                 'max:255'
                ],
            "address" => [
                'required', 
                'regex:/(^[-0-9A-Za-z.,\/ ]+$)/',
                'min:2','max:255'
                ],
            "contact_person"=> [
                'required',
                 'min:2', 
                 'alpha',
                 'max:255'
                ],
            "contact_no"=> [
                'required',
                'regex:/^[0-9+]+$/', 
                'max:13', "min:12"
                 ],
            "tin_no"=> [
                'required',
                'regex:/^[0-9-]+$/',  //num & hypen only
                'max:15', 
                'min:12'
                ],
            "status"=> [
                'required',
                'min:2', 
                'max:20'
                ],
            "remarks"=> [
                'nullable',
                'string'
                 ],
        ];
    }
}
