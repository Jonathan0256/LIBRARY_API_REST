import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/routes.js";
import { logRequest } from "./middleware/logger.js";
import config from "./config.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use((req, res, next) => logRequest(req, res, next));

app.use("/api/v1", userRoutes);

app.listen(config.server.port, () => {
  console.log(`Servidor funcionant en http://localhost:${config.server.port}`);
});
