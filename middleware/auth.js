import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .sendStatus(401)
      .json({ error: "No s'ha proporcionat cap token" });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) res.sendStatus(403).json({ error: "Token invàlid" });
    req.user = user;
    next();
  });
};
