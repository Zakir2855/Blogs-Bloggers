let express=require("express");
const { createComment, getComments } = require("../Controllers/comment.controller");
let commentsRoute=express.Router();
commentsRoute.post("/createComment",createComment);
commentsRoute.get("/getComments/:id",getComments);
module.exports={commentsRoute}