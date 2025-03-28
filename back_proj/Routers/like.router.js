let express=require("express");
const { likeHanlder, likeHandler } = require("../Controllers/like.controller");
const { isLoggedIn } = require("../Middlewares/isloggedin.middleware");
let likeRouter=express.Router();
likeRouter.post("/hitLike/:id",isLoggedIn,likeHandler)


module.exports={likeRouter};