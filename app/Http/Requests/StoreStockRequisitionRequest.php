<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStockRequisitionRequest extends FormRequest
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
            "sr_to" => ['required', 'max:255'],
            "rs_no" => ['required', 'max:255'],
            "sr_date" => ['nullable', 'date'],
            "sr_notes" => ['nullable', 'max:255'],
            'items' => 'required|array',
            'items.*.id' => 'nullable|exists:sritems,id',
            'items.*.sr_item' => 'required|string|max:255',
            'items.*.sr_qty' => 'required|integer',
            'items.*.sr_unit' => 'required|string|max:50',
            'items.*.sr_description' => 'nullable|string',
            

        ];
    }
}
