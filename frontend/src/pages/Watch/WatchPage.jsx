import { useLocation } from "react-router-dom";
import "./WatchPage.css"


function WatchPage() {
  const { state } = useLocation();
  const movie = state?.movie;

  if (!movie) return <p>No movie data</p>;

  return (
    <div className="watching_container">
    
      <h1>Watching {movie.title}</h1>
      
      <video controls>
        <source src= "./French_Final.mp4" type="video/mp4" />
      </video>

      <p>{movie.description}</p>

      {/* <iframe
        width="800"
        height="450"
        src="https://www.youtube.com/embed/NIk_0AW5hFU"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        /> */}


    </div>
  );
}


export default WatchPage;
