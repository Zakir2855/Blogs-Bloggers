const { Article } = require("../Models/articleModel");
const { Like } = require("../Models/likeModel");

async function likeHandler(req, resp) {
    try {
      let user = req.user;
      let article = await Article.findById(req.params.id);
  
      if (!article) {
        return resp.status(404).json({ message: "Article not found" });
      }
  
      let userIndex = article.likes.findIndex((item) => item== user.id);
      
      if (userIndex !== -1) {
        // remove like
        article.likes.splice(userIndex, 1);
        await article.save();
        return resp.status(200).json({ message: "Like removed" });
      }
  
      // Like
      const like = await Like.create({ article: req.params.id, user: user.id });
      article.likes.push(user.id);
      await article.save();
  
      return resp.status(201).json({ message: "Liked", like });
    } catch (err) {
      console.error(err);
      return resp.status(500).json({ message: "Server error" });
    }
  }
module.exports = { likeHandler };
