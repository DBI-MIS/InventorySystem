<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReceivingItemRequest extends FormRequest
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
            'ref_id' => ['nullable', 'max:20'],
            'reference_no' => ['nullable','max:255'],
            'item_id' => [
              'required',
              'exists:items,id'],
            //   'reference_no' => [
            //     'required',
            //     'exists:receivings,reference_no'],
            //  'receiving_id' => [
            //     'required',
            //     'exists:receivings,id'],
           
        ];
    }
}
