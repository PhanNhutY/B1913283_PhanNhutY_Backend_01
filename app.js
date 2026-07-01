const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.routes");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "welcome to contact book application" });
});

app.use("/api/contacts", contactsRouter);

// Middleware xử lý 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
