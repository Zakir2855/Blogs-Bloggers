var mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
  {
    article_title: {
      type: String,
      minLength: 10,
      required: [true, "Kindly provide the Post"],
    },
    article_description: {
      type: String,
      minLength: 10,
      
      required: [true, "Kindly Provide the Article Description"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:[true,"Must put userId"]
    },
    comments:[
     
            {
              type: mongoose.Schema.Types.ObjectId, //need to be focused on it is connecting to dufferent model whic is an interface
              ref: "Comment",
            },
          ],
          likes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"
          }],
    
    article_image_url: {
      type: String,
      default: "",
    },
    tags: {
      type: String,
      // required: true,
      default: "lifestyle",
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = { Article };