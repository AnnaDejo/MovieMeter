import React from 'react';
import './Sidebar.css';

function Sidebar() {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller"
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Genres</h2>
      <nav className="sidebar-nav">
        {genres.map((genre) => (
          <div key={genre} className="genre-link">{genre}</div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
