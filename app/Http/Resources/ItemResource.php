<?php

namespace App\Http\Resources;

use App\Models\ReceivingItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
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
            'id' => $this->id ,
            'sku_prefix' => $this->category ? $this->category->sku_prefix : null,
            'sku' => $this->sku,
            'name' => $this->name,
            'receivings' =>  ReceivingResource::collection($this->whenLoaded('receivings')),
            'brand_id' => $this->brand_id,
            'brand' => new BrandResource($this->brand),
            'category_id' => $this->category_id,
            'category' => new CategoryResource($this->category),
            'description' => $this->description,
            'specs' => $this->specs,
            'part_no' => $this->part_no,
            'serial_no' => $this->serial_no,
            'model_no' => $this->model_no,
            'uom' => $this->uom,
            'quantity' => $this->quantity,
            'qty_out' => $this->qty_out,
            'location_id' => $this->location_id,
            'employee_id' => $this->employee_id,
            'location' => new LocationResource($this->location),
            'employee' => new EmployeeResource($this->employee),
            'statuses' => $this->statuses,
            'is_done' => $this->is_done ? 'processed' : 'pending',
            'remark' => $this->remark,
            'created_at' => (new Carbon($this->created_at))->format('m-d-Y'),
            'updatedBy' => new UserResource($this->updatedBy),  
        ];
    }
}