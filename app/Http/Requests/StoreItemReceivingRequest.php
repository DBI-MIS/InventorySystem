<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemReceivingRequest extends FormRequest
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
           'sku_prefix' => 'required|string',
            'sku' => 'required|string',
            'name' => 'required|string',
            'brand_id' => 'required|integer',
            'category_id' => 'required|integer',
            'description' => 'nullable|string',
            'specs' => 'nullable|string',
            'part_no' => 'nullable|string',
            'serial_no' => 'nullable|string',
            'model_no' => 'nullable|string',
            'uom' => 'required|string',
            'quantity' => 'required|integer',
            'location_id' => 'required|integer',
            'employee_id' => 'required|integer',
            'items' => 'required|array',
            'items.*.sku_prefix' => 'required|string',
            'items.*.sku' => 'required|string',
            'items.*.name' => 'required|string',
            'items.*.brand_id' => 'required|integer',
            'items.*.category_id' => 'required|integer',
            'items.*.description' => 'nullable|string',
            'items.*.specs' => 'nullable|string',
            'items.*.part_no' => 'nullable|string',
            'items.*.serial_no' => 'nullable|string',
            'items.*.model_no' => 'nullable|string',
            'items.*.uom' => 'required|string',
            'items.*.quantity' => 'required|integer',
            'items.*.location_id' => 'required|integer',
            'items.*.employee_id' => 'required|integer',
        ];
    }
}
