import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const { Pool } = pkg;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});


//movies table
const create_movies_table = async ()=>{
  try{
    const query = `
      CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        year INT NOT NULL,
        genre VARCHAR(100)
      );
    `
    await pool.query(query);
    console.log("Movies table created successfully");
  }catch (err) {
    console.error("Error creating table:", err);
  } 
}



// create_movies_table();

const add_movie = async (title,year,genre)=>{
  try{
    const query = `
      INSERT INTO movies(title,year,genre)
        VALUES ($1,$2,$3);
    `
    await pool.query(query,[title,year,genre]);
    console.log("Added successfully");
  }catch (err) {
    console.error("Error adding movie:", err);
  } 

}
// add_movie("One Piece",1998,"Shounon");
// add_movie("Fight Club",1999,"Action");
add_movie("Spirit",2002,"Action");


const print_movies = async ()=>{
  try{
    const movies = await pool.query("SELECT * FROM movies;");
    console.log(movies.rows);
  }catch(err){
    console.error("Error adding movie:", err);
  }
}

// print_movies();

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


//user table:

const create_user_table = async ()=>{
  try{
    const query =`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `
    await pool.query(query);
    console.log("Successfully created user table!")
  }catch(err){
    console.error("Error creating table:", err);
  }
}

// create_user_table()

const add_user = async (firstname,lastname,email,password)=>{
  const salt_rounds = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password,salt_rounds);

  try{
    const query = `
      INSERT INTO users (firstname,lastname,email,password)
      VALUES($1,$2,$3,$4);
    `
    await pool.query(query,[firstname,lastname,email,hashed_password]);
    console.log("Success!")
  }catch(err){
    console.log("Failed to add user!:", err);
  }
}
// add_user("Yoka","Worako","yworako@gmail.com","suckdeeznuts");

// add_user("Lola","Mela","meta@gmail.com","hola");

const authenticate_user = async (email,password) => {
  try{
    // console.log("Holla")
    const query = `SELECT * FROM users WHERE email = $1`
    let result = await pool.query(query,[email]);
    if (result.rows.length === 0){
      return "User Not Found"
    }
    const user= result.rows[0];
    const matched = await bcrypt.compare(password, user.password);

    if (matched){
      console.log("Success")
      return "Success";
    }else{
      console.log("Failed to login")
      return "Invalid password!"
    }

  }catch(err){
    console.log("Authentication is not working: ",err)
  }
}

// authenticate_user("yworako@gmail.com","suckdeeznuts")


const print_users = async ()=>{
  try{
    const users = await pool.query("SELECT * FROM users;");
    console.log(users.rows);
  }catch(err){
    console.error("Error  printing users:", err);
  }
}

// print_users();




// pool.end();
export default pool;