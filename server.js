import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/routes.js";
dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/api/v1/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor funcionant en http://localhost:${PORT}`);
});
