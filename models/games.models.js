const { response } = require("../app");
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

exports.selectReviews = () => {
  return connection
    .query(
      `
  SELECT reviews.*, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY created_at DESC;
  `
    )
    .then((result) => {
      const outputs = result.rows;
      outputs.forEach((output) => {
        delete output.review_body;
        output.comment_count = parseInt(output.comment_count);
      });
      return outputs;
    });
};

exports.selectComments = (review_id) => {
  return connection
    .query(
      `
  SELECT comments.* FROM comments WHERE review_id = $1 ORDER BY created_at DESC;
  `,
      [review_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return result.rows;
    });
};

exports.createComment = (author, body, review_id) => {
  return connection
    .query(
      `
    INSERT INTO comments (author, body, review_id)
    VALUES ($1,$2,$3) 
    RETURNING *;`,
      [author, body, review_id]
    )
    .then((result) => {
      if (!result.rows[0]) {
        return Promise.reject({ status: 404, msg: "not found" });
        } if (body === "") {
          return Promise.reject({ status: 404, msg: "Missing comment" })
      } else {
        return result.rows[0];
      }
    });
};

exports.removeComment= (comment_id) =>{
  return connection
  .query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]
    )
    .then((result) => {
      console.log(result.rows)
      return null;
    });
  }
