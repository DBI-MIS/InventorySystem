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
            'receiving_id' => $this->receiving_id,
            'dr_no' => $this->dr_no,
            'rs_no' => $this->rs_no,
            'address_id' => new ReceivingResource($this->address_id),
            'dr_date' => (new Carbon($this->dr_date))->format('Y-m-d'),
            'item_qty' => new ItemResource($this->item_qty),



        ];
    }
}
