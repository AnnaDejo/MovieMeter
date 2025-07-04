import React, { useState } from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import MovieList from '../components/MovieList';

function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };

  return (
    <div className="home-container">
      <Sidebar isExpanded={sidebarExpanded} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <header className="hero-section">
          <div className="hero-overlay">
            <h1>Welcome to MovieMeter</h1>
            <p>Discover top-rated movies and dive into your favorites!</p>
          </div>
        </header>

        <section className="trending-section">
          <h2 className="section-title">Trending Movies</h2>
          <MovieList sidebarExpanded={sidebarExpanded} />
        </section>
      </div>
    </div>
  );
}

export default Home;
