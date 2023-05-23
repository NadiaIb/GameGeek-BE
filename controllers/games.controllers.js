const endpoints = require("../endpoints.json");
const {
  selectCategories,
  selectReviewId,
  selectReviews,
  selectComments,
  createComment,
  removeComment
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

exports.deleteComment = (req,res, next) => {
  const {comment_id} = req.params;
  removeComment(comment_id)
  .then((comment)=>{
    res.status(204).send({})
  })
  .catch((err)=>{
    // console.log(err)
    next(err)
  })
}


// DELETE /api/comments/:comment_id
// Should:

// delete the given comment by comment_id
// Responds with:

// status 204 and no content