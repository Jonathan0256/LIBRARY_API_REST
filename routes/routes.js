import express from "express";
import { register, login } from "../controllers/usersController.js";
import { getBooks, addBooks } from "../controllers/booksController.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

//User register && login
router.post("/register", register);
router.post("/login", login);

//Books

router.get("/books", authenticateToken, getBooks);
router.post("/books", authenticateToken, addBooks);
export default router;
