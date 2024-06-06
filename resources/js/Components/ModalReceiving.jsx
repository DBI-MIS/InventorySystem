import React from "react";

const ModalReceiving = ({isVisible, onClose,children}) => {
    if(!isVisible) return null;
    return(
        <div>
            {/* onClick={()=>onClose()}  */}
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                 <div className="w-[900px] flex flex-col">
                     <button onClick={()=> onClose()} className="text-white text xl place-self-end">X</button>
                     <div className="bg-white  rounded">
                        {children}
                      </div>                              
                 </div>
            </div>
        </div>
        
        
    )
};
export default ModalReceiving;