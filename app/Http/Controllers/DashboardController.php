<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Client;
use App\Models\Deliverables;
use App\Models\Item;
use App\Models\Receiving;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $items = Item::selectRaw('name, SUM(quantity) as total_qty')
        ->groupBy('name')
        // ->paginate(10)
        ->get();

        $totalName = Item::distinct('name')
            ->count('name');

        $totalQuantity = Item::query('name')
            ->sum('quantity');

        $formattedTotalQuantity = number_format($totalQuantity);

        $totalCategory = Category::query()
            ->count('name');

        $totalClient = Client::query()
            ->count('name');

        $totalDeliverable = Deliverables::query()
            ->count('dr_no');

            $totalDeliverableDelivered = Deliverables::query()->where('status', 'pending')
            ->count();

        $totalReceiving = Receiving::query()
            ->count('mrr_no');



            return inertia('Dashboard', [
                'items' => $items,
                'totalName' => $totalName,
                'formattedTotalQuantity' => $formattedTotalQuantity,
                'totalCategory' => $totalCategory,
                'totalClient' => $totalClient,
                'totalDeliverable' => $totalDeliverable,
                'totalDeliverableDelivered' => $totalDeliverableDelivered,
                'totalReceiving' => $totalReceiving,
            ]);
    }
}
