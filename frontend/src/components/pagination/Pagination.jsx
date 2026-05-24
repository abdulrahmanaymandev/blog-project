import "./pagination.css";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  if (pages <= 1) return null;

  const generatedPages = [];

  for (
    let i = Math.max(currentPage - 2, 1);
    i <= Math.min(currentPage + 2, pages);
    i++
  ) {
    generatedPages.push(i);
  }

  return (
    <nav className="pagination-container" aria-label="Pagination Navigation">
      <button
        className="pagination-btn pagination-nav-btn previous"
        onClick={() => setCurrentPage((current) => current - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <i className="bi bi-arrow-left"></i>
        <span>Prev</span>
      </button>

      <div className="pagination-pages">
        {generatedPages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`pagination-btn page-num-btn ${
              currentPage === page ? "is-active" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-btn pagination-nav-btn next"
        onClick={() => setCurrentPage((current) => current + 1)}
        disabled={currentPage === pages}
        aria-label="Next Page"
      >
        <span>Next</span>
        <i className="bi bi-arrow-right"></i>
      </button>
    </nav>
  );
};

export default Pagination;
