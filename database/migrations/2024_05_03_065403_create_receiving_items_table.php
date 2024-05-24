<?php

use App\Models\Item;
use App\Models\Receiving;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('receiving_items', function (Blueprint $table) {
            $table->id();
            // $table->foreignIdFor(Receiving::class)->constrained()->cascadeOnDelete();
            // $table->foreignIdFor(Item::class)->constrained()->cascadeOnDelete();
            $table->string('reference_no')->nullable();
            $table->string('item_id')->nullable();
            $table->string('ref_id')->nullable();
            // $table->string('receiving_id')->nullable();
            // $table->foreignId('item_id')->nullable();
            $table->foreignId('created_by')->constrained('users');
            // $table->foreignId('updated_by')->constrained('users');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receiving_items');
    }
};
