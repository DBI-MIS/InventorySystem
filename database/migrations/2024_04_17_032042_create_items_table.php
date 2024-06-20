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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('sku');
            $table->string('name');
            $table->string('brand_id')->nullable();
            $table->string('category_id')->nullable();
            $table->longText('description')->charset('binary')->nullable();
            $table->string('specs')->nullable();
            $table->string('part_no')->nullable();
            $table->string('serial_no')->nullable();
            $table->string('model_no')->nullable();
            $table->string('uom');
            $table->integer('quantity');
            $table->integer('qty_out')->default(0);
            $table->string('location_id')->nullable();
            $table->string('employee_id')->nullable();
            $table->string('statuses')->default('pending');
            $table->string('remark')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};