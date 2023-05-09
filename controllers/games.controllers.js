const { selectCategories } = require("../models/games.models");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((category) => {
      res.status(200).send({ category: category });
    })
    .catch((err) => {
      next(err);
    });
};
