import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AudioBooks.css';

function Audiobooks() {
  const [audioBooks, setAudioBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/audiobooks');
        const data = await response.json();
        setAudioBooks(data);
      } catch (error) {
        console.error('Error fetching audiobooks:', error);
      }
    };

    fetchAudiobooks();
  }, []);

  return (
    <div className="audiobooks-page">
      <h1>All Audiobooks</h1>
      <div className="audiobooks-grid">
        {audioBooks.map((book) => (
          <div key={book._id} className="audiobook-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>By {book.author}</p>
            <p>{book.price ? `${book.price} NPR` : 'Price Not Available'}</p>
            <button onClick={() => navigate(`/audiobooks/${book._id}`)}>Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Audiobooks;
