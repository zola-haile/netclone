// addData.js

import pool from "./pool.js"
import {add_movie} from "./queries.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse JSON
const jsonPath = path.join(__dirname, '../rated_shows.json');
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));


// Use jsonData below
// console.log(jsonData);

jsonData.forEach((m)=>{
    console.log(m.rating);
    // add_movie(
    //     {
    //         title:m.title,
    //         genres:m.genres,
    //         description:m.description,
    //         poster_url:m.poster_url,
    //         trailer_url:m.trailer_url,
    //         runtime_minutes:m.runtime_minutes,
    //         language:m.language,
    //         country:m.country,
    //         rating:m.rating,
    //         vote_count:m.vote_count,
    //         popularity_score:m.popularity_score,
    //         movie_type:m.type
    //     }
    // )
})



// 



