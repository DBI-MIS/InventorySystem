<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\User;
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
            'rs_no'=> fake()->regexify('[0-9]{6}'),
            'sr_date'=>now(),
            'sr_qty'=>rand(1, 10),
            'sr_unit'=>rand(1, 10),
            'sr_description'=>fake()->realText(),
            'sr_notes'=>fake()->sentence(),
            'created_at' => time(),
            'updated_at' => time(),
            'user_id' => User::factory()
        ];
    }
}
