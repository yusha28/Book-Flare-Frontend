import React from 'react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  
  // Avoid the error by checking if cartItems exists
  const subtotal = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-details">
                <h2>{item.title}</h2>
                <p>{item.author}</p>
                <p>qty: {item.quantity}</p>
              </div>
              <div className="cart-price">
                {item.price * item.quantity}
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                x
              </button>
            </div>
          ))
        ) : (
          <h2>Your cart is empty</h2>
        )}
      </div>

      <div className="cart-summary">
        <h3>enter promo code or gift card number</h3>
        <input type="text" placeholder="Promo code" />
        <p>subtotal: {subtotal}</p>
        <p>discount: 0</p>
        <h2>total: {subtotal}</h2>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
