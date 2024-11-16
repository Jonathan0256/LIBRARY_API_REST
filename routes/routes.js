import express from "express";
import { sanitizeData } from "../middleware/sanitize.js";
import { register, login } from "../controllers/usersController.js";
import {
  getBooks,
  addBooks,
  updateBook,
  deleteBook,
} from "../controllers/booksController.js";
import { authenticateToken } from "../middleware/auth.js";
import {
  addBookstore,
  getBookstores,
  updateInventory,
  deleteBookstore,
} from "../controllers/bookstoresController.js";
import {
  getSales,
  addBookSales,
  getBookSalesCount,
} from "../controllers/salesController.js";

const router = express.Router();

router.use(sanitizeData);

//User register && login
router.post("/register", register);
router.post("/login", login);

//Books
router.get("/books", authenticateToken, getBooks);
router.post("/books", authenticateToken, addBooks);
router.put("/books/:id", authenticateToken, updateBook);
router.delete("/books/:id", authenticateToken, deleteBook);

//Bookstores
router.get("/bookstores", authenticateToken, getBookstores);
router.post("/bookstores", authenticateToken, addBookstore);
router.put(
  "/bookstores/:bookstoreId/inventory",
  authenticateToken,
  updateInventory
);
router.delete("/bookstores/:id", authenticateToken, deleteBookstore);

// Sales
router.get("/sales", authenticateToken, getSales);
router.post("/sales", authenticateToken, addBookSales);

router.get("/books/:bookId/sales", authenticateToken, getBookSalesCount);

export default router;
