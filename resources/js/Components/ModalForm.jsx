import React from 'react'

const ModalForm =({isVisible, onClose, children}) => {
    if(!isVisible) return null;
    const handleClose = (e) => {
        if(e.target.id === "wrapper") onClose;
    }
  return (
    <div
    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center overflow-scroll over"
   id="wrapper"
   onClick={handleClose}>
        <div className="w-5/6">
            <div className="bg-white p-2 rounded"> 
            <button className=" mr-5 text-gray-900 text-2xl float-right"
            onClick={()=>onClose()}>
              X
            </button>
            {children}</div>

        </div>
      </div>
  )
}

export default ModalForm