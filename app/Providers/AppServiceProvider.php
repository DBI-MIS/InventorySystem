<?php

namespace App\Providers;

use App\Models\Item;
use App\Models\User;
use App\Policies\ItemPolicy;
use App\Policies\UserPolicy;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    protected $policies = [
        User::class => UserPolicy::class,
        Item::class => ItemPolicy::class,
        // Add other model-policy associations as needed
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
        //
    }
}
