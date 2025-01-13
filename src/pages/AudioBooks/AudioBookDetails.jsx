import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AudioBookDetails.css';

function AudiobookDetails() {
  const { id } = useParams();
  const [audiobook, setAudiobook] = useState(null);

  useEffect(() => {
    const fetchAudiobook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/audiobooks/${id}`);
        const data = await response.json();
        setAudiobook(data);
      } catch (error) {
        console.error('Error fetching audiobook:', error);
      }
    };

    fetchAudiobook();
  }, [id]);

  const handleListenClick = () => {
    alert('Please purchase this audiobook to listen.');
  };

  if (!audiobook) return <h2>Loading...</h2>;

  return (
    <div className="audiobook-details">
      <div className="details-header">
        <img src={audiobook.image} alt={audiobook.title} />
        <div>
          <h1>{audiobook.title}</h1>
          <h3>By {audiobook.author}</h3>
          <p>{audiobook.price ? `${audiobook.price} NPR` : 'Price Not Available'}</p>
          <button onClick={handleListenClick}>Listen</button>
        </div>
      </div>
      <h2>Description</h2>
      <p>{audiobook.description || 'No description available.'}</p>
      <h2>Chapters</h2>
      <div className="chapters-list">
        {audiobook.chapters.map((chapter, index) => (
          <div key={index} className="chapter-item">
            <h4>{chapter.title}</h4>
            <audio controls src={`http://localhost:5000${chapter.audioSrc}`}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AudiobookDetails;
