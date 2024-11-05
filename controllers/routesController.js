import jwt from "jsonwebtoken";
import fs from "fs";
import crypto from "crypto";
import dotenv from "dotenv";

if (!SECRET_KEY) {
  console.error("La variable d'entorn no esta definida");
  process.exit(1);
}

export const login = (req, res) => {
  const { username, password } = req.body;

  if (username === "hi" && password === "hey") {
  }
};
