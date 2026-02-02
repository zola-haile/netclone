import express from "express";
import pool from "./db/pool.js"
import cors from "cors";

// import {ver_sender} from "./services/email_services.js";

import dotenv from "dotenv";
dotenv.config();


import MoviesRouter from "./routes/movies.js"


const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // React app
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/movies",MoviesRouter);




app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
