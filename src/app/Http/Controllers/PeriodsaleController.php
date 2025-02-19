<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Periodsale;

class PeriodsaleController extends Controller
{
    public function showMonthPeriodsaleForm()
    {
        $periodsales = Periodsale::all();

        return view('kikan.month',[
            'periodsales' => $periodsales,
        ]);
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
