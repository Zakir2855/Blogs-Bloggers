const { Article } = require("../Models/articleModel");
const { Comment } = require("../Models/commentModels");

async function createComment(req, res) {
  try {
    //to check the article ID is provided
    if (!req.body.article) {
      return res.status(400).json({ Message: "Article ID is required" });
    }

    const comment = await Comment.create(req.body);

    if (comment) {
      let post = await Article.findById(comment.article);

      // to check the article exists before pushing the comment
      if (post) {
        post.comments.push(comment._id);
        await post.save();
      } else {
        console.log("Article not found for the given ID:", comment.article);
      }

      return res.status(201).json({
        Message: "Comment is created Successfully!",
        response: comment,
      });
    } else {
      return res.status(500).json({ Message: "Failed to create comment" });
    }
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ Message: "Something went wrong!", error: error.message });
  }
}

async function getComments(req, res) {
  try {
    const Comments = await Comment.find({ article: req.params.id }).populate({path:"user",select:"first_name last_name"});
    console.log(Comments);
    if (!Comments) {
      return res
        .status(200)
        .json({ Message: "No Comments", data: "No comments yet" });
    }
    return res.status(200).json({ Message: "comments", data: Comments });
  } catch (err) {
    console.log(err, "comments fetching error");
    return res.status(500).json({ Message: "Interanl server error" });
  }
}

module.exports = { createComment, getComments };
