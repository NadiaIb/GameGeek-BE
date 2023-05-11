const { selectCategories, selectReviewId } = require("../models/games.models");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((category) => {
      res.status(200).send({ category: category });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewId  = (req, res, next) => {
  const review_id = req.params.review_id
  selectReviewId(review_id)
  .then((review)=>{
    res.status(200).send({ review: review})
  })
  .catch((err)=>{
    next(err)
  })
}