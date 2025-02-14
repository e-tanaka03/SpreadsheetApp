<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TotalController extends Controller
{
    public function showTodayTotalForm()
    {
        return view('syukei.today');
    }

    public function showYesterdayTotalForm()
    {
        return view('syukei.yesterday');
    }
}
