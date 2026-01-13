import express from "express"

import {get_all_movies,get_shows_or_movies} from "../controllers/moviesController.js"
import {authenticating} from "../controllers/userController.js"

const router = express.Router();

router.get("/getAllFilms",get_all_movies);
router.get("/getMovieByType",get_shows_or_movies); //sample url /getMovieByType?type=movie or /getMovieByType?type=show

router.post("/user/login",authenticating);

export default router;
