<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PeriodsalesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('periodsales')->insert([
            'store_name' => "店舗１",
            'store_id'   => 101,
            'data1'      => 131546,
            'data2'      => 19233.322,
            'data3'      => 26.496,
            'data4'      => 4,
            'data5'      => 22280,
            'data6'      => 2622,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗２",
            'store_id'   => 102,
            'data1'      => 66975.6,
            'data2'      => 13419.375,
            'data3'      => 11.885,
            'data4'      => 4,
            'data5'      => 13380,
            'data6'      => 2281,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗３",
            'store_id'   => 103,
            'data1'      => 10690.463,
            'data2'      => 2680.791,
            'data3'      => 4.455,
            'data4'      => 4,
            'data5'      => 2990,
            'data6'      => 769,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗４",
            'store_id'   => 104,
            'data1'      => 37289.66,
            'data2'      => 7446.791,
            'data3'      => 5.973,
            'data4'      => 4,
            'data5'      => 8650,
            'data6'      => 1367,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗５",
            'store_id'   => 105,
            'data1'      => 16886.2,
            'data2'      => 3799.035,
            'data3'      => 4.084,
            'data4'      => 4,
            'data5'      => 3880,
            'data6'      => 875,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗６",
            'store_id'   => 106,
            'data1'      => 30734.455,
            'data2'      => 5020.039,
            'data3'      => 6.199,
            'data4'      => 4,
            'data5'      => 7110,
            'data6'      => 1219,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗７",
            'store_id'   => 107,
            'data1'      => 57881,
            'data2'      => 11763.327,
            'data3'      => 11.142,
            'data4'      => 4,
            'data5'      => 12020,
            'data6'      => 2198,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗８",
            'store_id'   => 108,
            'data1'      => 43249.35,
            'data2'      => 9187.234,
            'data3'      => 8.439,
            'data4'      => 4,
            'data5'      => 10120,
            'data6'      => 2016,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗９",
            'store_id'   => 201,
            'data1'      => 10275.7,
            'data2'      => 2740.419,
            'data3'      => 3.037,
            'data4'      => 4,
            'data5'      => 2740,
            'data6'      => 676,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗１０",
            'store_id'   => 202,
            'data1'      => 18045,
            'data2'      => 3187.229,
            'data3'      => 3.163,
            'data4'      => 4,
            'data5'      => 3510,
            'data6'      => 540,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗１１",
            'store_id'   => 203,
            'data1'      => 38148,
            'data2'      => 9663.933,
            'data3'      => 8.231,
            'data4'      => 4,
            'data5'      => 9520,
            'data6'      => 1941,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗１２",
            'store_id'   => 204,
            'data1'      => 18242.7,
            'data2'      => 4345.866,
            'data3'      => 4.445,
            'data4'      => 4,
            'data5'      => 4200,
            'data6'      => 980,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗１３",
            'store_id'   => 205,
            'data1'      => 74050.8,
            'data2'      => 11872.305,
            'data3'      => 15.622,
            'data4'      => 4,
            'data5'      => 17550,
            'data6'      => 2585,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗１４",
            'store_id'   => 206,
            'data1'      => 59898.236,
            'data2'      => 11873.743,
            'data3'      => 10.487,
            'data4'      => 4,
            'data5'      => 11220,
            'data6'      => 2221,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('periodsales')->insert([
            'store_name' => "店舗１５",
            'store_id'   => 207,
            'data1'      => 22182.271,
            'data2'      => 5413.071,
            'data3'      => 4.099,
            'data4'      => 4,
            'data5'      => 5120,
            'data6'      => 1140,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
