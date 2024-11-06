import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

app.get("/login", (req, res) => {
  res.send("hey");
});

app.listen(PORT, () => {
  console.log(`Servidor funcionant en http://localhost:${PORT}`);
});
