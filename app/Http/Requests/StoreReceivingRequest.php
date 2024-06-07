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
        'group_item_id' => [
            'nullable',
            'exists:items,id'],
        "client_id"=>['nullable', 'max:255'],
        "si_no" =>['required', 'max:255'],
        "deliver_id"=>['exists:deliverables,id'],
        "address"=>['nullable','string'],
        "remarks"=>['nullable','string'],
    ];
    }
}
