import React from "react";
import { useParams } from "react-router-dom";
import "./AudioBookDetails.css";

function AudioBookDetails() {
  // Get the audiobook ID from the URL
  const { id } = useParams();

  // Dummy data (replace with actual data from backend or state management)
  const audiobooks = [
    {
      id: 1,
      title: "Frankenstein",
      author: "Mary Shelley",
      price: 500,
      image: "/images/frankenstein.jpg",
      rating: 4.5,
      narrator: "John Doe",
      description:
        "Frankenstein is a classic gothic novel that explores themes of human ambition, morality, and the consequences of playing god.",
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 450,
      image: "/images/the_alchemist.jpg",
      rating: 4.8,
      narrator: "Jane Smith",
      description:
        "The Alchemist is a spiritual journey of a shepherd boy, Santiago, who dreams of finding a treasure buried in the Egyptian pyramids.",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: 600,
      image: "/images/placeholder.jpg",
      rating: 4.7,
      narrator: "Peter Johnson",
      description:
        "1984 is a dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
    },
  ];

  // Find the audiobook by ID
  const audiobook = audiobooks.find((book) => book.id === parseInt(id));

  // If no audiobook is found, display an error
  if (!audiobook) {
    return <h2>Audiobook not found</h2>;
  }

  return (
    <div className="audiobook-details-page">
      <div className="details-container">
        {/* Left Side: Book Image */}
        <div className="details-image">
          <img
            src={audiobook.image}
            alt={audiobook.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder.jpg";
            }}
          />
        </div>

        {/* Right Side: Book Details */}
        <div className="details-info">
          <h1>{audiobook.title}</h1>
          <h3>By {audiobook.author}</h3>
          <p>
            <strong>Narrated by:</strong> {audiobook.narrator}
          </p>
          <p>
            <strong>Price:</strong> ${audiobook.price}
          </p>
          <p>
            <strong>Rating:</strong> {audiobook.rating} ★
          </p>
          <button
            className="listen-button"
            onClick={() => alert("Start Listening...")}
          >
            Listen
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="details-description">
        <h2>Description</h2>
        <p>{audiobook.description}</p>
      </div>
    </div>
  );
}

export default AudioBookDetails;
