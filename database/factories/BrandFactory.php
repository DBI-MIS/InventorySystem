<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Brand>
 */
class BrandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = $this->faker->unique()->randomElement([
            'Dunham-Bush',
            'Haier',
            'Danfoss',
            'Moontech',
            'Truwater',
            'Generic',
            'No Brand',
        ]);

        return [
            'name'=> $brands,
            'description'=> fake()->realText(),
            'user_id' => User::factory()
            
           
        ];
    }
}
