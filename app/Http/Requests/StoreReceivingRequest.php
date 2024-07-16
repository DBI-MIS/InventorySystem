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
         "items" =>[
             'nullable'
         ],
         "items.*.id" => [
                'nullable', 'exists:items,id'
            ],
        //  'items' => 'required|array',
        //  'items.*.id' => 'nullable|exists:item_receiving,id',
        //  'items.*.name' => 'required|regex:/^[A-Za-z0-9 ]+$/|min:2|max:255',
        //  'items.*.sku' => 'required|numeric|min:2|max:255',
        //  'items.*.brand_id' => 'required|min:1|exists:brands,id',
        //  'items.*.category_id' => 'required|min:1|exists:categories,id',
        //  'items.*.description' => 'required|min:2|string',
        //  'items.*.specs' => 'required|alpha_num|string',
        //  'items.*.part_no' => 'nullable|alpha_num|max:255',
        //  'items.*.serial_no' => 'nullable|alpha_num|max:255',
        //  'items.*.model_no' => 'nullable|alpha_num|max:255',
        //  'items.*.uom' => 'required|alpha|max:20',
        //  'items.*.quantity' => 'required|numeric|min:1',
        //  'items.*.qty_out' => 'nullable|numeric|min:1',
        //  'items.*.location_id' => 'required|exists:locations,id',
        //  'items.*.employee_id' => 'nullable|exists:employees,id',
        //  'items.*.statuses' => 'required|max:255',
        //  'items.*.remark' => 'required|alpha_num|max:255',
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
