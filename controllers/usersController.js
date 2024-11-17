import jwt from "jsonwebtoken";
import fs from "fs";
import crypto from "crypto";
import config from "../config.js";

const SECRET_KEY = config.server.env;

//Functions
const saveUsers = (file, users) => {
  fs.writeFileSync(file, JSON.stringify(users));
};

const loadUsers = (file) => {
  if (fs.existsSync(file)) {
    try {
      const fileContent = fs.readFileSync(file, "utf8");
      const parsedFile = JSON.parse(fileContent);
      return Array.isArray(parsedFile) ? parsedFile : [];
    } catch (error) {
      console.error("Error al carregar els usuaris: ", error);
      return [];
    }
  }
  return [];
};

if (!SECRET_KEY) {
  console.error("La variable d'entorn no esta definida");
  process.exit(1);
}

//Apartat register
export const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Usuari i contraseña son obligatoris" });
  }

  const usersFile = "./models/users.json";
  const users = loadUsers(usersFile);

  if (!Array.isArray(users)) {
    console.error("Users no es un array:", users);
    return res.status(500).json({ error: "Error intern del servidor" });
  }

  const existingUser = users.find((c) => c.username === username);

  if (existingUser) {
    return res.status(409).json({ error: "L'usuari ja existeix" });
  }

  const passwordEncryption = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const newUser = { username, password: passwordEncryption };

  users.push(newUser);

  saveUsers(usersFile, users);

  res.status(201).json({ message: "Usuari registrart correctament" });
};

//Apartat login

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username i password son obligatoris" });
  }

  const usersFile = "./models/users.json";
  const users = loadUsers(usersFile);

  const user = users.find((c) => c.username === username);

  if (!user) {
    return res.status(401).json({ error: "Credencials incorrectes" });
  }

  const passwordEncryption = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  if (user.password !== passwordEncryption) {
    return res.status(401).json({ error: "Credencials incorrectes" });
  }
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "30m" });

  res.json({ token });
};
