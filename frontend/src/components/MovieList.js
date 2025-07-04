import React, { useEffect, useState } from "react";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // <-- ADD THIS LINE
        setMovies(data); // if data is an array, this is fine
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="movie-container">
      <h1 className="movie-title-header">Trending Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.name} className="movie-card">
            <img src={movie.image} alt={movie.name} />
            <div className="rating-badge">{movie.rating} ⭐</div>
            <div className="movie-info">
              <h3>{movie.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
