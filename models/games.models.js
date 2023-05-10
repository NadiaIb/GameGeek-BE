const connection = require("../db/connection");
const fs = require("fs/promises")

exports.selectCategories = () => {
  return connection.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};
