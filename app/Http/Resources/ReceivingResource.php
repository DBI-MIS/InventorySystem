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
            // 'client' => new ClientResource($this->client),
            'si_no'=> $this->si_no,
            'dr_no'=> $this->dr_no,
            'address'=> $this->address,
            'location_id'=> $this->location_id,
            'location' => new LocationResource($this->location),
            'employee_id'=> $this->employee_id,
            'employee' => new EmployeeResource($this->employee),
            'remarks'=>  $this->remarks,
            'created_at' => (new Carbon($this->created_at))->format('m-d-Y'),
            // 'createdBy' => new UserResource($this->createdBy),
            // 'created_by' => $this->user ? $this->user->name : null,
             

        ];
    }
}
