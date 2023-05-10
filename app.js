const express = require("express");
const app = express();
const {
  getCategories,
  getReviewId,
} = require("./controllers/games.controllers");

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewId);

// app.all("*", (req, res) => {
//   res.status(404).send({ msg: "Invalid Endpoint" });
// });
module.exports = app;
