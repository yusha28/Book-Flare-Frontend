import React from 'react';
import './Pagination.css';

function Pagination({ booksPerPage, totalBooks, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      {pageNumbers.map((number) => (
        <button 
          key={number} 
          onClick={() => paginate(number)}
          className={number === currentPage ? 'active' : ''}
        >
          {number}
        </button>
      ))}
    </nav>
  );
}

export default Pagination;
