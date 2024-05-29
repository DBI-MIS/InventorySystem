<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Receiving;
use Illuminate\Http\Request;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;

class PDFController extends Controller
{

    // public function __invoke(Request $request)
    // {
    //     $users = User::get();
    //     $items = Item::get();
    //     $data = [
    //         'title' => 'DBI Inventory System',
    //         'date' => date('m/d/Y'),
    //         'users' => $users,
    //         'items' => $items
    //     ];

    //     // $pdf = PDF::loadView('pdf.itemsPdf', $data);
    //     return view('pdf.itemsPdf', compact($data));
    //     $pdf = Pdf::loadView('pdf.receivingPdf', $data);
    //     return $pdf->download('items-lists.pdf');
    // }
    public function generatePDF()
    {
        $users = User::get();
        $items = Item::where()->get();
        $receivings = Receiving::where('id','51')->get();
       
        $id = 51;
        $receiving = Receiving::find($id);
        $existingItems = $receiving->items;
        //   dd($existingItems);
        $existingItemIds= $receiving->items()->pluck('items.id'); //get item ids
        $receiving_items = Item::with(['brand', 'category', 'employee', 'location'])
        ->whereIn('id', $existingItemIds)
        ->get();
        $data = [
            'title' => 'DBI Inventory System',
            'date' => date('m/d/Y'),

            'users' => $users,
            'items' => $items,
            'receivings' => $receivings,
            'existingItems' =>  $existingItems,
            'receiving_items' =>   $receiving_items

        ];

        $pdf = PDF::loadView('pdf.itemsPdf', $data);
        return $pdf->download('items-lists.pdf');
    }
}