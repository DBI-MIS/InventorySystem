import {  forwardRef, useRef } from 'react';

export default forwardRef(function SelectInput({className = "", children, ...props }, ref) {
    const input = ref ? ref : useRef();

    return (
        <select
    
            {...props}
            multiple
            className={
                'border-gray-300 dark:border-blue-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-800 dark:focus:border-blue-800 focus:ring-blue-600 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
            ref={input}
            >
                {children}
        </select>
    );
});