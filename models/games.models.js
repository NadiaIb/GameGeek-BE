const connection = require("../db/connection");
const fs = require("fs/promises")

exports.selectCategories = () => {
  return connection.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.selectReviewId = (review_id) => {
  return connection
    .query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    .then((result) => {
      if (result.rows.length === 0){
        return Promise.reject({ status:404, msg: "not found"})
      }
      return result.rows[0]
    });
};
