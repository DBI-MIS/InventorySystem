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
            $table->string('item')->nullable();
            $table->integer('qty')->default(1);
            $table->string('uom')->nullable();
            $table->longText('description')->nullable()->charset('binary');
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
