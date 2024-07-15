<?php

use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliverablesController;
use App\Http\Controllers\StockSearchController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MrrItemController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\PreviewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReceivingController;
use App\Http\Controllers\ReceivingItemController;
use App\Http\Controllers\SritemController;
use App\Http\Controllers\StockRequisitionController;
use App\Http\Controllers\UserController;
use App\Models\Item;
use App\Models\Receiving;
use App\Models\ReceivingItem;
use App\Models\StockRequisition;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified', ])->group(function(){
    //any closure that define here will be access if the user is authenticated n verified
    // User::ROLE_SUPER_ADMIN, User::ROLE_ADMIN, User::ROLE_EDITOR
        Route::get('/dashboard', [DashboardController::class,'index'])
        ->name('dashboard');
    
        Route::resource('item', ItemController::class);
        Route::resource('category', CategoryController::class);
        Route::resource('brand', BrandController::class);
        Route::resource('location', LocationController::class);
        Route::resource('employee', EmployeeController::class);
        Route::resource('archive', ArchiveController::class)->withTrashed();
        Route::resource('receiving', ReceivingController::class);
        // Route::post('receiving/restore', ReceivingController::class)->name(receiving.restore);
        // Route::post('/receiving/{id}restore', ['App\Http\Controllers\ReceivingController@restore','restore'])->name(receiving.restore);

        Route::resource('client', ClientController::class);
        Route::resource('mrrItem', MrrItemController::class);
        Route::resource('itemMrr', ItemController::class);
        Route::resource('user', UserController::class);
        Route::resource('deliverables', DeliverablesController::class);
        Route::resource('stockrequisition', StockRequisitionController::class);
        Route::resource('sritem', SritemController::class);
        Route::post('/receivings/{receivingId}/items/{itemId}',[ ReceivingController::class,'assignItem' ]);
        Route::resource('preview', PreviewController::class);
        Route::get('generate-pdf', [PDFController::class, 'generatePDF'])->name('generate-pdf.generatePDF');;
        Route::get('/receiving/my-receiving/{receivingId}', [ReceivingController::class, 'myReceiving'])->name('receiving.myReceiving');
        Route::get('item/{itemId}/restore',[ItemController::class, 'restoreItem'])->name('item.restoreItem');
        Route::get('receiving/{id}/restore',[ReceivingController::class, 'restoreReceiving'])->name('receiving.restoreReceiving');

        Route::delete('receiving/{id}/forceDelete',[ReceivingController::class, 'forceDelete'])->name('receiving.forceDelete');
        Route::delete('item/{id}/forceDeleteItem',[ItemController::class, 'forceDeleteItem'])->name('item.forceDeleteItem');

        // Route::get('item/{itemId}/restore',[ItemController::class, 'restoreItem'])->name('item.restoreItem');;
         Route::post('/items', [ItemController::class, 'submit'])->name('item.submit');
        // Route::post('/items/store', [ItemController::class, 'store'])->name('items.store');
        Route::get('/deliverables/my-deliverable/{deliverableId}', [DeliverablesController::class, 'myDeliverable'])->name('deliverable.myDeliverable');
        Route::get('/stockrequisition/my-stockrequest/{stockrequestId}', [StockRequisitionController::class, 'myStockRequest'])->name('stockrequest.myStockRequest');
        Route::post('receiving/create', [ItemController::class,'storeItem'])->name('item.storeItem');
        Route::post('receiving/create', [ItemController::class,'itemMrr'])->name('item.itemMrr');
        Route::post('/item/submit', [ItemController::class, 'submit'])->name('item.submit');
        Route::post('receiving/submit', [ReceivingController::class, 'submitItem'])->name('receiving.submitItem');
        Route::post('/item/upsert', [ItemController::class, 'upsert'])->name('item.upsert');
        Route::post('item/replicateEditItemDr', [ItemController::class, 'replicateEditItemDrt'])->name('item.replicateEditItemDr');
        Route::get('deliverables/{id}/updateDone',[DeliverablesController::class, 'updateDone'])->name('deliverables.updateDone');
        // status routes
        Route::get('item/{id}/updateDone',[ItemController::class, 'updateDone'])->name('item.updateDone');
        Route::get('receiving/{id}/updatemrrStatus',[ReceivingController::class, 'updatemrrStatus'])->name('receiving.updatemrrStatus');
        Route::get('receiving/{id}/updateApprove',[ReceivingController::class, 'updateApprove'])->name('receiving.updateApprove');
        Route::get('receiving/{id}/updateReject',[ReceivingController::class, 'updateReject'])->name('receiving.updateReject');
        Route::get('receiving/{id}/updateCancel',[ReceivingController::class, 'updateCancel'])->name('receiving.updateCancel');

        Route::get('deliverables/{id}/updateDrStatus',[DeliverablesController::class, 'updateDrStatus'])->name('deliverables.updateDrStatus');
        Route::get('deliverables/{id}/updateApprove',[DeliverablesController::class, 'updateApprove'])->name('deliverables.updateApprove');
        Route::get('deliverables/{id}/updateReject',[DeliverablesController::class, 'updateReject'])->name('deliverables.updateReject');
        Route::get('deliverables/{id}/updateCancel',[DeliverablesController::class, 'updateCancel'])->name('deliverables.updateCancel');
        // lagay name
        // itemMrr
    
    });
    
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('restore/', [ItemController::class,'restore'])->name('item.restore');
  
});


require __DIR__.'/auth.php';
