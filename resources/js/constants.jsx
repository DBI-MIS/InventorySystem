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
    on_process:'On Process',
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
    on_process:"bg-green-300",
    processed: "bg-emerald"
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

      export const DONE_TEXT_MAP = {
        processed: "Processed",
        pending: "Pending",
        true: "Processed",
        false: "Pending",
       
      };
      export const DELIVERABLES_STATUS_TEXT_MAP = {
   
        pending: "Pending",
        for_approval: "Pending Approval",
        approved:'Processed',
        rejected: 'Rejected',
        cancel: 'Cancel',
      };
      export const DELIVERABLES_STATUS_CLASS_MAP = {
        pending: 'bg-orange-700/40 !text-gray-600',
        for_approval:'bg-gray-500',
        rejected: 'bg-black',
        cancel: 'bg-red-500',
        approved:'bg-emerald'
       
      };
  
  export const DONE_CLASS_MAP = {
        //equivalent value on the database(leftside) & corresponding color and text appearance
        processed: "text-emerald disabled opacity-70 cursor-not-allowed " ,
        pending: "text-red-600",
        true: "bg-green-600",
        false: "bg-red-600",
        };
   export const DONE_STATUS_CLASS_MAP = {
          processed: "bg-emerald " , // translated via resource
          pending: "bg-red-600",
          true: "bg-emerald", //incase only
          false: "bg-red-600",
   };

   export const RECEIVING_STATUS_TEXT_MAP = {
   
    pending: "Pending",
    for_approval: "Pending Approval",
    approved:'Approved',
    rejected: 'Rejected',
    cancel: 'Cancel',
  };
  export const RECEIVING_STATUS_CLASS_MAP = {
    pending: 'bg-orange-700/40 !text-gray-600',
    for_approval:'bg-gray-500',
    rejected: 'bg-black',
    cancel: 'bg-red-500',
    approved:'bg-emerald'
   
  };