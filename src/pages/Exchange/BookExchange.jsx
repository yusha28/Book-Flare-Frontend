import React, { useEffect, useState } from 'react';
import './BookExchange.css';

function BookExchange() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // State to store error messages

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Retrieve JWT token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Unauthorized access. Please log in.');
        }

        const response = await fetch('http://localhost:5000/api/exchange', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || 'Failed to fetch books');
        }

        const data = await response.json();
        setBooks(data); // Update the books state with fetched data
      } catch (error) {
        console.error('Error fetching books:', error.message);
        setError(error.message); // Set error message in state
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <h2>Loading books...</h2>;
  }

  if (error) {
    return <h2 className="error-message">{error}</h2>; // Display error message if any
  }

  return (
    <div className="book-exchange">
      <h2>Available Books for Exchange</h2>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={`http://localhost:5000/uploads/${book.image}`}
                alt={book.title}
                className="book-image"
              />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Condition:</strong> {book.condition}</p>
                <p><strong>Price:</strong> ${book.price}</p>
                <p><strong>Terms:</strong> {book.terms}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No books available for exchange at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default BookExchange;
