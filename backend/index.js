import express from "express";
import pool from "./db.js"

const app = express();
app.use(express.json());

// Test route
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.send(result.rows[0]);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
