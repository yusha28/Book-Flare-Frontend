import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AudioBooks.css";
import Footer from "../../components/Footer";

function AudioBooks() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const audiobooksPerPage = 4;
  const navigate = useNavigate();

  // Fetch Audiobooks
  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/audiobooks");
        setAudiobooks(response.data);
      } catch (error) {
        console.error("Failed to fetch audiobooks:", error);
      }
    };
    fetchAudiobooks();
  }, []);

  // Pagination Logic
  const indexOfLastAudiobook = currentPage * audiobooksPerPage;
  const indexOfFirstAudiobook = indexOfLastAudiobook - audiobooksPerPage;
  const currentAudiobooks = audiobooks.slice(
    indexOfFirstAudiobook,
    indexOfLastAudiobook
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (id) => {
    navigate(`/audiobooks/${id}`);
  };

  return (
    <div className="audiobooks-page">
      <h1>All Audiobooks</h1>
      <p>Explore our vast collection of audiobooks.</p>

      {/* Audiobook Cards */}
      <div className="audiobook-grid">
        {currentAudiobooks.map((audiobook) => (
          <div key={audiobook._id} className="audiobook-card">
            <img
              src={audiobook.image}
              alt={audiobook.title}
              onError={(e) => (e.target.src = "/images/placeholder.png")}
            />
            <h3>{audiobook.title}</h3>
            <p className="author">By {audiobook.author}</p>
            <p className="price">{audiobook.price} NPR</p>
            <button
              className="view-details"
              onClick={() => handleViewDetails(audiobook._id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(audiobooks.length / audiobooksPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default AudioBooks;
