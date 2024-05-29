<?php

use App\Models\Deliverables;
use App\Models\Item;
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
        Schema::create('deliverable_item', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Item::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Deliverables::class)->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliverable_item');
    }
};
