import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const BOOKSTORES_FILE = "./models/bookstores.json";

const loadBookstores = () => {
  try {
    const data = fs.readFileSync(BOOKSTORES_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bookstores: [],
    };
  }
};

const saveBookstores = (data) => {
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(BOOKSTORES_FILE, JSON.stringify(data, null, 2));
};

export const getBookstores = (req, res) => {
  try {
    const data = loadBookstores();
    res.json(data.bookstores);
  } catch (error) {
    res.status(500).json({ error: "Error en obtenir les llibreríes" });
  }
};

export const addBookstore = (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res
        .status(400)
        .json({ error: "El nom i la direcció son obligatoris" });
    }

    const data = loadBookstores();
    const newBookstore = {
      id: uuidv4(),
      name,
      address,
      inventory: [],
    };

    data.bookstores.push(newBookstore);
    saveBookstores(data);

    res.status(201).json(newBookstore);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la llibrería" });
  }
};

export const updateInventory = (req, res) => {
  try {
    const { bookstoreId } = req.params;
    const { bookId, quantity } = req.body;

    if (!bookId || quantity === undefined) {
      return res
        .status(400)
        .json({ error: "L'ID i la quantitat són obligatoris" });
    }

    const data = loadBookstores();
    const bookstore = data.bookstores.find((b) => b.id === bookstoreId);

    if (!bookstore) {
      return res.status(404).json({ error: "No s'ha trobat cap llibrería" });
    }

    const inventoryItem = bookstore.inventory.find(
      (item) => item.bookId === bookId
    );
    if (inventoryItem) {
      inventoryItem.quantity = quantity;
    } else {
      bookstore.inventory.push({ bookId, quantity });
    }

    saveBookstores(data);
    res.json(bookstore);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar l'inventari" });
  }
};

export const deleteBookstore = (req, res) => {
  try {
    const { id } = req.params;
    const data = loadBookstores();
    const bookstoreIndex = data.bookstores.findIndex(
      (bookstore) => bookstore.id === id
    );

    if (bookstoreIndex === -1) {
      return res.status(404).json({ error: "No s'ha trobat cap llibrería" });
    }

    data.bookstores.splice(bookstoreIndex, 1);
    saveBookstores(data);

    res.status(200).json({ message: "Llibrería eliminada correctament" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la llibrería" });
  }
};
