const endpoints = require("../endpoints.json");
const {
  selectCategories,
  selectReviewId,
  selectReviews,
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

