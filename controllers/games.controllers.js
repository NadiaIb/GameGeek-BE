const endpoints = require("../endpoints.json");
const {
  selectCategories,
  selectReviewId,
  selectReviews,
  selectComments,
  createComment
} = require("../models/games.models");

exports.getEndpoints = (req, res) => {
  res.status(200).send({ endpoints: endpoints });
};

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((category) => {
      res.status(200).send({ category: category });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewId = (req, res, next) => {
  const review_id = req.params.review_id;
  selectReviewId(review_id)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  selectReviews()
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  const review_id = req.params.review_id;
  selectComments(review_id)
  .then((comments) => {
    res.status(200).send({ comments: comments });
  })
  .catch((err) => {
    next(err)
  })
};

exports.postComment = (req, res, next) => {
  const username = req.body.username 
  const body = req.body.body
  const {review_id} = req.params;
  createComment(username, body, review_id)
  .then((comment) => {
    res.status(201).send({ comment: comment });
  })
  .catch((err) => {
    next(err)
  })
};