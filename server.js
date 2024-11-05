import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

dotenv.config();
const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET_KEY;

app.use(express.json());

app.post("/login", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Servidor funcionant en http://localhost:${PORT}`);
});
