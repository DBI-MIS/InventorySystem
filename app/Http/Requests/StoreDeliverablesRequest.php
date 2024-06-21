<?php

namespace App\Http\Requests;

use App\Rules\QtyOutDoesNotExceedQuantity;
use Closure;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

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
            "dr_qty" => [
                'nullable',
                'max:255'
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
   
    
    public function messages()
    {
        return[
            'dr_no.required' => 'DR No. is required.',
            'dr_no.numeric' => 'DR No must be  numbers. ',
            'address.required' => 'Client address is required.',
            'client_id.required' => 'Client / Project name is required.',
            'stockrequest_id.required' => 'RS No. is required.',
            'items' => 'Items required',
            'items.*.qty_out.required' => 'Each item must have a quantity.',



        ];
    }
}
