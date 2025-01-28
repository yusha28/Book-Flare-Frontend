import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Footer from '../../components/Footer';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, calculateSubtotal } = useCart();
  const navigate = useNavigate();

  const subtotal = calculateSubtotal();
  const discount = 0;
  const total = subtotal - discount;

  return (
    <>
      <div className="cart-page">
        {/* Left Side: Cart Items */}
        <div className="cart-items">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((book) => (
              <div key={book.id} className="cart-item">
                <img src={book.image} alt={book.title} />
                <div className="cart-details">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <div className="quantity-container">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(book.id, Math.max(book.quantity - 1, 1))}
                    >
                      -
                    </button>
                    <span className="quantity">{book.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(book.id, book.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <span className="cart-price">{(book.price * book.quantity).toFixed(2)} NPR</span>
                <button className="remove-btn" onClick={() => removeFromCart(book.id)}>
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Summary & Checkout */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <p>
              Subtotal: <span>{subtotal.toFixed(2)} NPR</span>
            </p>
            <p>
              Discount: <span>{discount.toFixed(2)} NPR</span>
            </p>
            <p className="total">
              Total: <span>{total.toFixed(2)} NPR</span>
            </p>
          </div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
