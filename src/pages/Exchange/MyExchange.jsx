import React, { useState, useEffect } from 'react';

function MyExchange() {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    // Fetch the books uploaded by the current user
    fetch('http://localhost:5000/api/books/my')
      .then((res) => res.json())
      .then((data) => setMyBooks(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setMyBooks(myBooks.filter((book) => book._id !== id));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="my-exchange">
      <h1>My Exchange</h1>
      <div className="book-list">
        {myBooks.map((book) => (
          <div key={book._id} className="book-card">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
            <button>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyExchange;
