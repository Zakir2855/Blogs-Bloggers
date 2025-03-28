const {
  createArticle,
  getPosts,
  updateArticle,
  deletePostById,
} = require("../Controllers/aricle.controller");

let express = require("express");
const { isLoggedIn } = require("../Middlewares/isloggedin.middleware");
let articleRoutes = express.Router();
articleRoutes.post("/createArticle", createArticle);
articleRoutes.put("/updateArticle/:id", updateArticle);
articleRoutes.get("/getPosts", getPosts);
//to delete the post of self by post id
articleRoutes.delete("/deleteArticle/:id", isLoggedIn, deletePostById);
module.exports = { articleRoutes };
