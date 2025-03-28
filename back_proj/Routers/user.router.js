const express = require("express");
let userRoutes = express.Router();
let jwt=require("jsonwebtoken");
let bcrypt=require("bcrypt");
let { User } = require("../Models/userModels.js");
const { createUser, loginUser, getUsers ,deleteUsers, userById, subscribeApp, allPosts, deletePostById, uploadImg} = require("../Controllers/user.controller.js");
const { isLoggedIn } = require("../Middlewares/isloggedin.middleware.js");
const { authorizeRole } = require("../Middlewares/roleAuth.js");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })

//route for sign up and controller
userRoutes.post("/createUser",createUser );
userRoutes.post("/uploadAvatar",isLoggedIn,upload.single('avatar'),uploadImg)

//creating route for login and controller
userRoutes.post("/login", loginUser);
//get users by admin 
userRoutes.get("/getUsers",isLoggedIn,authorizeRole("ADMIN","QA-TESTER"),getUsers) //here in authorize role we are passing desired arguments this function is wrapper for middleware as midlleware can only have three args(req,res,next) and u can see we have called wrapper so now middleware is the returned function

//deletion of users by admin
userRoutes.delete(
    "/deleteUsers",
    isLoggedIn,
    authorizeRole("ADMIN"),
    deleteUsers
  );
  //getting user by id 
  userRoutes.get("/getUser/byId/:id",userById);
  //to subscribe the whole app by user using patch update
  userRoutes.put("/subscribe",subscribeApp);
  //to get all posts of a user by id 
  userRoutes.get("/allPosts/:id",allPosts);
  

module.exports = { userRoutes };//handler of this route
