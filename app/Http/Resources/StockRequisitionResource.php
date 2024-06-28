<?php

namespace App\Http\Resources;

use App\Models\Sritem;
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
            'sr_item' => $this->sr_item,
            'sr_qty' => $this->sr_qty,
            'sr_unit' => $this->sr_unit,
            'sr_description' => $this->sr_description,
            'sr_notes' => $this->sr_notes,
            'created_at' => (new Carbon($this->created_at))->format('m-d-Y'),
            'items' => SritemResource::collection($this->whenLoaded('sritems')),
        ];
    }
}
