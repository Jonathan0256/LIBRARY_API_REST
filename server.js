import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/routes.js";
import { authenticateToken } from "./middleware/auth.js";
dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/api/v1/auth", userRoutes);
app.listen(PORT, () => {
  console.log(`Servidor funcionant en http://localhost:${PORT}`);
});
