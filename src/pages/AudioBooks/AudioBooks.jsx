import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AudioBooks.css';

function AudioBooks() {
  const [audioBooks, setAudioBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudioBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/audiobooks');
        console.log('Fetched audiobooks:', response.data); // Debug: log the fetched data
        setAudioBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch audiobooks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioBooks();
  }, []);

  if (loading) {
    return <h2>Loading audiobooks...</h2>;
  }

  if (audioBooks.length === 0) {
    return <h2>No audiobooks available.</h2>;
  }

  return (
    <div className="audio-books-page">
      <h1>All Audiobooks</h1>
      <p>Explore our vast collection of audiobooks.</p>

      <div className="audio-books-grid">
        {audioBooks.map((book, index) => (
          <div key={book._id || index} className="audio-book-card">
            {/* Debug log for each book */}
            {console.log('Book details:', book)}
            <img
              src={book.image.startsWith('http') ? book.image : `http://localhost:5000${book.image}`}
              alt={book.title}
              onError={(e) => {
                console.error(`Image failed to load: ${book.image}`); // Log image errors
                e.target.src = '/uploads/placeholder.jpg'; // Fallback image
              }}
            />
            <h3>{book.title}</h3>
            <p className="author">By {book.author || 'Unknown Author'}</p>
            
            {/* ✅ Updated Price Format */}
            <p className="price">Price: {book.price ? `${book.price} NPR` : 'N/A'}</p>

            <button
              onClick={() => (window.location.href = `/audiobooks/${book._id}`)}
              className="view-details"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AudioBooks;
