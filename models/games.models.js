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

// exports.checkAvailableCategories = (queryCat) => {
//   return selectCategories().then((categories) => {
//     availableCategories = categories.map((category) => category.slug);
//     if (queryCat && !availableCategories.includes(queryCat)) {
//       return promiseRejection(404, "Category does not exist");
//     }
//     return queryCat;
//   });
// };
// exports.selectReviews = (category, sort_by = "created_at", order = "desc") => {
//   const queryParams = [];
//   let queryString = `
//     SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category,
//     reviews.review_img_url, reviews.created_at, reviews.votes, 
//     reviews.designer, COUNT(comments.comment_id) AS comment_count
//     FROM reviews
//     LEFT JOIN comments
//     ON reviews.review_id = comments.review_id`;
//   if (category) {
//     queryString += `
//     WHERE reviews.category = $1`;
//     queryParams.push(category);
//   }
//   queryString += `
//     GROUP BY reviews.review_id
//     ORDER BY reviews.%s `;
//   queryString += `%s`;
//   const sql = format(queryString, sort_by, order);
//   return db.query(sql, queryParams).then((reviews) => {
//     return checkForContent(reviews, "No reviews for this category");
//   });
// };

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
  return exports
    .selectReviewId(review_id)
    .then((review) => {
      return connection.query(
        `SELECT comments.* FROM comments WHERE review_id = $1 ORDER BY created_at DESC;`,
        [review_id]
      );
    })
    .then((result) => {
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
      }
      if (body === "") {
        return Promise.reject({ status: 404, msg: "Missing comment" });
      } else {
        return result.rows[0];
      }
    });
};

exports.updateVotes = (review_id, inc_votes) => {
  return exports.selectReviewId(review_id)
  .then((review) => {
      return connection.query(
        `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
        [inc_votes, review_id]
      );
    })
    .then((result) => {
      if (!result.rows[0]) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return result.rows[0];
    });
};

exports.removeComment= (comment_id) =>{
  return connection
  .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [comment_id]
    )
    .then((result) => {
      if (result.rows.length === 0){
        return Promise.reject({status:404, msg: "not found"})
      }
      return {};
    });
  }

exports.selectUsers = () => {
  return connection
  .query(`SELECT * FROM users`)
  .then((result)=>{
    return result.rows
  })
}