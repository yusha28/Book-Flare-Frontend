import React, { createContext, useContext, useState } from 'react';

// Create Context
const CartContext = createContext();

// Hook to Use Cart
export const useCart = () => {
  return useContext(CartContext);
};

// Provider to Wrap the App
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);  // 🟢 cartItems starts as an empty array

  const addToCart = (book) => {
    setCartItems((prev) => {
      // Instead of merging, push a new book item to the cart array
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
