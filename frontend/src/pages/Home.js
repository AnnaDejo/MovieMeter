import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MovieList from '../components/MovieList';
import MovieBackdrop from '../components/MovieBackdrop';
import './Home.css';

function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [randomMovies, setRandomMovies] = useState([]);

  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };

  useEffect(() => {
  fetch('http://localhost:8080/api/movies')
    .then(res => res.json())
    .then(data => {
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 8);
      console.log("Fetched & selected movies:", selected); 
      setRandomMovies(selected);
    });
}, []);

  return (
    <div className="home-container">
      <Sidebar isExpanded={sidebarExpanded} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <MovieBackdrop movies={randomMovies} />

        <section className="trending-section">
          <h2 className="section-title">Trending Movies</h2>
          <MovieList sidebarExpanded={sidebarExpanded} />
        </section>
      </div>
    </div>
  );
}

export default Home;
