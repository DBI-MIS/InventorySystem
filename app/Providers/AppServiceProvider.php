<?php

namespace App\Providers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Client;
use App\Models\Deliverables;
use App\Models\Employee;
use App\Models\Item;
use App\Models\Location;
use App\Models\Receiving;
use App\Models\StockRequisition;
use App\Models\User;
use App\Policies\BrandPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\ClientPolicy;
use App\Policies\DeliverablesPolicy;
use App\Policies\EmployeePolicy;
use App\Policies\ItemPolicy;
use App\Policies\LocationPolicy;
use App\Policies\ReceivingPolicy;
use App\Policies\StockRequisitionPolicy;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    protected $policies = [
        User::class => UserPolicy::class,
        Item::class => ItemPolicy::class,
        Brand::class => BrandPolicy::class,
        Category::class => CategoryPolicy::class,
        Client::class => ClientPolicy::class,
        Deliverables::class => DeliverablesPolicy::class,
        Employee::class => EmployeePolicy::class,
        Location::class => LocationPolicy::class,
        Receiving::class => ReceivingPolicy::class,
        StockRequisition::class => StockRequisitionPolicy::class,
      
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('viewPulse', function (User $user) {
            return $user->isAdmin() || $user->isSuperAdmin();
        });
    }
}
