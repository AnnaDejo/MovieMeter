import React, { useEffect, useState } from "react";
import "./MovieList.css";

function MovieList() {
  const [allMovies, setAllMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => {
        const sortedFiltered = data
          .filter((movie) => movie.rating >= 7)
          .sort((a, b) => b.rating - a.rating);
        setAllMovies(sortedFiltered);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, 15));
  };

  const visibleMovies = allMovies.slice(0, visibleCount);

  return (
    <div className="movie-container">
      <h1 className="movie-title-header"></h1>
      <div className="movie-grid">
        {visibleMovies.map((movie) => (
          <div key={movie.name} className="movie-frame">
            <div className="movie-card">
              <div className="poster-wrapper">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="movie-poster"
                />
                <div className="rating-badge">{movie.rating}</div>
              </div>
              <div className="movie-info">
                <h3>{movie.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < 15 && visibleCount < allMovies.length && (
        <div className="show-more-container">
          <a onClick={handleShowMore} className="show-more-link">
            Show More ▾
          </a>
        </div>
      )}
    </div>
  );
}

export default MovieList;
