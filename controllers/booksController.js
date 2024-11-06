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

export const getBooks = (req, res) => {
  try {
    const { author } = req.query;
    const data = loadBooks();

    let books = data.books;

    if (author) {
      books = books.filter((book) =>
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }
    books.sort((a, b) => a.title.localeCompare(b.title));

    res.json(books);
  } catch (err) {
    res
      .sendStatus(500)
      .json({ error: "Error al intentar obtenir els llibres" });
  }
};

export const createBook = (req, res) => {};
