<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\StockSearch;
use App\Models\Employee;
use App\Models\Item;
use App\Models\Location;
use App\Models\Material;
use App\Models\Receiving;
use App\Models\ReceivingItem;
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


        ]);
        User::factory()->create([
            'name' => 'admin2',
            'email' => 'admin2@gmail.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'admin3',
            'email' => 'admin3@gmail.com',
            'password' => bcrypt('password'),
        ]);

        
         // create fake projects and task
        
         Brand::factory()
         ->count(10)
         ->create();

         Category::factory()
         ->count(4)
         ->state(new Sequence(
            ['sku_prefix' => 'AAA'],
            ['sku_prefix' => 'BBB'],
            ['sku_prefix' => 'CCC'],
            ['sku_prefix' => 'DDD'],
         ))
         ->create();

         
         Employee::factory()
         ->count(10)
         ->create();
       
         Location::factory()
         ->count(10)
         ->create();

         Item::factory()
         ->count(30)
        //  ->state(new Sequence(
        //     ['uom' => 'pcs'],
        //     ['uom' => 'kgs'],
        //     ['uom' => 'sets'],
        //  ))
         ->create();

         
         Receiving::factory()
         ->count(50)
         ->create();
         
         
foreach(Item::all() as $item){
    foreach(Receiving::all() as $receiving){
    $item->receivings()->attach($receiving->id);
    }
    } 
    }
    
}
