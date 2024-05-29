<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReceivingRequest extends FormRequest
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
            "client_id" => ['nullable', 'max:255'],
            "mrr_no" => ['nullable', 'max:255'],
            'group_item_id' => [
                'nullable',
                'exists:items,id'],
            "si_no" => ['required', 'max:255'],
            "dr_no" => ['required', 'max:255'],
            "address" => ['nullable','string'],
            "remarks" => ['nullable','string'],
        ];
    }
}
