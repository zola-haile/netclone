import pool from "./pool.js"
import bcrypt from "bcrypt";



const create_movies_table = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS movies (
        -- Core Movie Metadata
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        year INT,
        release_date DATE,
        genres TEXT[],
        description TEXT,
        poster_url TEXT,
        trailer_url TEXT,
        runtime_minutes INT,
        language VARCHAR(50),
        country VARCHAR(100),
        movie_type VARCHAR(100),

        -- Creative Information
        director VARCHAR(255),
        writers TEXT[],
        main_cast TEXT[],
        production_company VARCHAR(255),

        -- Ratings and Popularity
        rating FLOAT,
        vote_count INT DEFAULT 0,
        popularity_score FLOAT DEFAULT 0,

        -- Categorization / Technical
        content_rating VARCHAR(10),
        available_regions TEXT[],
        subtitles TEXT[],
        audio_languages TEXT[],
        file_url TEXT,

        -- User Interaction (optional)
        likes_count INT DEFAULT 0,
        watch_count INT DEFAULT 0,
        added_by_user_id INT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await pool.query(query);
    console.log("Movies table created successfully");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};



// create_movies_table();


const add_movie = async ({ title, year, release_date, genres, description,
    poster_url, trailer_url, runtime_minutes,language, country, director, 
    writers, main_cast, production_company, rating, vote_count, popularity_score, 
    content_rating, available_regions, subtitles, audio_languages, file_url,movie_type}) => {
    try {
        const query = `
        INSERT INTO movies (
            title, year, release_date, genres, description,
            poster_url, trailer_url, runtime_minutes, language, country,
            director, writers, main_cast, production_company,
            rating, vote_count, popularity_score,
            content_rating, available_regions, subtitles, audio_languages, file_url
        )
        VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14,
            $15, $16, $17,
            $18, $19, $20, $21, $22
        )
        RETURNING *;
        `;

        const values = [ title, year, release_date, genres, description, poster_url, 
            trailer_url, runtime_minutes, language, country, director, writers,
            main_cast, production_company, rating, vote_count, popularity_score, 
            content_rating, available_regions, subtitles, audio_languages, file_url,movie_type
        ];

        const result = await pool.query(query, values);
        console.log("Movie added successfully:", result.rows[0]);
    } catch (err) {
        console.error("Error adding movie:", err);
    }
    };


const print_movies = async ()=>{
  try{
    const movies = await pool.query("SELECT * FROM movies;");
    console.log(movies.rows);
  }catch(err){
    console.error("Error adding movie:", err);
  }
}

// print_movies();

const return_all_movies = async ()=>{
    try{
        const all_movies = await pool.query("SELECT * FROM movies");
        return all_movies.rows;
    }catch(err){
        console.log("Not able to return movies")
        return;
    }
}

const make_show = async ()=>{
  try{
      await pool.query("UPDATE movies SET movie_type='show' where movie_type IS NULL");
      return;
  }catch(err){
      console.log("Not able to return movies")
      return;
  }
}

// make_show()


const return_shows_movies = async(movie_type) =>{
    try{
        const query = `
            SELECT * FROM MOVIES
            WHERE movie_type=$1;
        `
        const movie = await pool.query(query,[movie_type]);
        return movie.rows;
    }catch(err){
        console.log("Not able to return movies")
        return;
    }
}

// const shows= await return_shows_movies('show');
// console.log(shows)

// const movies= await return_shows_movies('movie');
// console.log(movies);




const update_movies_table = async (title,year)=>{
  try{
    const query = ` 
      UPDATE movies
      SET year=$1
      WHERE title ILIKE $2;
    `
    await pool.query(query,[year,title]);
    console.log("Updated!")
  }catch(err){
    console.error("Error adding movie:", err);
  }
}

const get_movies_by_id = async (movie_ids) =>{
  try{
    const query = ` 
      SELECT * 
      FROM movies
      JOIN movies ON watch_history.id
      WHERE id=ANY($1);
    `
    const movie = await pool.query(query,[movie_ids]);
    return movie;

  }catch(err){
    console.error("Error: ", err);
  }
}

// get_movies_by_id([1,2,3,4]).then(res=>console.log(res.rows));


//user table:

const create_user_table = async ()=>{
  try{
    const query =`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_validated BOOLEAN
      );
    `
    await pool.query(query);
    console.log("Successfully created user table!")
  }catch(err){
    console.error("Error creating table:", err);
  }
}

// create_user_table()

const check_user_existence = async (email) => {
  try{
    // console.log("Holla")
    const query = `SELECT email FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);

    if (result.rows[0]){
      return true;
    }else{
      return false;
    }

    }catch(err){
    console.log("Authentication is not working: ",err)
  }
}
// check_user_existence("i@y.h").then((res)=>console.log(res));

const add_user = async (firstname,lastname,email,password,verificationToken)=>{
  

  try{

    const existing_user = await check_user_existence(email);

    if (existing_user){
      return 1 ;//  1->"Exisiting User"
    }

    const salt_rounds = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password,salt_rounds);
    

    const query = `
      INSERT INTO users (firstname,lastname,email,password,is_validated,email_verify_token,email_verify_expires)
      VALUES($1,$2,$3,$4,$5,$6,NOW() + INTERVAL '24 hours');
    `
    await pool.query(query,[firstname,lastname,email,hashed_password,false,verificationToken]);
    return 2; //   2->"Added user";
  }catch(err){
    console.log("Failed to add user!:", err);
  }
}
// add_user("z","h","z@y.h","z");

// add_user("Lola","Mela","meta@gmail.com","hola");

const re_verifying = async (email)=>{
  try{
    const query = `
      UPDATE users 
      SET email_verify_expires = NOW() + INTERVAL '24 hours'
      WHERE email = $1;
    `
    await pool.query(query,[email]);


    const query2 = `SELECT email_verify_token,is_validated FROM users WHERE email = $1;`
    const token = await pool.query(query2,[email]);
    // console.log(token.rows[0]);
  //  returns {
    //   email_verify_token: 'b65e8564c508ac59447558acc6a1504fac7d00ff6bd75449bd09bb5b4d9a55c5'
    // }
    return token.rows[0];

  }catch(err){
    console.log(err);
  }
}


const verify_email_query = async (token)=>{
  try{
    const query = `SELECT * FROM users 
                  WHERE email_verify_token = $1 AND email_verify_expires > NOW()`
    let ver_result = await pool.query(query,[token]);

    if(ver_result.rowCount === 0){
      return 1;
    }else{
      const query2 = `UPDATE users
                      SET is_validated = true,
                      email_verify_token = NULL,
                      email_verify_expires = NULL
                      WHERE email_verify_token = $1`
      let verified = await pool.query(query2,[token]);
      return 2; //successfully verified
      
    }

  }catch(err){
    console.log("Failed to verify user email!:", err);
  }
}



const authenticate_user = async (email,password) => {
  try{
    // console.log("Holla")
    const query = `SELECT * FROM users WHERE email = $1`
    let result = await pool.query(query,[email]);
    if (result.rows.length === 0){
      return "User Not Found"
    }
    const user = result.rows[0];
    const matched = await bcrypt.compare(password, user.password);
    // console.log(user.is_validated);

    if (matched && user.is_validated){
      // console.log("Success")
      return "Success";
    }else if(matched && !user.is_validated){
      return "Not Verified";
    }else{
      // console.log("Failed to login")
      return "Failed to login";
    }

  }catch(err){
    console.log("Authentication is not working: ",err)
  }
}

// const res = await authenticate_user("z@y.h","z");
// console.log(res);


const find_user = async (email) => {
  try{
    // console.log("Holla")
    const query = `SELECT id,profile_pictur_url,firstname,lastname,email FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);

    return result.rows[0] || null;

    }catch(err){
    console.log("Authentication is not working: ",err)
  }
}

// find_user("z@y.h").then(user_info=>{
//   console.log(user_info);
// })

const print_users = async ()=>{
  try{
    const users = await pool.query("SELECT * FROM users;");
    console.log(users.rows);
  }catch(err){
    console.error("Error  printing users:", err);
  }
}

// print_users();


const create_watch_history_table = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS watch_history(
                    id SERIAL PRIMARY KEY,
                    user_id INT NOT NULL,
                    movie_id INT NOT NULL,
                    last_position INT DEFAULT 0, -- seconds watched
                    completed BOOLEAN DEFAULT FALSE,
                    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
                  )`;
    await pool.query(query);
    console.log("watch_history table created successfully");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

// create_watch_history_table().then();


const movie_exists_in_watch_history = async (user_id,movie_id)=>{
  try{
    const query = 
    `SELECT * FROM watch_history
    WHERE user_id=$1 AND movie_id=$2`

    let res = await pool.query(query,[user_id,movie_id])
    res = res.rows
    // console.log(res);

    if(res.length > 0){
      return true; //already there
    }
    return false
  }catch(err){
     console.error("Error: ", err);
  }
}

// get_watch_history().then(res=>console.log(res))

const add_to_watch_history = async(user_id,movie_id,last_position,completed,watched_at)=>{
  try{
    let existing = await movie_exists_in_watch_history(user_id,movie_id);
    console.log(existing)

    if(existing){
      return {message:"Already exists in the watch history!"};
    }
    const query = 
    `INSERT INTO watch_history
    (user_id,movie_id,last_position,completed,watched_at)
    VALUES($1,$2,$3,$4,$5)
    `
    const added = await pool.query(query,[user_id,movie_id,last_position,completed,watched_at])
    return added;

  }catch(err){
    console.error("Error: ", err);
  }
}

// add_to_watch_history(23,10,0,false,new Date()).then(added=>console.log(added[0]));



// movie_exists_in_watch_history(10,10).then((exists)=>console.log(exists));

const get_watch_history_1user = async (user_id)=>{
  try{
    const query = `
    SELECT * 
    FROM watch_history 
    INNER JOIN movies on movies.id = watch_history.movie_id
    WHERE watch_history.user_id= $1;
    `

    const result = await pool.query(query,[user_id])
    return result.rows;
  }catch(err){
    console.error("Error: ", err);
  }
}

// get_watch_history_1user(10).then((his)=>console.log(his));




// pool.end();

export {add_movie,return_all_movies,return_shows_movies,get_movies_by_id,authenticate_user,find_user,add_user,verify_email_query, re_verifying,get_watch_history_1user}



// add_movie({
//   title: "American Gangster",
//   year: 2007,
//   release_date: "2007-11-02",
//   genres: ["Crime", "Drama", "Biography"],
//   description:
//     "American Gangster is a 2007 biographical crime film directed by Ridley Scott. It tells the true story of Frank Lucas, a Harlem drug lord who smuggled heroin into the United States on American service planes returning from the Vietnam War, and the detective who pursues him.",
//   poster_url: "https://upload.wikimedia.org/wikipedia/en/9/9f/American_Gangster_poster.jpg",
//   trailer_url: "https://www.youtube.com/watch?v=BV_nssS6Zkg",
//   runtime_minutes: 157,
//   language: "English",
//   country: "United States",
//   director: "Ridley Scott",
//   writers: ["Steven Zaillian"],
//   main_cast: ["Denzel Washington", "Russell Crowe", "Chiwetel Ejiofor"],
//   production_company: "Imagine Entertainment",
//   rating: 7.8,
//   vote_count: 450000,
//   popularity_score: 89.2,
//   content_rating: "R",
//   available_regions: ["US", "UK", "CA", "AU"],
//   subtitles: ["English", "Spanish"],
//   audio_languages: ["English"],
//   file_url: "https://cdn.netclone.com/movies/american_gangster.mp4"
// });


// add_movie({
//   title: "Friday",
//   year: 1995,
//   release_date: "1995-04-26",
//   genres: ["Comedy"],
//   description:
//     "Friday is a 1995 American stoner comedy film directed by F. Gary Gray. It follows Craig and Smokey, two friends in South Central Los Angeles, who spend a Friday dealing with neighborhood drama and debt to a local drug dealer.",
//   poster_url: "https://upload.wikimedia.org/wikipedia/en/7/7b/Fridayposter1995.jpg",
//   trailer_url: "https://www.youtube.com/watch?v=umvFBoLOOgo",
//   runtime_minutes: 91,
//   language: "English",
//   country: "United States",
//   director: "F. Gary Gray",
//   writers: ["Ice Cube", "DJ Pooh"],
//   main_cast: ["Ice Cube", "Chris Tucker", "Nia Long", "John Witherspoon"],
//   production_company: "New Line Cinema",
//   rating: 7.2,
//   vote_count: 150000,
//   popularity_score: 84.7,
//   content_rating: "R",
//   available_regions: ["US", "UK"],
//   subtitles: ["English", "Spanish"],
//   audio_languages: ["English"],
//   file_url: "https://cdn.netclone.com/movies/friday.mp4"
// });




// add_movie({
//   title: "Fight Club",
//   year: 1999,
//   release_date: "1999-10-15",
//   genres: ["Drama", "Thriller", "Psychological"],
//   description:
//     "Fight Club is a 1999 American film directed by David Fincher, based on the novel by Chuck Palahniuk. It follows an insomniac office worker and a soap salesman who form an underground fight club that evolves into something much darker.",
//   poster_url: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
//   trailer_url: "https://www.youtube.com/watch?v=SUXWAEX2jlg",
//   runtime_minutes: 139,
//   language: "English",
//   country: "United States",
//   director: "David Fincher",
//   writers: ["Jim Uhls", "Chuck Palahniuk"],
//   main_cast: ["Edward Norton", "Brad Pitt", "Helena Bonham Carter"],
//   production_company: "20th Century Fox",
//   rating: 8.8,
//   vote_count: 2000000,
//   popularity_score: 97.3,
//   content_rating: "R",
//   available_regions: ["US", "UK", "CA", "AU"],
//   subtitles: ["English", "Spanish", "French"],
//   audio_languages: ["English"],
//   file_url: "https://cdn.netclone.com/movies/fight_club.mp4"
// });




// add_movie("One Piece",1998,"Shounon");
// add_movie("Fight Club",1999,"Action");
// add_movie("Spirit",2002,"Action");
