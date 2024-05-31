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
        Schema::create('receivings', function (Blueprint $table) {
            $table->id();
            $table->string('mrr_no')->unique();
            $table->string('group_item_id')->nullable();
            $table->string('client_id')->nullable();
            $table->string('si_no')->nullable();
            $table->string('address')->nullable();
            $table->string('dr_no')->nullable();
            $table->string('location_id')->default(1);
            $table->string('employee_id')->nullable();
            $table->string('remarks')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
       
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receivings');
    }
};
