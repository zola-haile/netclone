import "./Trending.css"
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";


function Trending({ movies = [] }) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);
  const timeInterval = 8000;

  const goTo = (newIndex) => {
    setFading(true);
    setTimeout(() => {
      setIndex(newIndex);
      setFading(false);
    }, 300);
  };

  const next = () => goTo((index + 1) % movies.length);
  const prev = () => goTo((index - 1 + movies.length) % movies.length);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, timeInterval);
  };

  const handleNext = () => { next(); resetTimer(); };
  const handlePrev = () => { prev(); resetTimer(); };

  useEffect(() => {
    if (!movies.length) return;
    timerRef.current = setInterval(next, timeInterval);
    return () => clearInterval(timerRef.current);
  }, [movies]);

  if (!movies.length) return null;

  const movie = movies[index];

  return (
    <div
      id="trending_container"
      style={{ backgroundImage: `url(${movie.poster_url})` }}
    >
      {/* Gradient overlays */}
      <div className="trending_overlay" />
      <div className="trending_overlay_bottom" />

      {/* Content */}
      <div className={`trending_content ${fading ? "trending_fade" : ""}`}>
        <div className="trending_badges">
          <span className="trending_badge">{movie.movie_type === "show" ? "TV Show" : "Movie"}</span>
          {movie.rating && <span className="trending_rating">⭐ {movie.rating}</span>}
        </div>

        <h1 className="trending_title">{movie.title}</h1>

        {movie.genres?.length > 0 && (
          <div className="trending_genres">
            {movie.genres.slice(0, 3).map((g, i) => (
              <span key={i} className="trending_genre_tag">{g}</span>
            ))}
          </div>
        )}

        <p className="trending_description">
          {movie.description?.length > 200
            ? movie.description.slice(0, 200) + "…"
            : movie.description}
        </p>

        <div className="trending_actions">
          <Link to="/watch" state={{ movie }} className="trending_watch_btn">
            ▶ Watch Now
          </Link>
        </div>
      </div>

      {/* Prev arrow */}
      <button className="trending_arrow trending_arrow_left" onClick={handlePrev}>‹</button>

      {/* Next arrow */}
      <button className="trending_arrow trending_arrow_right" onClick={handleNext}>›</button>

      {/* Dot indicators */}
      <div className="trending_dots">
        {movies.map((_, i) => (
          <button
            key={i}
            className={`trending_dot ${i === index ? "trending_dot_active" : ""}`}
            onClick={() => { goTo(i); resetTimer(); }}
          />
        ))}
      </div>
    </div>
  );
}

export default Trending
