<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sku'=> rand(6000,6300),
            'name'=> fake()->sentence('2'),
            'mrr_no'=> rand(1, 10),
            'brand_id'=>rand(1, 10),
            'category_id'=>rand(1, 10),
            'receiving_item_id'=>rand(1, 10),
            'description'=> fake()->realText(),
            'specs'=> fake()->realText(),
            'part_no'=> random_int('10','20 '),
            'serial_no'=> random_int('10','20'),
            'model_no'=> random_int('10','20'),
            'uom'=>fake()->sentence('1'),
            'quantity'=>random_int('5','10'),
            'location_id'=>rand(1, 10),
            'employee_id'=>rand(1, 10),
            'status'=> fake()->sentence(''),
            'created_at' => time(),
            'updated_at' => time(),
            'remarks'=> fake()->sentence(),
        ];
    }
}
