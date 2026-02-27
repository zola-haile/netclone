import {add_movie,return_all_movies,return_shows_movies,get_movies_by_id} from "../db/queries.js"

const get_all_movies = async (req, res)=>{
    try{
        const movies = await return_all_movies();
        res.json(movies);
    }catch(err){
        console.error("Could not fetch all movies from DB: ",err);
    }
    
}

const get_shows_or_movies = async (req,res)=>{
    try{
            const chosen_type = req.query.type; // read from URL query (?type=movie)

        const chosen_films = await return_shows_movies(chosen_type);
        res.json(chosen_films);
    }catch(err){
        console.error("Could not fetch required movies from DB: ", err)
    }
    
}



export {get_all_movies,get_shows_or_movies}