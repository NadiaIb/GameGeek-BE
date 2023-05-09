const express = require("express");
const app = express();
const {
  getCategories,
  getReviews,
} = require("./controllers/games.controllers");

app.get("/api", (req, res)=>{
    fs.readFile("/endpoints.json", "utf8", function (err, data){
        if (err) throw err;   console.log(data); 
    })
})

app.get("/api/categories", getCategories);

module.exports = app;

