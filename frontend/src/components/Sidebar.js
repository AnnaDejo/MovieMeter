import React from 'react';
import './Sidebar.css';
import { FaBars } from 'react-icons/fa';

function Sidebar({ isExpanded, toggleSidebar }) {
  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
    'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance',
    'Sci-Fi', 'Thriller'
  ];

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isExpanded ? 'Genres' : <FaBars size={20} />}
      </div>

      {isExpanded && (
        <nav className="sidebar-nav">
          {genres.map((genre) => (
            <div key={genre} className="genre-link">{genre}</div>
          ))}
        </nav>
      )}
    </div>
  );
}

export default Sidebar;
