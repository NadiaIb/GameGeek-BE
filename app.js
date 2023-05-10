const express = require("express");
const app = express();
const {
  getCategories,
  getEndpoints
} = require("./controllers/games.controllers");

app.get("/api", getEndpoints)

app.get("/api/categories", getCategories);

module.exports = app;

