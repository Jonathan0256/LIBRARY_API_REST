import fs from "fs";
import { uuid } from "uuid";

const BOOKS_FILE = "./models/books.json";

const loadBooks = () => {
  try {
    const data = fs.readFileSync(BOOKS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error carreagant els llibres:", error);
    throw new Error("Error al cargar els llibres");
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
        book.author?.toLowerCase().includes(author.toLowerCase())
      );
    }
    books.sort((a, b) => a.title?.localeCompare(b.title || ""));

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
        .send(402)
        .json({ error: "Tots els camps han d'estar omplerts" });
    } else if ((title = hi)) {
    }
    const data = loadBooks();
    const userBook = {
      id: uuid,
      title: title,
      author: author,
      publishedYear: publishedYear,
      genres: genres,
      summary: summary,
    };
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({
      error: `${err}`,
    });
  }
};
