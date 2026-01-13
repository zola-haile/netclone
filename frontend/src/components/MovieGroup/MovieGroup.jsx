import "./MovieGroup.css";
import { useState } from "react";
import MovieCard from "../MovieCard/MovieCard.jsx";
import CollapsibleText from "../CollapsibleText/CollapsibleText.jsx";
import FloatingInfo from "../FloatingInfo/FloatingInfo.jsx"


function MovieGroup({ movies = [] }) {
  // Track which movie is currently hovered
  const [hoveredMovie, setHoveredMovie] = useState(null);

  return (
    <div className="movie_group">
      {movies.length === 0 ? (
        <p>Loading or no movies available...</p>
        ) : (
              movies.map((movie) => (
                <div
                  key={movie.title}
                  className="movie-item"
                  onMouseEnter={() => setHoveredMovie(movie)}
                  onMouseLeave={() => setHoveredMovie(null)}
                >
                  <MovieCard movie={movie} />

                  {/* Conditional rendering (no 'if' needed) */}
                  {hoveredMovie === movie && <FloatingInfo movie={movie} />}
                </div>
              ))
            )}
    </div>
  );
}


export default MovieGroup;
