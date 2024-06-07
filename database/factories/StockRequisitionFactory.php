<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StockRequisition>
 */
class StockRequisitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sr_to'=>fake()->sentence(),
            'sr_no'=>rand(1, 10),
            'sr_date'=>now(),
            'sr_qty'=>rand(1, 10),
            'sr_description'=>fake()->realText(),
            'sr_notes'=>fake()->sentence(),
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
