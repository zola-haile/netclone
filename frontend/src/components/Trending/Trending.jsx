import "./Trending.css"
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import OnePiece from "/src/assets/images/One_piece.jpg"
import Rickmorty from "/src/assets/images/rickmorty.jpeg"


function Trending({ movies = [] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const timeInterval = 8000;

  const next = ()=>{
    setIndex((prev)=>(prev + 1) % movies.length);
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, timeInterval);
  };

  const handleNext = ()=>{
    next();
    resetTimer()
  }

  const handlePrev = () => {
    prev();
    resetTimer();
  }


  useEffect(() => {
    if (!movies.length) return;

    timerRef.current = setInterval(() => {
      next();
    }, timeInterval); 

    return () => clearInterval(timerRef.current);
  }, [movies]);

  if (!movies.length) return null;

  const movie = movies[index];

  return (
      <div id="trending_container">
              <div onClick={handlePrev}> Prev </div>
              
              <div key={movie.id} className="trending_item">
               <Link to="/watch" state={{movie}}>
               <h3>{movie.title}</h3> 

                <div id="desc_container">
                  <p>{movie.movie_type}</p>
                  <p>{movie.rating}</p>
                  <p>{movie.description}</p>
                </div>
                </Link>
                
              </div>
              
              
              <div className="image_container">
                <Link to="/watch" state={{movie}}>
                  <img src={movie.poster_url} alt={movie.title} />
                </Link>
              </div>

              <div onClick={handleNext}> Next </div>
        
      </div>
  );
}




export default Trending