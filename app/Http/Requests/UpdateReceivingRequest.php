<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReceivingRequest extends FormRequest
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
            "client_id" => [ 
                'required',  
                'min:1',
                'exists:clients,id'
            ],
            "mrr_no" => [
                'required', 
                'min:6',
                'max:6'
            ],
            'group_item_id' => [
                'nullable',
                'exists:items,id'
            ],
            "si_no" => [
                'required',
                 'max:255'
            ],
            "deliver_id" => [
                'required',
                'exists:deliverables,id'
            ],
            "address" => [
                'nullable',
                'string'
            ],
            "remarks" => [
                'nullable',
                'string'
            ],
        ];
    }
}
