import "./MoviesPage.css"
import MovieGroup from "/src/components/MovieGroup/MovieGroup.jsx"

import FightClub from "/src/assets/images/fight_club.jpg"
import Spirit from "/src/assets/images/spirit.jpeg"
import AmericanGangster from "/src/assets/images/AmericanGangster.jpeg"
import Friday from "/src/assets/images/Friday.jpeg"


function MoviesPage(){
    return(
        <div>
            <MovieGroup movies={[FightClub,Spirit,AmericanGangster]} movie_type="Action"/>
            <MovieGroup movies={[Friday]} movie_type="Comedy"/>
        </div>
    )
}

export default MoviesPage;

// what it's gonna look like:
// Recently watched
// Action
// Comedy
// 