<?php

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
        Schema::create('sritems', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('stock_requisition_id')->constrained()->onDelete('cascade');
            $table->string('sr_item')->nullable();
            $table->integer('sr_qty')->default(1);
            $table->string('sr_unit')->nullable();
            $table->longText('sr_description')->nullable()->charset('binary');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sritems');
    }
};
