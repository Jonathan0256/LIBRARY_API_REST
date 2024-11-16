import sanitizeHtml from "sanitize-html";

export const sanitizeData = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        let cleanValue = sanitizeHtml(req.body[key], {
          allowedTags: [],
          allowedAttributes: {},
        });
        cleanValue = cleanValue
          .trim()
          .replace(/\s+/g, " ")
          .replace(/\s+,/g, ",")
          .replace(/\s+\./g, ".")
          .replace(/\s+:/g, ":");

        req.body[key] = cleanValue;
      }
    });
  }
  next();
};
