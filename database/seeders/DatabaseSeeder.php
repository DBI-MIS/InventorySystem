<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Client;
use App\Models\Deliverables;
use App\Models\StockSearch;
use App\Models\Employee;
use App\Models\Item;
use App\Models\Location;
use App\Models\Material;
use App\Models\Receiving;
use App\Models\Sritem;
use App\Models\StockRequisition;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'super_admin'


        ]);
        User::factory()->create([
            'name' => 'admin2',
            'email' => 'admin2@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'super_admin'

        ]);

        User::factory()->create([
            'name' => 'admin3',
            'email' => 'admin3@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'super_admin'

        ]);
        User::factory()->create([
            'name' => 'admin4',
            'email' => 'admin4@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'editor'

        ]);
        User::factory()->create([
            'name' => 'admin5',
            'email' => 'admin5@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'user'

        ]);
        User::factory()->create([
            'name' => 'admin6',
            'email' => 'admin6@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'admin'

        ]);
        User::factory()->create([
            'name' => 'admin7',
            'email' => 'admin7@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'admin'

        ]);

        
         // create fake projects and task
        
         Brand::factory()
         ->count(7)
         ->create();

         Category::factory()
         ->count(5)
        //  ->state(new Sequence(
        //     ['sku_prefix' => 'AAA'],
        //     ['sku_prefix' => 'BBB'],
        //     ['sku_prefix' => 'CCC'],
        //  ))
         ->create();

         
         Employee::factory()
         ->count(4)
         ->create();
       
         Location::factory()
         ->count(5)
         ->create();

         Item::factory()
         ->count(5)
         ->create();
         
         Receiving::factory()
         ->count(5)
         ->create();

         Client::factory()
         ->count(10)
         ->create();

        //  Sritem::factory()
        //  ->count(20)
        //  ->create();
        //  Deliverables::factory()
        //  ->count(20)
        //  ->create();
        //  StockRequisition::factory()
        //  ->count(10)
        //  ->create();
         
foreach(Item::all() as $item){
    foreach(Receiving::all() as $receiving){
    $item->receivings()->attach($receiving->id);
    }
    }
    
    foreach(Item::all() as $item){
        foreach(Deliverables::all() as $deliverable){
        $item->deliverable_items()->attach($deliverable->id);
        }
        }

         foreach(Sritem::all() as $sritem){
            foreach(StockRequisition::all() as $stockrequisition){
                 $sritem->sritems()->attach($stockrequisition->id);
         }
         }


    
    }
    
}
