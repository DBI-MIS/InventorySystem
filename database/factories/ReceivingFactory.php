<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Item;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Material>
 */
class ReceivingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $mrr_no = $this->faker->unique()->regexify('[0-9]{6}');
        return [
            'mrr_no'=> $mrr_no,
            'group_item_id'=>rand(1, 30),
            'client_id'=>rand(1, 10),
            'si_no'=>rand(1, 10),
            'dr_no'=>fake()->regexify('[0-9]{6}'),
            // 'receiving_item_id'=>rand(1,20),
            'address'=>fake()->address(),
            'location_id'=> 1,
            'employee_id'=> 1,
            'created_at' => time(),
            'updated_at' => time(),
            'remarks'=> fake()->realText(),
        ];
    }
}