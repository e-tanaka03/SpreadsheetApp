<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TotalController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\PeriodsaleController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, "index"])->name('home');

Route::get('/syukei/today', [TotalController::class,"showTodayTotalForm"])->name('syukei.today');
Route::get('/syukei/yesterday', [TotalController::class,"showYesterdayTotalForm"])->name('syukei.yesterday');

Route::get('/syukei/today/tenpo/{store}', [StoreController::class,"showTodayStoreForm"])->name('tenpo.today');
Route::get('/syukei/yesterday/tenpo/{store}', [StoreController::class,"showYesterdayStoreForm"])->name('tenpo.yesterday');

Route::get('/kikan/month', [PeriodsaleController::class, "showMonthPeriodsaleForm"])->name('kikan.month');
Route::get('/kikan/quater', [PeriodsaleController::class, "showQuaterPeriodsaleForm"])->name('kikan.quater');
Route::get('/kikan/year', [PeriodsaleController::class, "showYearPeriodsaleForm"])->name('kikan.year');
