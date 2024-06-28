

<?php

use App\Models\User;
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
        Schema::create('stock_requisitions', function (Blueprint $table) {
            $table->id();
            $table->string('sr_to')->nullable();
            $table->string('rs_no')->nullable();
            $table->string('sr_date')->nullable();
            $table->string('sr_item')->nullable();
            $table->string('sr_qty')->nullable();
            $table->string('sr_unit')->nullable();
            $table->string('sr_description')->nullable();
            $table->string('sr_notes')->nullable();
            $table->foreignIdFor(User::class)->constrained();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_requisitions');
    }
};
