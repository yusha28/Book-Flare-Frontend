import React, { useEffect, useState } from 'react';
import './MyExchange.css';
import EditBookModal from '../../components/EditBookModal';

function MyExchange() {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null); // Tracks the book being edited

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/exchange/my-books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        setMyBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, []);

  const handleUpdate = (updatedBook) => {
    setMyBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
    );
  };

  const handleDelete = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/exchange/delete/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      setMyBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      alert('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error.message);
      alert('Failed to delete book');
    }
  };

  if (loading) {
    return <h2>Loading your books...</h2>;
  }

  return (
    <div className="my-exchange">
      <h2>My Uploaded Books</h2>
      <div className="book-list">
        {myBooks.length > 0 ? (
          myBooks.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={book.image.startsWith('http') ? book.image : `http://localhost:5000/uploads/${book.image}`}
                alt={book.title}
                onError={(e) => (e.target.src = "/images/placeholder.jpg")} // Fallback image
              />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Condition:</strong> {book.condition}</p>
              <p><strong>Price:</strong> {book.price} NPR</p>
              <p><strong>Terms:</strong> {book.terms}</p>
              <div className="book-actions">
                <button className="edit-button" onClick={() => setEditingBook(book)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(book._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No books uploaded yet.</p>
        )}
      </div>

      {/* Show Edit Modal */}
      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default MyExchange;
