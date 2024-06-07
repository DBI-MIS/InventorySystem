<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Deliverables;
use App\Models\Employee;
use App\Models\Item;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Material>
 */
class ReceivingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $mrr_no = $this->faker->unique()->regexify('[0-9]{6}');
        $client_name = $this->faker->randomElement([
            
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
        $si_no = $this->faker->randomElement([
            
            '20230101-0001',
            '20230101-0002',
            '20230101-0003',
            '20230101-0004',
            '20230101-0005',
            '20230101-0006',
            '20230101-0007',
            '20230101-0008',
            '20230101-0009',
            '20230101-0010',
            '20230101-0011',
            '20230101-0012',
            '20230101-0013',
            '20230101-0014',
            '20230101-0015',
            
        ]);
        // $dr_no = $this->faker->randomElement([
            
        //     'DR-20230501-001',
        //     'DR-20230501-002',
        //     'DR-20230501-003',
        //     'DR-20230501-004',
        //     'DR-20230501-005',
        //     'DR-20230501-006',
        //     'DR-20230501-007',
        //     'DR-20230501-008',
        //     'DR-20230501-009',
        //     'DR-20230501-010',
        //     'DR-20230501-011',
        //     'DR-20230501-012',
        //     'DR-20230501-013',
        //     'DR-20230501-014',
        //     'DR-20230501-015',

        // ]);
        $address = $this->faker->randomElement([
            
            '123 Rizal Street, Barangay San Roque,  ',
            '45 Lopez Jaena Avenue, Barangay Banilad, Cebu',
            '678 Aguinaldo Highway, Barangay Salitran, Dasmariñas, Cavite',
            '89 MacArthur Highway, Barangay Malinta,  Metro Manila',
            '10 J.P. Laurel Avenue, Barangay Bajada,  Davao del Sur',
            '234 Magsaysay Avenue, Barangay Sta. Cruz, Metro Manila',
            '567 General Luna Street, Barangay Poblacion, Iloilo City',
            '102 Bonifacio Drive, Barangay City, Camarines Sur',
            '312 Roxas Boulevard, Barangay Tambo, Parañaque City',
            '456 Lacson Street, Bacolod City, Negros Occidental',
            '789 Marcos Highway,  Marikina City, Metro Manila',
            '90 Real Street, Barangay East Bajac-Bajac,  Zambales',
            '150 Quezon Avenue, Barangay Bagumbayan, Taguig City,',
            '345 Quirino Highway, Barangay Pasong Quezon City,',
            '678 Recto Avenue, Barangay Sampaloc, Manila, Metro Manila',
            '123 Taft Avenue, Barangay Pasay, Pasay City, ',
            '456 Araneta Avenue, Barangay Tatalon, Metro Manila',
            '789 Abad Santos Avenue, Barangay Tondo, Manila,',
            '202 Ortigas Avenue, Barangay Greenhills, San Juan City,',
            '303 Commonwealth Avenue, Barangay Holy Spirit, Quezon City', 
        ]);

        return [
            'mrr_no'=> $mrr_no,
            // 'group_item_id'=>rand(1, 30),
            'client_id'=> Client::factory(),
            'si_no'=>$si_no,
            // 'deliver_id'=>fake()->regexify('[0-9]{12}'),
            'deliver_id'=> Deliverables::factory(),
            'address'=>$address,
            // 'location_id'=> 1,
            // 'employee_id'=> 1,
            'created_at' => time(),
            'updated_at' => time(),
            'remarks'=> fake()->realText(),
        ];
    }
}