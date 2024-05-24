<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockSearchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => new  ItemResource($this->id),
            'item' => new  ItemResource($this->item),
            'quantity' => new ItemResource($this->quantity),
            'uom' => new ItemResource($this->uom),
            'created_at' => new ItemResource($this->created_at),

        ];
    }
}
