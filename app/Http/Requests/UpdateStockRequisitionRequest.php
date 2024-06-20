<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStockRequisitionRequest extends FormRequest
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
            'rows' => 'required|array',
            'rows.*.sr_to' => 'required|string|max:255',
            'rows.*.rs_no' => 'required|string|max:255',
            'rows.*.sr_date' => 'required|date',
            'rows.*.sr_qty' => 'required|integer',
            'rows.*.sr_unit' => 'required|string|max:50',
            'rows.*.sr_description' => 'required|string|max:500',
            'rows.*.sr_notes' => 'nullable|string|max:500'
        ];
    }
}
