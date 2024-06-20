<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
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
            'min:1',
            'exists:brands,id',
          ],
          "category_id" => [
            'required',
            'numeric',
            'min:1',
          'exists:categories,id',
         ],
          "description" => [
            'required',
            'min:2',
            'string'
          ],
          "specs" => [
            'required',
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
            'max:255'
          ],
            ];
    }
     // created customize messages to make error message more formal and flexible
  //  example the brand id is required --> it should be brand name is required
  public function messages()
  {
      return [
          'name.required' => 'Item Name is required.',
          'name.regex' =>  'The name can only contain letters, numbers, & spaces',
          'brand_id.required' => 'Brand Name is required.',
          'brand_id.numeric' => 'Brand name is required.',
          'category_id.required' => 'Category Name is required.',
          'category_id.numeric' => 'Category Name is required.',
          'description.required' => 'Item Description is required.',
          'specs.required' => 'Item Specification is required.',
          'quantity.required' => 'Item quantity is required.',
          'location_id.required' => 'Location is required.',
          'employee_id.required' => 'Employee is required.',
          'statuses.required' => 'Item Status is required.',
          'remark.required' => 'Item Remarks is required.',
      ];
  }
}
