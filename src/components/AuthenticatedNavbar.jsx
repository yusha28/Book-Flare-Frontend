import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';

function AuthenticatedNavbar() {
  const { logout } = useAuth();

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

      <div className="navbar-auth">
        <div className="search-bar">
          <BiMenu className="menu-icon" />
          <input type="text" placeholder="Search" />
        </div>

        {/* Wrap Cart Icon in Link to Navigate to Cart Page */}
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
        </Link>

        <FaUser className="user-icon" />
        <button className="logout" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default AuthenticatedNavbar;
