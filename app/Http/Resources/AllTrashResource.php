<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllTrashResource extends JsonResource
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
            'item_id' =>$this->item_id,
            'sku_prefix' => $this->category ? $this->category->sku_prefix : null,
            'sku' => $this->sku,
            'name' => $this->name,
            'mrr_no'=> $this->mrr_no,
            'client_id'=> $this->client_id,
            'client' => new ClientResource($this->client),
        ];
    }
}
