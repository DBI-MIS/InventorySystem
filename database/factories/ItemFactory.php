<?php

namespace Database\Factories;

use App\Models\User;
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
        $uom = $this->faker->randomElement([
            'm' => 'Meters',
            'kg'=> 'Kilograms',
            'l' => 'Liters',
            'pcs' => 'Pieces',
            'sets'=> 'Sets',
        ]);

        $statuses = $this->faker->randomElement([
            'pending',
            'delivered',
            'reviewing',
            'unassigned',
            'processed',
            'pending',
            'new',
            'used',
            'defective',
            'for_repair',
            'for_disposal',
            ''
            
        ]);

        $products = $this->faker->randomElement([
            'Cheese Pizza',
            'Hamburger',
            'Cheeseburger', 
            'Bacon Burger', 
            'Bacon Cheeseburger',
            'Little Hamburger', 
            'Little Cheeseburger', 
            'Little Bacon Burger', 
            'Little Bacon Cheeseburger',      
            'Veggie Sandwich', 
            'Cheese Veggie Sandwich', 
            'Grilled Cheese',
            'Cheese Dog', 
            'Bacon Dog', 
            'Bacon Cheese Dog', 
            'Pasta', 'Beer', 
            'Bud Light', 
            'Budweiser', 
            'Miller Lite',
            'Milk Shake', 
            'Tea', 
            'Sweet Tea', 
            'Coffee',
            'Hot Tea',
            'Champagne', 
            'Wine',
            'Lemonade', 
            'Coca-Cola', 
            'Diet Coke',
            'Water', 
            'Sprite', 
            'Orange Juice', 
            'Iced Coffee', 
            'Butter',
            'Egg', 
            'Cheese',
            'Sour cream',
            'Mozzarella',
            'Yogurt',
            'Cream',
            'Milk',
            'Custard',
            'Onion',
            'Garlic',
            'Tomato',
            'Potato',
            'Carrot',
            'Bell Pepper',
            'Bell Basil',
            'Parsley',
            'Broccoli',
            'Corn',
            'Spinach',
            'Ginger',
            'Chili',
            'Celery',
            'Rosemary',
            'Cucumber',
            'Pickle',
            'Avocado',
            'Pumpkin',
            'Mint',
            'Eggplant',
            'Yam',
            'Lemon',
            'Apple',
            'Banana',
            'Lime',
            'Strawberry',
            'Orange',
            'Pineapple',
            'Blueberry',
            'Raisin',
            'Coconut',
            'Grape',
            'Peach',
            'Raspberry',
            'Cranberry',
            'Mango',
            'Pear',
            'Blackberry',
            'Cherry',
            'Watermelon',
            'Kiwi',
            'Papaya',
            'Guava',
            'Lychee',
            'Chicken',
            'Bacon',
            'Sausage',
            'Beef',
            'Ham',
            'Hot dog',
            'Pork',
            'Turkey',
            'Chicken wing',
            'Chicken breast',
            'Lamb',
            'Tomato sauce',
            'Tomato paste',
            'Mayonnaise sauce',
            'BBQ sauce',
            'Chili sauce',
            'Garlic sauce',
        ]);

        return [
            'sku'=> rand(600000,630000),
            'name'=> $products,
            'brand_id'=>rand(1,7),
            'category_id'=>rand(1,4),
            'description'=> fake()->sentence('4'),
            'specs'=> fake()->realText(),
            'part_no'=> fake()->regexify('[0-9]{20}'),
            'serial_no'=> fake()->regexify('[0-9]{12}'),
            'model_no'=> fake()->regexify('[A-Z0-9]{10}'),
            'uom'=> $uom,
            'quantity'=>random_int('5','999'),
            'location_id'=>rand(1,5),
            'employee_id'=>rand(1,4),
            'statuses'=> $statuses,
            'is_done' => false,
            'created_at' => time(),
            'updated_at' => time(),
            'remark'=> fake()->realText(),
            'user_id' => User::factory(),
            'updated_by' =>  User::factory(),
            // User::factory(),
            
            
        ];
    }
}
