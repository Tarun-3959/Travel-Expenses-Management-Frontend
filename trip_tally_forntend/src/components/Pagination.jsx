import React from "react";

function Pagination({ currentPage, totalPage, onPageChange }) {
  let pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  return (
    <div className="w-full flex gap-1 flex-wrap justify-center items-center ">
      <button
        className="px-[10px] py-[2px] font-semibold text-[14px] rounded bg-[#FFF287]"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          style={{
            backgroundColor: page == currentPage ? "#C83F12" : "#FFF287",
          }}
          className="px-[10px] py-[2px] font-semibold text-[14px] rounded"
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-[10px] py-[2px] font-semibold text-[14px] rounded bg-[#FFF287]"
        disabled={currentPage >= totalPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default React.memo(Pagination);
