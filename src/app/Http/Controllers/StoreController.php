<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function showTodayStoreForm()
    {
        return view('tenpo.today');
    }

    public function showYesterdayStoreForm()
    {
        return view('tenpo.yesterday');
    }
}
