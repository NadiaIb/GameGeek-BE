const express = require("express");
const app = express();
const {
  getCategories,
} = require("./controllers/games.controllers");

app.get("/api/categories", getCategories);

module.exports = app;

