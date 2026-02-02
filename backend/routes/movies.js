import express from "express"

import {get_all_movies,get_shows_or_movies} from "../controllers/moviesController.js"
import {authenticating,fetch_userInfo,signup,verify_email,resend_verification} from "../controllers/userController.js"

const router = express.Router();

router.get("/getAllFilms",get_all_movies);
router.get("/getMovieByType",get_shows_or_movies); //sample url /getMovieByType?type=movie or /getMovieByType?type=show

router.post("/user/login",authenticating);
router.post("/user/getInfo",fetch_userInfo);
router.post("/user/signup",signup);
router.post("/user/resend_verification",resend_verification);

router.get("/user/verify-email",verify_email);

export default router;
