import pkg from "pg";
import dotenv from "dotenv";

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

const create_movies_table = async ()=>{
  try{
    const query = `
      CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
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

const print_movies = async ()=>{
  try{
    const movies = await pool.query("SELECT * FROM movies;");
    console.log(movies.rows);
  }catch(err){
    console.error("Error adding movie:", err);
  }
}

print_movies();


export default pool;