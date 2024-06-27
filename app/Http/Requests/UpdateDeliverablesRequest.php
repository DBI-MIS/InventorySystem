<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDeliverablesRequest extends FormRequest
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
            "dr_no" => [
                'required' ,
                'numeric', 
            ],
            "address" => [
                'required',
                'max:255'
            ],
            "dr_date" => [
                'nullable',
                'date'
            ],
            "remarks" => [
                'nullable',
                'max:255'
            ],
            'client_id' => [
                'required',
                 'exists:clients,id'
            ],
            'stockrequest_id' => [
                'required', 
                'exists:stock_requisitions,id'
            ],
           "items" => [
                'required',
            ],
            "items.*.qty_out" => [
                'required',
                'integer',
                'min:1',
            ],
            
        ];
    }
    // created customize messages to make error message more formal and flexible
    //  e.g. the client id is required --> it should be client or project name is required
     public function messages()
     {
         return[
             'dr_no.required' => 'DR No. is required.',
             'dr_no.numeric' => 'DR No must be  numbers. ',
             'address.required' => 'Client address is required.',
             'client_id.required' => 'Client / Project name is required.',
             'stockrequest_id.required' => 'RS No. is required.',
             'list_item_id.required' => 'Group of Items is required'
 
 
 
         ];
     }
}
