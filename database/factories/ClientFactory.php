<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $name = $this->faker->randomElement([
            'Jollibee Foods Corporation',
            'SM Investments Corporation',
            'Ayala Corporation',
            'San Miguel Corporation',
            'PLDT Inc.',
            'Globe Telecom',
            'Metropolitan Bank & Trust Company',
            'BDO Unibank',
            'Manila Electric Company (Meralco)',
            'Aboitiz Equity Ventures'
        ]);

        $address = $this->faker->randomElement([
            '40 San Miguel Avenue, Mandaluyong City, Metro Manila',
            'Makati Avenue, Makati City, Metro Manila',
            'The Globe Tower, Bonifacio Global City, Taguig City, Metro Manila',
            'Metrobank Plaza, Gil Puyat Avenue, Makati City, Metro Manila',
            'Jollibee Plaza, Ortigas Avenue, Pasig City, Metro Manila',
            'SM Mall of Asia Complex, Pasay City, Metro Manila',
            'Ayala Avenue, Makati City, Metro Manila',
            'BDO Corporate Center, Makati Avenue, Makati City, Metro Manila',
            'Lopez Building, Ortigas Center, Pasig City, Metro Manila',
            'Aboitiz Corporate Center, Banilad, Cebu City, Cebu'
        ]);
        $contact_person = $this->faker->randomElement([
            'Nadine Lustre', 
            'Cynthia Villar', 
            'Cong TV Velasquez',
            'Catriona Gray', 'Alice Wonderland',
            'Bob Ong', 
            'Vic Sotto', 
            'Manny Pacquiao']);
        $contact_no = $this->faker->randomElement([ 
            '+63 917 123 4567', 
            '+63 918 234 5678', 
            '+63 2 123 4567',   
            '+63 32 345 6789',
            '+63 49 123 4567'   
            ]);
        $tin_no = $this->faker->randomElement([
            'TIN239350',
            'TIN034755',
            'TIN247695',
            'TIN123456',
            'TIN654321', 
            'TIN111222',
            'TIN333444', 
            'TIN555666'
        ]); 
        $status = $this->faker->randomElement([
            'active',
            'inactive', 
            'pending']);
        $remarks = $this->faker->randomElement([
            'This client has been with us for over five years and has always been reliable.',
            'High priority client that requires frequent follow-ups.',
            'New client onboarded last month, requires initial assessment.',
            'Long-term client with a history of timely payments.',
            'Client has requested a review of their account status.',
            'Regular client with consistent orders every quarter.',
            'Client requires additional support during the implementation phase.',
            'This client has several pending invoices that need to be addressed.',
            'Client is highly satisfied with our services and has provided positive feedback.',
            'Frequent client with occasional special requests.',
        ]);

        return [
            'name' => $name,
            'address' => $address ,
            'contact_person'  => $contact_person,
            'contact_no' =>  $contact_no,
            'tin_no' => $tin_no,
            'status' =>  $status,
            'remarks' =>  $remarks,
        ];
    }
}
