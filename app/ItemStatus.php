<?php

namespace App;

enum ItemStatus : string
{
    //
    case Pending = 'pending';
    case BrandNew = 'new';
    case SecondHand = 'used';
    case Defective = 'defective';
    case ForRepair = 'for_repair';
    case ForDisposal = 'for_disposal';
    

    public function getTitle(): string
    {
        return $this->name;
    }
    
}
