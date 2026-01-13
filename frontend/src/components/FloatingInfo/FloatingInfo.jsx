import "./FloatingInfo.css"
import CollapsibleText from "../CollapsibleText/CollapsibleText.jsx"

function FloatingInfo({movie}){
  return(
    <div className="floating-info">
      {/* movie title */}
      <h3>{movie.title}</h3>
      <div>
        {/* Rating */}

        <div className="rating_runtime">
          <p>Rating: {movie.rating}/10</p>
          <p>Run Time(mins): {movie.runtime_minutes}</p>
        </div>
        <p>{movie.description}</p>
       
      </div>
      {/* Description--> collapsible*/}
      

      <button>Watch Now</button>
       {/* Watch option/play as a button */}
    </div>
  )
}

export default FloatingInfo
