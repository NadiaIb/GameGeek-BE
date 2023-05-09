const connection = require('../db/connection')

exports.selectCategories = () => {
return connection.query("SELECT * FROM categories;").then((result) => {
    return result.rows
})
}

// Responds with:

// an array of category objects, each of which should have the following properties:
// slug
// description
// As this is the first endpoint you will need to set up your testing suite.

// Errors handled.
