import React, { useRef, useState } from 'react'; 

const SwitchButton = ({ route, itemId, isDone, doneText = "Done", pendingText = "Not Done/Pending", classes }) => {
  const [isChecked, setIsChecked] = useState(isDone); 
  console.log(isDone);
  const switchRef = useRef(null); 

  const handleClick = () => {
    setIsChecked(!isChecked);
        route('item.updateDone', itemId)
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        ref={switchRef}
        checked={isChecked}
        onChange={handleClick}
        className={`hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${classes}`} 
      />
      <span className={`relative block rounded-full overflow-hidden h-5 w-10 bg-gray-400 ${isChecked ? 'bg-indigo-600' : ''}`}>
        <span className={`absolute left-0 right-0 transition-transform ease-in-out duration-200 ${isChecked ? '-translate-x-full' : ''}`}>
          <span className={`block h-full w-full bg-white rounded-full`}></span>
        </span>
      </span>
      <span className={`ml-3 text-sm font-medium ${isChecked ? 'text-indigo-600' : 'text-gray-700'}`}>
        {isChecked ? doneText : pendingText}
      </span>
    </label>
  );
};

export default SwitchButton;