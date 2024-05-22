<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class mrrComponent extends Component
{
    /**
     * Create a new component instance.
     */
    public $mrr_no;
    public function __construct($mrr_no)
    {
        $this->mrr_no = $mrr_no;
    
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.mrr-component');
    }
}
