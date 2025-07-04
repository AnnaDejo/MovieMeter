import React from 'react';
import './Home.css';
import MovieList from "../components/MovieList";

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>🎬 Welcome to MovieMeter</h1>
          <p>Discover top-rated movies and dive into your favorites!</p>
          <button className="cta-button">Explore Now</button>
        </div>
      </header>

      <section className="trending-section">
        <h2 className="section-title">Trending Movies</h2>
        <MovieList />
      </section>
    </div>
  );
}

export default Home;
