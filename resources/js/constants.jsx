export const CLIENT_STATUS_CLASS_MAP = {
  //equivalent value on the database(leftside) & corresponding color and text appearance
    pending: "bg-amber-700",
    active: "bg-green-700 ",
    inactive: "bg-red-900",
  };
  export const CLIENT_STATUS_TEXT_MAP = {
    pending: "Pending",
    active: "Active",
    inactive: "Inactive",
  };
  
  export const ITEM_STATUS_TEXT_MAP = {
   
    pending: "Pending",
    new: "Brand New",
    used: "Used",
    defective: "Defective",
    for_repair: "For Repair",
    for_disposal: "For Disposal",
    delivered:'Delivered',
    reviewing: 'Reviewing',
    unassigned: 'Unassigned',
    processed:'Processed',
  };
  export const ITEM_STATUS_CLASS_MAP = {
    //equivalent value on the database(leftside) & corresponding color and text appearance
    pending: "bg-slate",
    new: "bg-emerald",
    used: "bg-orange-500",
    defective: "bg-red-500",
    for_repair: "bg-gray-700",
    for_disposal: "bg-crimson",
    delivered:'bg-sky',
    reviewing: 'bg-lime-500',
    unassigned: 'bg-stone',
    processed:'bg-green-500',
  };
  export const EMPLOYEE_STATUS_CLASS_MAP = {
    //equivalent value on the database(leftside) & corresponding color and text appearance
      Resigned: "bg-amber-700",
      Active: "bg-green-700 ",
      Inactive: "bg-red-900",
    };
    export const EMPLOYEE_STATUS_TEXT_MAP = {
      Resigned: "Resigned",
      Active: "Active",
      Inactive: "Inactive",
    };
    
    export const USER_STATUS_TEXT_MAP = {
      super_admin: "Super Admin",
      admin: "Admin",
      editor: "Editor",
      user: "User",
    };


    export const USER_STATUS_CLASS_MAP = {
      //equivalent value on the database(leftside) & corresponding color and text appearance
        super_admin: "bg-amber-700",
        admin: "bg-green-700 ",
        editor: "bg-red-900",
        user: "bg-sky",
      };