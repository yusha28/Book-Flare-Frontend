import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AudioBookDetails.css";

function AudioBookDetails() {
  const { id } = useParams();
  const [audiobook, setAudiobook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudiobook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/audiobooks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch audiobook details");
        }
        const data = await response.json();
        setAudiobook(data);
      } catch (error) {
        console.error("Error fetching audiobook details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobook();
  }, [id]);

  if (loading) {
    return <h2>Loading audiobook details...</h2>;
  }

  if (!audiobook) {
    return <h2>Audiobook not found</h2>;
  }

  return (
    <div className="audiobook-details-page">
      <div className="details-header">
        <div className="details-info">
          <h1>{audiobook.title}</h1>
          <h2>{audiobook.subtitle || ""}</h2>
          <p className="author">By <span>{audiobook.author}</span></p>
          <p className="narrator">
            Narrated by <span>{audiobook.narrator || "N/A"}</span>
          </p>
          <div className="rating">⭐ {audiobook.rating || "N/A"}</div>
          <button className="listen-button" onClick={() => alert("Please buy the audiobook to listen!")}>
            Listen
          </button>
        </div>
        <div className="details-image">
          <img
            src={`http://localhost:5000${audiobook.image}`}
            alt={audiobook.title}
            onError={(e) => (e.target.src = "/images/placeholder.jpg")}
          />
        </div>
      </div>

      <div className="description">
        <h2>Description</h2>
        <p>{audiobook.description}</p>
      </div>

      <div className="chapters">
        <h2>Chapters</h2>
        {audiobook.chapters.map((chapter, index) => (
          <div key={index} className="chapter">
            <h3>{chapter.title}</h3>
            <audio controls>
              <source src={`http://localhost:5000${chapter.audioSrc}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AudioBookDetails;
