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
    public function index(Request $request)
{
    // Fetch latest item
    $latestItems = Item::latest('created_at')->limit(20)->get();

    // Initialize query parameters with default values
    $sortBy = $request->input('sort_by', 'name'); // Default sorting by name
    $sortDirection = $request->input('sort_direction', 'asc'); // Default sorting direction ascending

    // Query the items with sorting based on query parameters
    $itemsQuery = Item::selectRaw('name, SUM(quantity) as total_quantity_in, SUM(qty_out) as total_quantity_out')
        ->groupBy('name')
        ->orderBy($sortBy, $sortDirection);

    // Execute the query
    $items = $itemsQuery->get()->map(function ($item) {
        $item->total_qty = $item->total_quantity_in - $item->total_quantity_out;
        $item->status = $this->determineStatus($item->total_qty);
        return $item;
    });

    // Count distinct item names
    $totalName = Item::distinct('name')->count('name');

    // Calculate the total quantity (net quantity considering additions and subtractions)
    $totalQuantity = Item::selectRaw('SUM(quantity - qty_out) as net_quantity')->value('net_quantity');

    // Format the total quantity for display
    $formattedTotalQuantity = number_format($totalQuantity);

    // Count the total number of categories
    $totalCategory = Category::count('name');

    // Count the total number of clients
    $totalClient = Client::count('name');

    // Count the total number of deliverables
    $totalDeliverable = Deliverables::count('dr_no');

    // Count the total number of pending deliverables
    $totalDeliverableDelivered = Deliverables::where('status', 'pending')->count();

    // Count the total number of receivings
    $totalReceiving = Receiving::count('mrr_no');

    // Return the data to the inertia dashboard component
    return Inertia::render('Dashboard', [
        'latestItems' => $latestItems,
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

private function determineStatus($total_qty)
{
    if ($total_qty <= 0) {
        return 'out of stock';
    } elseif ($total_qty <= 5) {
        return 'need restock';
    } else {
        return 'stock available';
    }
}

}
