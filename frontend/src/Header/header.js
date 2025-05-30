import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="logo">Moviemeter</div>

      <div className="search-bar">
        <input type="text" placeholder="Search movies..." />
      </div>

      <div className="nav-buttons">
        <button>Watchlist</button>
        <button><Link to="/signin">Sign In</Link></button>
      </div>
    </div>
  );
}

export default Header;
