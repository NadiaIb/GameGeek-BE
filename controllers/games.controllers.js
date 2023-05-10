const { selectCategories,
} = require("../models/games.models");
const endpoints= require('../endpoints.json')

exports.getEndpoints = (req, res) => {
    res.status(200).send({ endpoints: endpoints });
  };

exports.getCategories = (req, res, next) => {
  selectCategories().then((category) => {
    res.status(200).send({ category: category });
  });
};
