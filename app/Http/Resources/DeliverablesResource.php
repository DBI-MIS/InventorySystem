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
            'client_id' => $this->client_id,
            'client' => new ClientResource($this->client),
            'dr_no' => $this->dr_no,
            'stockrequest_id' => $this->stockrequest_id,
            'stockrequest' => new StockRequisitionResource($this->stockrequest),
            'rs_no' => new StockRequisitionResource($this->rs_no),
            'address' => $this->address,
            'status' => $this->status,
            'is_done' => $this->is_done ? 'processed' : 'pending',
            'dr_date' => (new Carbon($this->dr_date))->format('Y-m-d'),
            'created_at' => (new Carbon($this->created_at))->format('m-d-Y'),
            'remarks'=>  $this->remarks,
            'items' => ItemResource::collection($this->whenLoaded('itemsDeliverables')),
           







        ];
    }
}
