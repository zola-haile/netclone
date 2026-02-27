import "./MoviesWraped.css"

function MoviesWraped({ historyList }) {
    console.log(historyList)
    return (
        <div className="movies-grid">
            {historyList.map((item) => (
                <div key={item.id} className="movie-card">
                    
                    <div className="poster-wrapper">
                        <img 
                            src={item.poster_url} 
                            alt={item.title} 
                            className="movie-poster"
                        />
                        <div className="rating-badge">
                            ⭐ {item.rating}
                        </div>
                    </div>

                    <div className="movie-info">
                        <h3 className="movie-title">{item.title}</h3>
                        <p className="movie-meta">
                            {item.year || "N/A"} • {item.runtime_minutes} min
                        </p>
                        <p className="movie-genre">
                            {item.genres?.join(", ")}
                        </p>
                        <p className={`watch-status ${item.completed ? "done" : "in-progress"}`}>
                            {item.completed ? "Completed" : "In Progress"}
                        </p>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default MoviesWraped;