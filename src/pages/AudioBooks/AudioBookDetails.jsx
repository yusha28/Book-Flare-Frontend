import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";
import "./AudioBookDetails.css";

function AudioBookDetails() {
  const { id } = useParams();
  const [audiobook, setAudiobook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <h2>Loading audiobook details...</h2>;
  }

  if (!audiobook) {
    return <h2>Audiobook not found</h2>;
  }

  return (
    <div className="audiobook-details-page">
      <div className="details-container">
        <div className="details-header">
          <div className="details-image">
            <img
              src={audiobook.image}
              alt={audiobook.title}
              onError={(e) => (e.target.src = "/images/placeholder.jpg")}
            />
            <div className="headphone-icon">
              <FaHeadphones />
            </div>
          </div>
          <div className="details-info">
            <h1>{audiobook.title}</h1>
            <p className="author">By {audiobook.author}</p>
            <p className="narrator">Narrated by {audiobook.narrator || "N/A"}</p>
            <div className="rating">⭐ {audiobook.rating || "N/A"}</div>
            <p>Chapters: {audiobook.chapters.length}</p>
            <button className="listen-button" onClick={handleOpenModal}>
              Listen
            </button>
          </div>
        </div>
        <div className="description">
          <h2>Description</h2>
          <p>{audiobook.description}</p>
        </div>
      </div>

      {/* Modal for Chapters */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Chapters</h2>
            <button className="close-modal" onClick={handleCloseModal}>
              &times;
            </button>
            <ul>
              {audiobook.chapters.map((chapter, index) => (
                <li key={index}>
                  <strong>{chapter.title}</strong>
                  <audio controls>
                    <source src={chapter.audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AudioBookDetails;