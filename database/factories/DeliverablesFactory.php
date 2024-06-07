<?php

namespace Database\Factories;

use App\Models\Client;
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
            'list_item_id'=>rand(1, 30),
            'dr_no'=> random_int('10', '20'),
            'rs_no'=> rand(1, 10),
            'address'=> fake()->address(),
            'dr_date'=> now(),
            'dr_qty' => rand(1, 10),
            'client_id'=>Client::factory(),
            'created_at' => time(),
            'updated_at' => time(),
            'remarks'=> fake()->realText(),


            
        ];
    }
}
