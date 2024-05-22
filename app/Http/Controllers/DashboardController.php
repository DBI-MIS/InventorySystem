<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalName = Item::query()
        ->count('name');

        $totalQuantity = Item::query('name')
        ->sum('quantity');
        
        return inertia('Dashboard', compact('totalName', 'totalQuantity'));
    }
}
