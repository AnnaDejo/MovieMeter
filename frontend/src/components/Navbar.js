import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useUser } from "../contexts/UserContext";  // <== import
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { user } = useUser();  // <== get user

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">MovieMeter</Link>
      </div>

      <div className="nav-search">
        <input type="text" placeholder="Search movies, actors..." />
        <FaSearch className="search-icon" />
      </div>

      <div className="nav-right desktop-links">
        <Link to="/watchlist" className="nav-link">Watchlist</Link>
        {user ? (
          <span className="nav-link">Hi, {user.name}</span>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>

      <button className="hamburger" onClick={toggleMenu}>☰</button>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/watchlist" className="nav-link" onClick={toggleMenu}>Watchlist</Link>
          {user ? (
            <span className="nav-link" onClick={toggleMenu}>Hi, {user.name}</span>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={toggleMenu}>Login</Link>
              <Link to="/register" className="nav-link" onClick={toggleMenu}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
