import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?search=${searchTerm}`);
    }
  };

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
          <form className="search-bar" onSubmit={handleSearch}>
            <BiMenu className="menu-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* Cart Icon Wrapped with Link */}
          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />
          </Link>

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
