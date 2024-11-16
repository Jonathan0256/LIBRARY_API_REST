import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const BOOKS_FILE = "./models/books.json";

const loadBooks = () => {
  try {
    const data = fs.readFileSync(BOOKS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error carregant els llibres:", error);
    throw new Error("Error al carregar els llibres");
  }
};

const saveBooks = (data) => {
  try {
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(BOOKS_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error guardant els llibres:", error);
    throw new Error("Error al guardar els llibres");
  }
};

export const getBooks = (req, res) => {
  try {
    const data = loadBooks();

    if (!data || !data.books) {
      console.log("No s'ha trobat cap dada");
      return res.status(404).json({
        error: "No s'han trobat llibres",
        data: null,
      });
    }

    let books = data.books;
    const { author } = req.query;
    if (author) {
      books = books.filter((book) =>
        book.details.author?.toLowerCase().includes(author.toLowerCase())
      );
    }
    books.sort((a, b) => a.details.title?.localeCompare(b.details.title || ""));

    return res.status(200).json({
      books,
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      error: "Error al obtenir els llibres",
      details: error.message,
    });
  }
};

export const addBooks = (req, res) => {
  try {
    const { title, author, publishedYear, genres, summary } = req.body;

    if (!title || !author || !publishedYear || !genres || !summary) {
      return res
        .status(402)
        .json({ error: "Tots els camps han d'estar omplerts" });
    } else if (
      typeof title !== "string" ||
      typeof author !== "string" ||
      typeof summary !== "string" ||
      !Number.isInteger(publishedYear)
    ) {
      return res.status(401).json({
        error: "L'any de publicació ha de ser un enter, la resta string",
      });
    }

    const data = loadBooks();
    const newBook = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      details: {
        title,
        author,
        publishedYear,
        genres,
        summary,
      },
    };
    data.books.push(newBook);
    saveBooks(data);
    return res.status(201).json({ message: "Llibre afegit correctament" });
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({
      error: `${err}`,
    });
  }
};

export const updateBook = (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedYear, genres, summary } = req.body;

    if (!title || !author || !publishedYear || !genres || !summary) {
      return res
        .status(400)
        .json({ error: "Tots els camps han d'estar omplerts" });
    }

    const data = loadBooks();
    const bookIndex = data.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ error: "Llibre no trobat" });
    }

    data.books[bookIndex] = {
      ...data.books[bookIndex],
      updatedAt: new Date().toISOString(),
      details: {
        title,
        author,
        publishedYear,
        genres,
        summary,
      },
    };

    saveBooks(data);
    return res.status(200).json({ message: "Llibre actualitzat correctament" });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      error: "Error al actualitzar el llibre",
      details: error.message,
    });
  }
};

export const deleteBook = (req, res) => {
  try {
    const { id } = req.params;
    const data = loadBooks();
    const bookIndex = data.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ error: "Llibre no trobat" });
    }

    data.books.splice(bookIndex, 1);
    saveBooks(data);
    return res.status(200).json({ message: "Llibre eliminat correctament" });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      error: "Error al eliminar el llibre",
      details: error.message,
    });
  }
};
