import React, { useEffect, useState } from "react";
import "./MovieList.css";

function MovieList({ sidebarExpanded }) {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(sidebarExpanded ? 4 : 5);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .filter((movie) => parseFloat(movie.rating) >= 8)
          .sort((a, b) => b.rating - a.rating);
        setMovies(sorted);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  useEffect(() => {
    // Reset visible count based on sidebar state
    setVisibleCount(sidebarExpanded ? 4 : 5);
  }, [sidebarExpanded]);

  const handleShowMore = () => {
    const increment = sidebarExpanded ? 4 : 5;
    setVisibleCount((prev) => Math.min(prev + increment, 15));
  };

  return (
    <div className="movie-container">
      <div className={`movie-grid ${sidebarExpanded ? "grid-4" : "grid-5"}`}>
        {movies.slice(0, visibleCount).map((movie) => (
          <div key={movie.name} className="movie-frame">
            <div className="movie-card">
              <img src={movie.image} alt={movie.name} className="movie-poster" />
              <div className="rating-badge">{movie.rating}</div>
            </div>
            <div className="movie-title">{movie.name}</div>
          </div>
        ))}
      </div>

      {visibleCount < Math.min(movies.length, 15) && (
        <div className="show-more-container">
          <a onClick={handleShowMore} className="show-more-link">Show More</a>
        </div>
      )}
    </div>
  );
}

export default MovieList;
