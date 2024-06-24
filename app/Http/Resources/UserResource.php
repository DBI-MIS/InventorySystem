<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'surname' => $this->surname,
            'email' => $this->email,
            //   'email_verified_at' => (new Carbon($this->created_at))->format('Y-m-d H:i:s'),
            //   'email_verified_at' => (new Carbon($this->now()))->utc()->format('Y-m-d\TH:i:s.u\Z'),
            'password' => $this->password,
            'role' => $this->role,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d H:i:s'),
        ];
    }
}
