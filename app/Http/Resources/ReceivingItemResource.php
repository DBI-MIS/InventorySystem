<?php

namespace App\Http\Resources;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReceivingItemResource extends JsonResource
{
      // disable wrap para mag populate yubg existing info sa edit
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
            'ref_id' => $this->ref_id,
            'reference_no'=> $this->reference_no,
            // 'item_id'=> $this->item_id,
            // 'item' => new ItemResource($this->item),
            'receiving' => new ReceivingResource($this->receiving),
            'receiving_id'=> $this->receiving_id,
            // 'receiving' => new ReceivingResource($this->receiving),
        ];
    }
}
