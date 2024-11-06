import fs from "fs";

export const logRequest = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req?.method || "UNKNOWN";
  const url = req?.url || "UNKNOWN";
  const logEntry = `${timestamp} - ${method} ${url}\n`;

  fs.appendFile("api.log", logEntry, (err) => {
    if (err) {
      console.error("Error escribint al fitxer de logins", err);
    }
  });
  next();
};
