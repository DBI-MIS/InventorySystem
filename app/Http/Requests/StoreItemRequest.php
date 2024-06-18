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
          "sku_prefix" => [
            'alpha',
             'max:255'
          ],
          "sku" => [
            'numeric',
             'required',
             'min:2',
              'max:255'
          ],
          "name" => [
            'alpha_num',
            'min:2',
            'required',
            'max:255'
          ],
          'brand_id' => [
            'numeric',
            'min:2',
            'required',
            'exists:brands,id',
          ],
          "category_id" => [
            'numeric',
            'min:2',
            'required',
          'exists:categories,id',
         ],
          "description" => [
            'required',
            'min:2',
            'string'
          ],
          "specs" => [
            'alpha_num',
            'required',
            'string'
          ],
          "part_no" => [
            'alpha_num',
            'nullable',
            'max:255'
          ],
          "serial_no" => [
            'alpha_num',
            'nullable', 'max:255'
          ],
          "model_no" => [ 
            'alpha_num',
            'nullable',
            'max:255'
          ],
          "uom" => [ 
            'alpha',
            'required',
            'max:20'
          ],
          "quantity" => [ 
            'numeric',
            'required',
            'min:0',
            'max:255'
          ],
          "location_id" => [
            'numeric',
            'required',
          'exists:locations,id'
         ],
          "employee_id" => [
            'numeric',
            'required',
          'exists:employees,id',
          ],
          'statuses' => [
            'required',
            'max:255'
          ],
          "remark" => [
            'alpha_num',
            'required',
            'max:255'
          ],
      ];
  }
}