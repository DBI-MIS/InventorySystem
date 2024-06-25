<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $name = $this->faker->unique()->randomElement([
            'Roy',
            'Leo',
            'Ronaldo',
            'Cess',
        ]);

        $company = $this->faker->randomElement([
            'DBI',
            'Globaltronics',
            'PARC',
            'Nutriceutical',
            'Others',
        ]);

        $department = $this->faker->randomElement([
            'Warehouse',
            'MIS',
            'DBE',
            'TSD',
            'Sales',
            'Accounting',
            'Admin',
            'Executive',
            'Audit',
            'Purchasing',
        ]);

        $remarks = $this->faker->randomElement([
            'Active',
            'Inactive',
            'Resigned',
        ]);

        return [
            'name'=> $name,
            'company'=> $company,
            'department'=> $department,
            'remarks'=> $remarks,
            'user_id' => User::factory()
        ];
    }
}
