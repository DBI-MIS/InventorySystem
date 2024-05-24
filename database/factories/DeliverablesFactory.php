<?php

namespace Database\Factories;

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
            'project'=> fake()->sentence('2'),
            'receiving_id'=> rand(1, 1000),
            'dr_no'=> random_int('10', '20'),
            'rs_no_id'=> rand(1, 1000),
            'address_id'=> fake()->sentence(),
            'dr_date'=> fake()->dateTimeThisM()->format('Y-m-d H:i:s'),
            'item_qty'=> rand(1, 1000),
            'project'=> fake()->sentence('2'),
            'item_description_id'=>fake()->realText(),
        ];
    }
}
