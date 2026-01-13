import "./MovieCard.css"
import CollapsibleText from "../CollapsibleText/CollapsibleText.jsx"

function MovieCard({movie}){
  return(
    <div id='movie_card'>
      <img src={movie.poster_url} alt="Img" />
      {/* movie title */}
      <h3>{movie.title}</h3>
    </div>
  )
}

export default MovieCard