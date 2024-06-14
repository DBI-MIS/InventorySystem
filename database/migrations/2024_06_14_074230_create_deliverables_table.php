<?php

use App\Models\Client;
use App\Models\StockRequisition;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rules\Unique;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('deliverables', function (Blueprint $table) {
            $table->id();
            $table->string('dr_no')->nullable();
            // $table->foreignIdFor(StockRequisition::class)->nullable();
            $table->foreignId('stock_requisition_id')->constrained('stock_requisition');
            $table->string('address')->nullable();
            $table->string('dr_date')->nullable();
            $table->string('dr_qty')->nullable();
            $table->string('remarks')->nullable();
            $table->string('status')->default('pending');
            $table->string('list_item_id')->nullable();
            // $table->foreignIdFor(Client::class)->constrained();
            // $table->foreignId('client_id')->constrained('clients');
             $table->foreignIdFor(Client::class)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliverables');
    }
};