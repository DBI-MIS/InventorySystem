<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->randomElement([
            'Equipments',
            'Materials',
            'Office Supplies',
            'Scraps',
        ]);

        return [
            // 'name'=> $name,
            'name'=> fake()->sentence(2),
            'description'=> fake()->realText(),
            'sku_prefix'=> 'AAA',
           
        ];
    }
}
