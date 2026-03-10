import { useEffect, useState } from "react";

import "./Home.css"

import Trending from "/src/components/Trending/Trending.jsx"
import MovieGroup from "/src/components/MovieGroup/MovieGroup.jsx"


function HomePage(){

    const [allMovies, setAllMovies] = useState([]);
    const [tvshows, setTvshows] = useState([]);
    const [movies, setMovies] = useState([]);
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


    if (loading) return (
        <div className="home_loading">
            <div className="home_spinner" />
        </div>
    );

    return(
        <div className="home_page">
            <Trending movies={tvshows}/>

            <div className="home_sections">
                <section className="home_section">
                    <div className="section_header">
                        <h2 className="section_title">Top Rated</h2>
                        <span className="section_subtitle">Best of movies & shows</span>
                    </div>
                    <MovieGroup movies={allMovies}/>
                </section>

                <section className="home_section">
                    <div className="section_header">
                        <h2 className="section_title">Movies</h2>
                        <span className="section_subtitle">Latest films</span>
                    </div>
                    <MovieGroup movies={movies}/>
                </section>

                <section className="home_section">
                    <div className="section_header">
                        <h2 className="section_title">TV Shows</h2>
                        <span className="section_subtitle">Binge-worthy series</span>
                    </div>
                    <MovieGroup movies={tvshows}/>
                </section>
            </div>
        </div>
    )
}

export default HomePage
