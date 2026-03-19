import express from "express";
import cors from "cors";
import db from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Roxiler Backend is running");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("MySQL Connected");
});