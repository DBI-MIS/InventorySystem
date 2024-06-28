<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReceivingRequest extends FormRequest
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
    {  return [
        "mrr_no" => [
            'required', 
            'min:8',
            'max:12'
           
        ],
        'group_item_id' => [
           'nullable',
            'exists:items,id'
        ],
        "client_id"=>
        [
            'required',  
            'min:1',
            'exists:clients,id'
        ],
        "si_no" =>[
            'required',
            'max:255'
        ],
        "deliver_id"=>[
            'required',
            'exists:deliverables,id'
        ],
        "address"=>[
            'nullable','string'
        ],
        "remarks"=>[
            'nullable',
            'string'
        ],
    ];
    }
    public function messages(){
        return[
            'mrr_no.required' => 'Mrr No. is required. ',
            'mrr_no.min' => 'Mrr No. must be at least 6 numbers. ',
            'client_id.required' => 'Client/ Project name is required.',
            'si_no.required' => " SI No. is required.",
            'deliver_id.required' => "DR No. is required."



        ];

    }
}
