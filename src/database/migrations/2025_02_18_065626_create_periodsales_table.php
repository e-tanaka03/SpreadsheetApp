<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $table = 'periodsales';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('periodsales', function (Blueprint $table) {
            $table->string('store_name', 100);
            $table->integer('store_id')->unsigned();
            $table->double('data1');
            $table->double('data2');
            $table->double('data3');
            $table->integer('data4');
            $table->integer('data5');
            $table->integer('data6');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('periodsales');
    }
};
