import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>
      <Link to="/login">Sign In</Link>
    </nav>
  );
}

export default Header;
