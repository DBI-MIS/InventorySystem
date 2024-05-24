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

        $mrr_no = $this->faker->unique()->numberBetween(1, 50);
        return [
            'mrr_no'=> $mrr_no,
            'group_item_id'=>rand(1, 30),
            'client_id'=>rand(1, 10),
            'si_no'=>rand(1, 10),
            'dr_no'=>fake()->sentence('2'),
            // 'receiving_item_id'=>rand(1,20),
            'address'=>fake()->sentence('2'),
            'location_id'=>1,
            'employee_id'=>1,
            'created_at' => time(),
            'updated_at' => time(),
            'remarks'=> fake()->sentence(),
        ];
    }
}