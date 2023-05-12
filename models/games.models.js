const connection = require("../db/connection");
const fs = require("fs/promises");

exports.selectCategories = () => {
  return connection.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.selectReviewId = (review_id) => {
  return connection
    .query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return result.rows[0];
    });
};

exports.selectReviews = (sort_by = "created_at DESC") => {
  return connection
  .query(`
  SELECT reviews.*, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY ${sort_by};
  `)
  .then((result) => {
    const outputs = result.rows;
    outputs.forEach((output) => {
      delete output.review_body;
      output.comment_count = parseInt(output.comment_count);
    });
    return outputs;
  });
}; 
