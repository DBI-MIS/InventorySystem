<?php

namespace App\Http\Resources;

use App\Models\Category;
use App\Models\Item;
use App\Models\Receiving;
use App\Models\ReceivingItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReceivingResource extends JsonResource
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
        
        return[
            'id' => $this->id,
            'mrr_no'=> $this->mrr_no,
            'group_item_id' => $this->group_item_id,
            'client_id'=> $this->client_id,
            'client' => new ClientResource($this->client),
            'si_no'=> $this->si_no,
            'deliver_id'=> $this->deliver_id,
            'deliver' => new DeliverablesResource($this->deliver),
            'address'=> $this->address,
            'location_id'=> $this->location_id,
            'location' => new LocationResource($this->location),
            'status'=>  $this->status,
            'remarks'=>  $this->remarks,
            'sku_prefix' => $this->category ? $this->category->sku_prefix : null,
            'sku' => $this->sku,
            'name' => $this->name,
            'receivings' =>  ReceivingResource::collection($this->whenLoaded('receivings')),
            'brand_id' => $this->brand_id,
            'brand' => new BrandResource($this->brand),
            'category_id' => $this->category_id,
            'category' => new CategoryResource($this->category),
            'description' => $this->description,
            'employee_id' => $this->employee_id,
            'employee' => new EmployeeResource($this->employee),
            'specs' => $this->specs,
            'part_no' => $this->part_no,
            'serial_no' => $this->serial_no,
            'model_no' => $this->model_no,
            'uom' => $this->uom,
            'quantity' => $this->quantity,
            'created_at' => (new Carbon($this->created_at))->format('m-d-Y'),
            'items' => ItemResource::collection($this->whenLoaded('items'))
             

        ];
    }
}
