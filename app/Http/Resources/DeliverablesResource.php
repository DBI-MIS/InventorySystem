<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliverablesResource extends JsonResource
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
            'project' => $this->project,
            'dr_no' => $this->dr_no,
            'rs_no' => $this->rs_no,
            'address' => $this->address,
            // 'address' => new ReceivingResource($this->address),
            'dr_date' => (new Carbon($this->dr_date))->format('Y-m-d'),
            'item_qty' => $this->item_qty,
            'quantity' => new ItemResource($this->quantity),
            'item_unit' => $this->item_unit,
            'uom' => new ItemResource($this->uom),
            'item_id' => $this->item_id,
            'name' => new ItemResource($this->name),
            'item_description' => $this->item_description_id,
            'description' => new ItemResource($this->description),







        ];
    }
}
