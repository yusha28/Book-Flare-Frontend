import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

function AuthenticatedNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/book-exchange?search=${searchTerm}`);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownVisible &&
      !event.target.closest(".profile-container")
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
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
        <Link to="/book-exchange">Book Exchange</Link>
        <Link to="/audiobooks">Audio Books</Link>
      </div>

      <div className="navbar-auth">
        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <BiMenu className="menu-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Cart Icon */}
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
        </Link>

        {/* Profile Dropdown */}
        <div className="profile-container">
          <FaUser className="user-icon" onClick={toggleDropdown} />
          {dropdownVisible && (
            <div className="profile-dropdown">
              <Link to="/">Home</Link>
              <Link to="/profile">Edit Profile</Link>
              <Link to="/my-exchange">My Exchange</Link>
              <Link to="/upload">Upload</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AuthenticatedNavbar;
