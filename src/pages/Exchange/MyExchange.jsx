import React, { useEffect, useState } from 'react';
import './MyExchange.css';

function MyExchange() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/exchange/my-books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch your books');
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching your books:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/exchange/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      alert('Book deleted successfully');
      fetchBooks(); // Refresh the list
    } catch (error) {
      console.error('Error deleting book:', error.message);
      alert('Error deleting book');
    }
  };

  const editBook = async (id, updatedDetails) => {
    try {
      const response = await fetch(`http://localhost:5000/api/exchange/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      alert('Book updated successfully');
      fetchBooks(); // Refresh the list
    } catch (error) {
      console.error('Error updating book:', error.message);
      alert('Error updating book');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <h2>Loading your books...</h2>;
  }

  return (
    <div className="my-exchange">
      <h2>My Listings</h2>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={`http://localhost:5000/uploads/${book.image}`}
                alt={book.title}
              />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Condition: {book.condition}</p>
              <p>Price: ${book.price}</p>
              <p>Terms: {book.terms}</p>

              {/* Edit and Delete buttons */}
              <div className="book-actions">
                <button
                  className="edit-button"
                  onClick={() => {
                    const updatedDetails = {
                      title: prompt('Enter new title:', book.title),
                      price: prompt('Enter new price:', book.price),
                    };
                    if (updatedDetails.title && updatedDetails.price) {
                      editBook(book._id, updatedDetails);
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteBook(book._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No books listed by you.</p>
        )}
      </div>
    </div>
  );
}

export default MyExchange;
