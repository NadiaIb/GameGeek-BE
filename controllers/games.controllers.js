const {selectCategories} = require('../models/games.models')

exports.getCategories = (req, res) => {
  selectCategories().then((category) => {
    res.status(200).send({ category: category });
  });
};



