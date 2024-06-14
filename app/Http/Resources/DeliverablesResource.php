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
            'rs_no_id' => $this->rs_no_id,
            'rs_no' => new StockRequisitionResource($this->rs_no),
            'address' => $this->address,
            // 'address' => new ReceivingResource($this->address),
            'dr_date' => (new Carbon($this->dr_date))->format('Y-m-d'),
            'dr_qty' => $this->dr_qty,
            'list_item_id' => $this->item_id,
            'created_at' => (new Carbon($this->created_at))->format('m-d-Y'),
            'remarks'=>  $this->remarks,
            
          
           







        ];
    }
}
