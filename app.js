const express = require("express");
const cors = require('cors');
const app = express();
const {
  getCategories,
  getEndpoints,
  getReviewId,
  getReviews,
  getComments,
  postComment,
  patchVotes,
  deleteComment,
  getUsers
} = require("./controllers/games.controllers");

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewId);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id/comments", getComments);

app.post("/api/reviews/:review_id/comments", postComment);

app.patch("/api/reviews/:review_id", patchVotes);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers)

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

//PSQL err
app.use((err, request, response, next) => {
  if (err.code === "23503") {
    response.status(404).send({ msg: "not found" });
  } else if (err.code === "23502") {
    response.status(404).send({ msg: "Invalid properties" });
  } else if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad Request" });
  }else {
    next(err);
  }
});

app.use((err, req, res) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
