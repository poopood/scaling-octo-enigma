import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  setcurrentPage,
  wineLength,
}) => {
  return (
    <div className="buttons pagination_buttons inline-flex">
      <button
        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"
        disabled={currentPage === 1}
        onClick={() => setcurrentPage(1)}
      >
        First
      </button>
      <button
        disabled={currentPage === 1}
        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4  "
        onClick={() => {
          setcurrentPage(currentPage > 1 ? currentPage - 1 : 1);
        }}
      >
        Previous
      </button>
      <button
        disabled={currentPage === totalPages}
        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4  "
        onClick={() =>
          setcurrentPage(
            currentPage < totalPages ? currentPage + 1 : totalPages
          )
        }
      >
        Next
      </button>
      <button
        disabled={currentPage === totalPages}
        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
        onClick={() => setcurrentPage(totalPages)}
      >
        Last
      </button>

      <div className="text-xs xs:text-sm text-gray-900 text-center">
        <p>
          Pages {currentPage} of {totalPages}
        </p>
        <h3>sdf</h3>
      </div>
    </div>
  );
};

export default Pagination;
