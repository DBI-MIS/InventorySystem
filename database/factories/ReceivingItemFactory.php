<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReceivingItem>
 */
class ReceivingItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ref_id'=>rand(1, 30),
            'reference_no'=>rand(1,20),
            'item_id'=>rand(1, 30),
            // 'receiving_id'=>rand(1, 30),
        ];
    }
}
