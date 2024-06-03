import React from 'react';

const PaginationEdit = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="pagination flex justify-center items-center m-5 gap-2 text-gray-800">
        <button className="pagination-button bg-transparent border border-gray-500 mx-2 py-1 px-4 font-extrabold rounded-md  hover:bg-blue-500 hover:border-blue-300 hover:text-white text-gray-700  hover:px-4 focus:outline-none  transition-colors duration-300" onClick={onPrevPage} disabled={currentPage === 1}>Previous</button>
      <span>{currentPage} of {totalPages}</span>
      <button className="pagination-button mx-2 py-1 px-2 bg-transparent border font-extrabold hover:bg-blue-500 hover:border-blue-300 border-gray-500 rounded-md hover:text-white text-gray-700  focus:outline-none focus:border-blue-500 transition-colors duration-300"onClick={onNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default PaginationEdit;
