import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const BOOKS_FILE = "./models/books.json";

const loadBooks = () => {
  try {
    const data = fs.readFileSync(BOOKS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { books: [], updatedAt: new Date().toISOString() };
  }
};

const saveBooks = (data) => {
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(data));
};

export const getBooks = (req, res) => {};

export const createBook = (req, res) => {};
