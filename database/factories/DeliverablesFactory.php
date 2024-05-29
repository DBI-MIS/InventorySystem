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
            'project'=> fake()->sentence('1'),
            'list_item_id'=>rand(1, 30),
            'dr_no'=> random_int('10', '20'),
            'rs_no'=> rand(1, 10),
            'address'=> fake()->address(),
            'dr_date'=> now(),


            
        ];
    }
}
