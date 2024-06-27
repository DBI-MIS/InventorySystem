<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sritem>
 */
class SritemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $item = $this->faker->unique()->randomElement([
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
        ]);
        $qty = $this->faker->unique()->randomElement([
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
        ]);
        $uom = $this->faker->unique()->randomElement([
            'p',
            'c',
            'p',
            'c',
            's',
            'm',
            'l',
            'cm',
            'si',
            'i',
        ]);

        return [
            'item' => $item,
            'qty' => $qty,
            'uom' => $uom,
            'description' => fake()->realText(),
            'created_at' => time(),
            'updated_at' => time(),
            'user_id' => User::factory()
        ];
    }
}
