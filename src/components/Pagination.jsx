import React from 'react';

function Pagination({ totalProducts, prodperPage, setCurrentPage, currentPage }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / prodperPage); i++) {
    pages.push(i);
  }

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <button
        onClick={handlePrev}
        className="btn btn-primary me-2"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`btn me-2 ${
            currentPage === page ? 'btn-warning' : 'btn-outline-warinig'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        className="btn btn-primary"
        disabled={currentPage === pages.length}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
