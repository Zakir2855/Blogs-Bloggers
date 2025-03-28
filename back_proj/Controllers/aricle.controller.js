const { Article } = require("../Models/articleModel");
const { Comment } = require("../Models/commentModels");
const { User } = require("../Models/userModels");

async function createArticle(req, response) {
  try {
    let post = await Article.create(req.body);
    if (post) {
      let user = await User.findOne({ _id: post.user });
      user.article.push(post._id);
      await user.save();
      response.status(201).json({
        Message: "Article is created Successfully!",
        response: post,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ Message: "Something went wrong!", error: error });
  }
}
// updating the article 
async function updateArticle(req,res){
    try{
 Article.findByIdAndUpdate(req.params.id,req.body).then((result)=>{
  res.status(203).json({"status":"updated","details":result})
 }).catch((err)=>res.status(400).json({"err":err}));

    }
    catch(err){
      res.status(500).json({ Message: "Something went wrong", error: error });

    }
}

// getting the post
function getPosts(req, res) {
   try {Article.find().sort("createdAt")
      .populate({ path: "comments" }).populate({path:"user",select:"first_name last_name"})//nested pupulation:=>
      // .populate({
      //   path: "user",
      //   select: "name email",
      //   populate: { path: "profile", select: "bio avatar" }
      // });
      .then((response) => {
        res.status(200).json({
          Message: "Posts are Successfully fetched!",
          response: response,
        });
      })
      .catch((error) => {
        res.status(500).json({ Message: "Something went wrong", error: error });
      });}
      catch(err){
        res.status(500).json({ Message: "Internal server error", error: error });

      }
  }

  //deleting self posts
async function deletePostById(req, response) {
  try {
    let { id } = req.user;
    
    // Finding user
    const user = await User.findOne({ _id: id });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // Finding the article index in user's article list
    const articleIndex = user.article.findIndex((item) => item._id == req.params.id);
    
    if (articleIndex === -1) {
      return response.status(404).json({ error: "Couldn't find post or user" });
    }

    // Remove the article reference from the user
    user.article.splice(articleIndex, 1);
    await user.save();

    // Deleting comments
    await Comment.deleteMany({ article: req.params.id }).catch(() => {
      console.log("Error in deleting comments of the article");
    });

    // Delete the article 
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return response.status(405).json({ message: "Can't find post" });
    }

    return response.status(202).json({ message: "Article deleted successfully" });

  } catch (err) {
    console.error("Error:", err);
    return response.status(500).json({ message: "Internal server error", error: err });
  }
}

  
  module.exports = { createArticle, getPosts,updateArticle,deletePostById };