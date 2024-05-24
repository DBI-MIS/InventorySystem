<?php

use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StockSearchController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MrrItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReceivingController;
use App\Http\Controllers\ReceivingItemController;
use App\Models\ReceivingItem;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function(){
    //any closure that define here will be access if the user is authenticated n verified
        Route::get('/dashboard', [DashboardController::class,'index'])
        ->name('dashboard');
    
        Route::resource('item', ItemController::class);
        Route::resource('category', CategoryController::class);
        Route::resource('brand', BrandController::class);
        Route::resource('location', LocationController::class);
        Route::resource('employee', EmployeeController::class);
        Route::resource('archive', ArchiveController::class)->withTrashed();
        Route::resource('receiving', ReceivingController::class);
        Route::resource('mrrItem', MrrItemController::class);
        Route::resource('itemMrr', ItemController::class);
        Route::resource('stocksearch', StockSearchController::class);
        // lagay name
    
    });
    
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('restore/', [ItemController::class,'restore'])->name('item.restore');
  
});

require __DIR__.'/auth.php';
