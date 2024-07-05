<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFormDataRequest extends FormRequest
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
          "sku" => [ 'max:255'],
          "name" => [ 'max:255'],
          'brand_id' => [
            
            'exists:brands,id',
        ],
          "category_id" => [
          'exists:categories,id',
        ],
      //   "receving_item_id" => ['required',
      //   'exists:receving_items,id',
      //  ],
          "description" => ['string'],
          "specs" => ['string'],
          "part_no" => [ 'max:255'],
          "serial_no" => [ 'max:255'],
          "model_no" => [ 'max:255'],
          "uom" => [ 'max:20'],
          "quantity" => [ 'max:255'],
          "qty_out" => [ 
            'nullable',
            'max:255'
          ],
          "location_id" => [
            
          'exists:locations,id',],
          "employee_id" => [
          'exists:employees,id',
          ],
          'statuses' => ['max:255'],
          "remark" => ['max:255'],
      ];
  }
}
