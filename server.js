import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const object = { username: "user", password: "password" };

if (!SECRET_KEY) {
  console.error("La variable d'entorn no esta definida");
  process.exit(1);
}

app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
});
app.listen(PORT, () => {
  console.log(`Servidor funcionant en http://localhost:${PORT}`);
});
