<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PeriodsaleController extends Controller
{
    public function showMonthPeriodsaleForm()
    {
        return view('kikan.month');
    }

    public function showQuaterPeriodsaleForm()
    {
        return view('kikan.quater');
    }

    public function showYearPeriodsaleForm()
    {
        return view('kikan.year');
    }
}
