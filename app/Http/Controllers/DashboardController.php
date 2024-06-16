<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Client;
use App\Models\Deliverables;
use App\Models\Item;
use App\Models\Receiving;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
{

    
    $latestItems = Item::latest('created_at')->limit(15)->get();

    $latestMrrs = Receiving::latest('created_at')->limit(5)->get();

    $latestDrs = Deliverables::latest('created_at')->limit(5)->get();

    $sortBy = request('sort_by', 'name'); // Default sorting by name
    $sortDirection = request('sort_direction', 'asc'); // Default sorting direction ascending

    // Query the items with sorting based on query parameters
    $itemsQuery = Item::selectRaw('name, SUM(quantity) as total_quantity_in, SUM(qty_out) as total_quantity_out')
    ->groupBy('name')
    ->orderBy($sortBy, $sortDirection);


    if (request("name")) {
        $itemsQuery->where(function ($query) {
            $query->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("name")) . "%"]);
        });
    }


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

    $currentDateTime = Carbon::now('Asia/Manila')->format('l, M d, Y h:i A');

    $userName = auth()->user()->name;

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
        'currentDateTime' => $currentDateTime,
        'queryParams' => request()-> query() ?: null,
        'userName' => $userName,
        'latestMrrs' => $latestMrrs,
        'latestDrs' => $latestDrs,
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
