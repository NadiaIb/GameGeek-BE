const connection = require("../db/connection");

exports.selectCategories = () => {
  return connection.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.selectReviewId = (review_id) => {
  return connection
    .query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    .then((result) => {
      return result.rows[0];
    });
};
