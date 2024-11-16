import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const SALES_FILE = "./models/sales.json";

const loadSales = () => {
  try {
    const data = fs.readFileSync(SALES_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error carregant les vendes:", error);
    throw new Error("Error al carregar les vendes");
  }
};

const saveSales = (data) => {
  try {
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(SALES_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error guardant les vendes:", error);
    throw new Error("Error al guardar les vendes");
  }
};

export const getSales = (req, res) => {
  try {
    const sales = loadSales();
    res.json(sales.sales);
  } catch (error) {
    res.status(500).json({ error: "Error al obtenir les vendes" });
  }
};

export const addBookSales = (req, res) => {
  try {
    const { bookstoreId, books, totalPrice, discountPercentage = 0 } = req.body;

    if (!bookstoreId || !books || !totalPrice) {
      return res.status(400).json({
        error: "Cal especificar bookstoreId, books i totalPrice",
      });
    }

    if (!Array.isArray(books) || books.length === 0) {
      return res.status(400).json({
        error: "Cal especificar almenys un llibre",
      });
    }

    const sales = loadSales();
    const newSale = {
      id: uuidv4(),
      bookstoreId,
      saleDate: new Date().toISOString(),
      books,
      totalPrice: parseFloat(totalPrice),
      discountPercentage: parseFloat(discountPercentage),
    };

    sales.sales.push(newSale);
    saveSales(sales);

    res.status(201).json({
      message: "Venda registrada correctament",
      sale: newSale,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Error al registrar la venda",
      details: error.message,
    });
  }
};

export const getBookSalesCount = (req, res) => {
  try {
    const { bookId } = req.params;
    const sales = loadSales();

    let totalSold = 0;
    sales.sales.forEach((sale) => {
      const bookSale = sale.books.find((book) => book.bookId === bookId);
      if (bookSale) {
        totalSold += bookSale.quantity;
      }
    });

    res.json({
      bookId,
      totalExemplars: totalSold,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtenir el total d'exemplars venuts" });
  }
};
