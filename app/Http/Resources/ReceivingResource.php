<?php

namespace App\Http\Resources;

use App\Models\Category;
use App\Models\Receiving;
use App\Models\ReceivingItem;
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
            'group_item_id'=> $this->group_item_id,
            'item' => new ItemResource($this->item),
            'client_id'=> $this->client_id,
            // 'client' => new ClientResource($this->client),
            'si_no'=> $this->si_no,
            'dr_no'=> $this->dr_no,
            'address'=> $this->address,
            'location_id'=> $this->location_id,
            'location' => new LocationResource($this->location),
            'employee_id'=> $this->employee_id,
            'employee' => new EmployeeResource($this->employee),
            'created_at' =>  $this->created_at,
            'updated_at' => $this->updated_at,
            'remarks'=>  $this->remarks,

        ];
    }
}
