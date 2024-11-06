import express from "express";
import { register, login } from "../controllers/usersController.js";
import { getBooks } from "../controllers/booksController.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

//User register && login
router.post("/register", register);
router.post("/login", login);

//Books

router.get("/books", getBooks);
export default router;
