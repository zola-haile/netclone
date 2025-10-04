import { useState } from 'react'
import './App.css'
import fight_club from '/src/assets/fight_club.jpg';
import spirit from './assets/spirit.jpeg';
import one_piece from './assets/One_piece.jpg'


function NavBar() {
  return (
    <nav id='nav_container'>
      <ul id='nav_list'>
        <li><h2>NetClone</h2></li> <li><h2>Movies</h2></li> <li><h2>Shows</h2></li> <li><h2>User</h2></li>
      </ul>
    </nav>
  )
}

function Trending(){
  return (
    <div>
      <h3>Trending</h3>
    </div>
  )
}

function Movie_card({movie}){
  return(
    <div id='movie_card'>
      <img src={movie} alt="" />
    </div>
  )
}

function Movie_group({movie_type,movies}){

  return (
    <div>
      <h3> {movie_type}</h3>
      {movies.map((movie,index)=>(
        <Movie_card movie={movie} />
      ))}
    </div>
  )
}

function App() {
  return (
    <>
      <div>
        <NavBar/>
        <Trending />
        <Movie_group movie_type="Movies" movies={[spirit,fight_club]}/>
        <Movie_group movie_type="Shows" movies={[one_piece]}/>
        <Movie_group movie_type="Your Last watches" movies={[fight_club]}/>

      </div>
    </>
  )
}

export default App
