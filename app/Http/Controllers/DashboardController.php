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

        $sortBy = request('sort_by', 'name');
        $sortDirection = request('sort_direction', 'asc');

        $itemsQuery = Item::selectRaw('name, SUM(quantity) as total_quantity_in, SUM(qty_out) as total_quantity_out')
            ->groupBy('name')
            ->orderBy($sortBy, $sortDirection);


        if (request("name")) {
            $itemsQuery->where(function ($query) {
                $query->whereRaw("LOWER(name) LIKE ?", ["%" . strtolower(request("name")) . "%"]);
            });
        }


        $items = $itemsQuery->get()->map(function ($item) {
            $item->total_qty = $item->total_quantity_in - $item->total_quantity_out;
            $item->status = $this->determineStatus($item->total_qty);
            return $item; //if diff is 0 hide/ leave emptystring as value
            //   return $item->total_qty > 0 ? $item : ''; 
        });

        



        $totalName = Item::distinct('name')->count('name');

        $totalQuantity = Item::selectRaw('SUM(quantity - qty_out) as net_quantity')->value('net_quantity');

        $formattedTotalQuantity = number_format($totalQuantity);

        $totalCategory = Category::count('name');

        $totalClient = Client::count('name');

        $totalDeliverable = Deliverables::count('dr_no');

        $totalDeliverableDelivered = Deliverables::where('status', 'pending')->count();

        $totalReceiving = Receiving::count('mrr_no');

        $currentDateTime = Carbon::now('Asia/Manila')->format('l, M d, Y h:i A');

        $userName = auth()->user()->name;

        $dailyItemCounts = Item::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'count' => $item->count
                ];
            });

            $itemsByLocation = Item::selectRaw('location_id, SUM(quantity - qty_out) as total_quantity')
            ->groupBy('location_id')
            ->orderBy('location_id')
            ->get()
            ->map(function ($item) {
                return [
                    'location_id' => $item->location_id,
                    'location_name' => $item->location->name,
                    'total_quantity' => $item->total_quantity
                ];
            });


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
            'queryParams' => request()->query() ?: null,
            'userName' => $userName,
            'latestMrrs' => $latestMrrs,
            'latestDrs' => $latestDrs,
            'dailyItemCounts' => $dailyItemCounts,
            'itemsByLocation' =>  $itemsByLocation,
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
