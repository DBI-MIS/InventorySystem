<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{

    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'contact_person' => $this->contact_person,
            'contact_no' => $this->contact_no,
            'tin_no' => $this->tin_no,
            'status' => $this->status,
            'remarks' => $this->remarks,
        ];
    }
}
