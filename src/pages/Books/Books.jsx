import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Books.css';
import Footer from '../../components/Footer';  

function Books() {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  const [genreFilter, setGenreFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Fetch Books
  useEffect(() => {
    const fetchBooks = async () => {
      const searchQuery = searchParams.get('search') || '';
      try {
        const response = await axios.get(`http://localhost:5000/api/books?search=${searchQuery}`);
        setBooks(response.data);
        setAllBooks(response.data); // Store all books for filtering
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
    fetchBooks();
  }, [searchParams]);

  // Filter by Genre
  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    setGenreFilter(selectedGenre);
    filterBooks(selectedGenre, sortOption);
  };

  // Sort by Price
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort);
    filterBooks(genreFilter, selectedSort);
  };

  // Reset Filters
  const resetFilters = () => {
    setGenreFilter('');
    setSortOption('');
    setBooks(allBooks);
    setSearchParams({});
  };

  // Filtering Logic
  const filterBooks = (genre, sort) => {
    let filteredBooks = allBooks;

    if (genre) {
      filteredBooks = filteredBooks.filter((book) => book.genre.toLowerCase() === genre.toLowerCase());
    }

    if (sort === 'asc') {
      filteredBooks.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      filteredBooks.sort((a, b) => b.price - a.price);
    }

    setBooks(filteredBooks);
    setCurrentPage(1);
  };

  // Pagination Logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="books-page">
      <h1>All Books</h1>
      <p>Explore our extensive collection of hand-picked books across various genres.</p>

      {/* Filters Section */}
      <div className="filter-section">
        <select value={genreFilter} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Adventure">Adventure</option>
        </select>

        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* Book Cards */}
      <div className="book-grid">
        {currentBooks.map((book) => (
          <div key={book._id} className="book-card">
            <img
              src={book.image}
              alt={book.title}
              onError={(e) => (e.target.src = '/images/placeholder.png')}
            />
            <h3>{book.title}</h3>
            <p className="author">{book.author}</p>
            <p className="price">{book.price} NPR</p>
            <button className="view-details" onClick={() => handleViewDetails(book._id)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Books;
