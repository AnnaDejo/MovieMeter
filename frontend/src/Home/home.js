import React, { useEffect } from 'react';
import './home.css';
import Header from '../Header/header';

function Home() {
  useEffect(() => {
    document.title = "Moviemeter - Movie Review App";
  }, []);

  return (
    <div className="home-container">
      <Header />

      <main className="main-content">
        <section className="welcome-section">
          <h1>Welcome to Moviemeter 🎬</h1>
          <p>Explore, review, and keep track of your favorite movies.</p>
        </section>

        {/* You can later add: Trending Movies, Categories, Footer, etc. */}
      </main>
    </div>
  );
}

export default Home;
