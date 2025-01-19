import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Book Flare Logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link> {/* Re-added "Books" */}
        <Link to="/book-exchange">Book Exchange</Link> {/* Book Exchange */}
        <Link to="/audiobooks">Audio Books</Link>
      </div>

      <div className="navbar-buttons">
        <Link to="/signin">
          <button className="sign-in">Sign in</button>
        </Link>
        <Link to="/signup">
          <button className="sign-up">Sign up</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
