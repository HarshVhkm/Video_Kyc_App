import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <small className="text-muted">
        Showing {startItem}-{endItem} of {totalItems}
      </small>

      <nav>
        <ul className="pagination pagination-sm mb-0">
          {/* Left Arrow */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>
          </li>

          {/* Right Arrow */}
          <li
            className={`page-item ${currentPage === totalPages || totalPages === 0
                ? "disabled"
                : ""
              }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              ›
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
