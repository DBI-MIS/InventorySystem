<?php

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
            $table->string('project');
            $table->foreignId('receiving_id')->constrained('receivings');
            $table->string('dr_no')->unique();
            $table->string('rs_no')->unique();
            $table->foreignId('address_id')->constrained('receivings');
            $table->timestamp('dr_date')->nullable();
            $table->foreignId('item_qty')->constrained('items');
            $table->foreignId('item_unit')->constrained('items');
            $table->foreignId('item_name_id')->constrained('items');
            $table->foreignId('item_description_id')->constrained('items');
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
