<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreItemRequest extends FormRequest
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
          "sku" => [
            'required',
            'numeric',
             'min:2',
              'max:255'
          ],
          "name" => [
            'required',
            'regex:/^[A-Za-z0-9 ]+$/',
            'min:2',
            'max:255'
          ],
          'brand_id' => [
            'required',
            'numeric',
            'min:2',
            'exists:brands,id',
          ],
          "category_id" => [
            'required',
            'numeric',
            'min:2',
          'exists:categories,id',
         ],
          "description" => [
            'required',
            'min:2',
            'string'
          ],
          "specs" => [
            'required',
            'alpha_num',
            'string'
          ],
          "part_no" => [
            'nullable',
            'alpha_num',
            'max:255'
          ],
          "serial_no" => [
            'nullable',
            'alpha_num',
             'max:255'
          ],
          "model_no" => [ 
            'nullable',
            'alpha_num',
            'max:255'
          ],
          "uom" => [ 
            'required',
            'alpha',
            'max:20'
          ],
          "quantity" => [ 
            'required',
            'numeric',
            'min:0',
          
          ],
          "location_id" => [
            'required',
            'numeric',
          'exists:locations,id'
         ],
          "employee_id" => [
            'required',
            'numeric',
          'exists:employees,id',
          ],
          'statuses' => [
            'required',
            'max:255'
          ],
          "remark" => [
            'required',
            'alpha_num',
            'max:255'
          ],
      ];
  }
}