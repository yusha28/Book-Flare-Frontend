import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Book Flare Logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/mybooks">My Books</Link>
        <Link to="/audiobooks">Audio Books</Link>
      </div>

      {isAuthenticated ? (
        <div className="navbar-auth">
          <div className="search-bar">
            <BiMenu className="menu-icon" />
            <input type="text" placeholder="Search" />
          </div>
          <FaShoppingCart className="cart-icon" />
          <FaUser className="user-icon" />
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="navbar-buttons">
          <Link to="/signin">
            <button className="sign-in">Sign in</button>
          </Link>
          <Link to="/signup">
            <button className="sign-up">Sign up</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
