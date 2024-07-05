<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\StockRequisition;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Deliverables>
 */
class DeliverablesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dr_no'=> fake()->regexify('[0-9]{8}'),
            'address'=> fake()->address(),
            'dr_date'=> now(),
            'stockrequest_id' => StockRequisition::factory(),
            // 'dr_qty' => rand(1, 10),
            'client_id'=>Client::factory(),
            'created_at' => time(),
            'updated_at' => time(),
            'remarks'=> fake()->realText(),
            'is_done' => false,
            'user_id' => User::factory()


            
        ];
    }
}
