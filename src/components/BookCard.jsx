import React from 'react';
import './BookCard.css';

function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.img} alt={book.title} />
      <h3>{book.title}</h3>
      <p>${book.price}</p>
      <button className="buy-now">Buy Now</button>
    </div>
  );
}

export default BookCard;
