<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockRequisitionResource extends JsonResource
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
            'sr_to' => $this->sr_to,
            'rs_no' => $this->rs_no,
            'sr_date' => $this->sr_date,
            'sr_qty' => $this->sr_qty,
            'item_id' => $this->item_id,
            'sr_description' => $this->sr_description,
            'sr_notes' => $this->sr_notes,
            'created_at' => (new Carbon($this->created_at))->format('m-d-Y'),
        ];
    }
}
