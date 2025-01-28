import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import './BookDetails.css';
import { FaShoppingCart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook({ ...response.data, id: response.data.id || generateUniqueId() });
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      }
    };
    fetchBook();
  }, [id]);

  // Function to Generate a Unique ID if Needed
  const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book);
      toast.success(`${book.title} added to cart!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (!book) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="book-details-container">
      <div className="book-details">
        <div className="book-image-container">
          <img src={book.image} alt={book.title} />
        </div>
        <div className="book-info">
          <h1>{book.title}</h1>
          <h3>{book.author}</h3>
          <div className="price">{book.price} NPR</div>
          <h4>Description</h4>
          <p>{book.summary}</p>

          <div className="actions">
            <button className="buy-btn">Buy Now</button>
            <button className="cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add To Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BookDetails;
