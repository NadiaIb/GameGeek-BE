const endpoints = require("../endpoints.json");
const {
  selectCategories,
  selectReviewId,
  selectReviews,
  selectComments,
  createComment,
  updateVotes,
  removeComment,
  selectUsers,
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
  let { category, sort_by, order } = req.query;
  const validQueries = ["category", "order", "sort_by"];
  const queryKeys = Object.keys(req.query);
  // console.log(queryKeys)
  if (queryKeys.length !== 0) {
    if (!validQueries.includes(queryKeys[0])) {
      return res.status(400).send({ msg: "Invalid query" });
    }
  }
  selectReviews(category, sort_by, order)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};


// exports.getReviews = (req, res, next) => {
//   let { category, sort_by, order } = req.query;
//   checkAvailableCategories(category)
//     .then((category) => {
//       selectReviews(category, sort_by, order)
//         .then((reviews) => res.status(200).send({ reviews }))
//         .catch((err) => next(err));
//     })
//     .catch((err) => next(err));
// };


exports.getComments = (req, res, next) => {
  const review_id = req.params.review_id;
  selectComments(review_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const username = req.body.username;
  const body = req.body.body;
  const { review_id } = req.params;
  createComment(username, body, review_id)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchVotes = (req, res, next) => {
  const review_id = req.params.review_id;
  const inc_votes = req.body.inc_votes;
  updateVotes(review_id, inc_votes)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then((comment) => {
      res.status(204).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
};
