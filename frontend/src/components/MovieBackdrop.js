import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MovieBackdrop.css";

function MovieBackdrop() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setMovies(shuffled.slice(0, 10));
      });
  }, []);

  const nextMovie = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  return (
    <div className="hero-3d-stack">
      <div className="stack-container" onClick={nextMovie}>
        {movies.map((movie, i) => {
          const relativeIndex = (i - currentIndex + movies.length) % movies.length;

          const centerSlot = 5;
          const offset = relativeIndex - centerSlot;

          const translateX = offset * 100;
          const scale = offset === 0 && hovering ? 1.1 : 0.95 - Math.abs(offset) * 0.091;
          const zIndex = 100 - Math.abs(offset);
          const opacity = Math.abs(offset) > 4 ? 0 : 1;

          return (
            <motion.div
              key={movie.id}
              className="hero-card"
              style={{
                backgroundImage: `url(${movie.image})`,
                zIndex: zIndex,
              }}
              animate={{
                x: translateX,
                scale: scale,
                opacity: opacity,
                rotateY: offset * -5,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {offset === 0 && <h3>{movie.title}</h3>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieBackdrop;
