<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SritemResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sr_item' => $this->sr_item,
            'sr_qty' => $this->sr_qty,
            'sr_unit' => $this->sr_unit,
            'sr_description' => $this->sr_description,
        ];
    }
}
