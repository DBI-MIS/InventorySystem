<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $name = $this->faker->unique()->randomElement([
            'DBI',
            'Globaltronics',
            'PARC',
            'Nutriceutical',
            'Others',
        ]);

        return [
            'name'=> $name,
            'company'=> fake()->company(),
            'address'=> fake()->address(),
            'user_id' => User::factory()
        ];
    }
}
