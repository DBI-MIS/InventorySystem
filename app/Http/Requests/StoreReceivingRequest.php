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
            'nullable',
            Rule::unique('receivings', 'mrr_no')->ignore($this->receiving),
        ],
            //Rule::unique('receivings')->ignore($receiving->id),
        // Rule::unique('receivings', 'mrr_no')->ignore($this->receiving),
       // 'mrr_no' => "nulllable|unique:receivings,mrr_no,{$this->route($key)}",
        'group_item_id' => [
            'nullable',
            'exists:items,id'],
        "client_id" => ['nullable', 'max:255'],
        "si_no" => ['required', 'max:255'],
        "dr_no" => ['required', 'max:255'],
        "address" => ['nullable','string'],
        // "reference_no" => ['nullable','max:255'],
        // 'item_id' => [
        //   'required',
        //   'exists:items,id'],
        // 'receiving_item_id' => [
        //     'required',
        //     'exists:receiving_items,id'],
        // "location_id" => ['required',
        // 'exists:locations,id',
        // ],
        // "employee_id" => ['required',
        // 'exists:employees,id',
        // ],
        "remarks" => ['nullable','string'],
    ];
    }
}
