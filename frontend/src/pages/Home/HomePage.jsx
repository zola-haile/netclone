import { useEffect, useState } from "react";

import "./Home.css"

import Trending from "/src/components/Trending/Trending.jsx"
import MovieGroup from "/src/components/MovieGroup/MovieGroup.jsx"


function HomePage(){

    const [allMovies, setAllMovies] = useState([]);
    const [tvshows, setTvshows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [trending_movies, setTrendingMovies] = useState([]);//collects trending movies
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
        try {
            const [allRes, movieRes, showRes] = await Promise.all([
            fetch("http://localhost:3000/movies/getAllFilms/"),
            fetch("http://localhost:3000/movies/getMovieByType?type=movie"),
            fetch("http://localhost:3000/movies/getMovieByType?type=show"),
            ]);

            const [allData, movieData, showData] = await Promise.all([
            allRes.json(),
            movieRes.json(),
            showRes.json(),
            ]);

            setAllMovies(allData);
            setMovies(movieData);
            setTvshows(showData);
        } catch (err) {
            console.error("Failed to fetch movies:", err);
        } finally {
            setLoading(false);
        }
        }

        fetchData();
    }, []);


    if (loading) return <p>Loading...</p>;
    // console.log(movies)


    // const test_movies=[{title:"zola",url:"zola"},{title:"z",url:"zola"},{title:"zedo",url:"zola"}]



    return(
        <div>
            {/* <Trending /> */}
            <Trending movies={tvshows}/>
            <h3>All time rated movies and shows</h3>
            <MovieGroup movies={allMovies}/>
            {/* <MovieGroup movie_type="Movies" movies={[fight_club,spirit,fight_club,spirit,fight_club,spirit,fight_club,spirit,fight_club,spirit]}/>
            <MovieGroup movie_type="Shows" movies={[One_piece]}/> */}
            <h3>All time rated movies and shows</h3>
            <MovieGroup movies={movies}/>

            <h3>All time rated movies and shows</h3>
            <MovieGroup movies={tvshows}/>
        </div>
    )
}

export default HomePage