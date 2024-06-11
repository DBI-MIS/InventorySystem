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

        // Aggregate quantities based on `quantity` and `qty_out`
        $items = Item::selectRaw('name, SUM(quantity - qty_out) as total_qty')
            ->groupBy('name')
            // ->paginate(10)
            ->get();

        // Count distinct item names
        $totalName = Item::distinct('name')
            ->count('name');

        // Calculate the total quantity (net quantity considering additions and subtractions)
        $totalQuantity = Item::selectRaw('SUM(quantity - qty_out) as net_quantity')
            ->value('net_quantity');

        // Format the total quantity for display
        $formattedTotalQuantity = number_format($totalQuantity);

        // Count the total number of categories
        $totalCategory = Category::count('name');

        // Count the total number of clients
        $totalClient = Client::count('name');

        // Count the total number of deliverables
        $totalDeliverable = Deliverables::count('dr_no');

        // Count the total number of pending deliverables
        $totalDeliverableDelivered = Deliverables::where('status', 'pending')
            ->count();

        // Count the total number of receivings
        $totalReceiving = Receiving::count('mrr_no');

        // Return the data to the inertia dashboard component
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
