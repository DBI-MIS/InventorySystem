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
            $table->string('dr_no')->nullable();
            $table->string('rs_no')->nullable();
            $table->string('address')->nullable();
            $table->string('dr_date')->nullable();
            $table->string('dr_qty')->nullable();
            $table->string('remarks')->nullable();
            $table->string('status')->default('null');
            $table->string('list_item_id')->nullable();
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
