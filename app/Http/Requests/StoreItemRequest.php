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
            'required',
             'max:255'
          ],
          "sku" => [
             'required',
              'max:255'
          ],
          "name" => [
            'required',
            'max:255'
          ],
          'brand_id' => [
            'required',
            'exists:brands,id',
          ],
          "category_id" => [
            'required',
          'exists:categories,id',
         ],
          "description" => [
            'required',
            'string'
          ],
          "specs" => [
            'required',
            'string'
          ],
          "part_no" => [
            'nullable',
            'max:255'
          ],
          "serial_no" => [
            'nullable', 'max:255'
          ],
          "model_no" => [ 
            'nullable',
            'max:255'
          ],
          "uom" => [ 
            'required',
            'max:20'
          ],
          "quantity" => [ 
            'required',
            'max:255'
          ],
          "location_id" => [
            'required',
          'exists:locations,id'
         ],
          "employee_id" => [
            'required',
          'exists:employees,id',
          ],
          'statuses' => [
            'required',
            'max:255'
          ],
          "remark" => [
            'required',
            'max:255'
          ],
      ];
  }
}