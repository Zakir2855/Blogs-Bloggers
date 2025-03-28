const { User } = require("../Models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Article } = require("../Models/articleModel");
const { Comment } = require("../Models/commentModels");

// sign up controller
async function createUser(req, resp) {
  console.log(req.file, "image avatar");
  await User.create(req.body)
    .then((res) => {
      console.log(res);
      resp.status(200).json({"message":"User created successfully"});
    })
    .catch((err) => {
      console.log(err);
      resp.status(500).json({ message: "User creation failed", error: err });
    });
}

//avatar upload controller
async function uploadImg(req, response) {
  let userDetails = await User.findById(req.user.id);
  if (!userDetails) {
    return response
      .status(404)
      .json({ message: "can't find user or you are not logged in." });
  }

  userDetails.avatar = req.file.path.replace(/\\/g, "/");

  await userDetails.save();
  response.status(200).json({ Message: "avatar config is in progress" });
}
// login controller
async function loginUser(req, resp) {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    
    if (!user) {
      return resp.status(401).json({ message: "User not found" });
    }

    let isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      return resp.status(402).json({ message: "Password doesn't match" });
    }

    let token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" } 
    );

    console.log("Login success");
    resp
  .status(200)
  .cookie("newlettertoken", token, {
    httpOnly: false, // Allow frontend access
    secure: false, //  Ensure it works on localhost
    sameSite: "Lax", //  Works well across most browsers
  })
  .json({ message: "User logged in successfully", id:user._id });

  } catch (err) {
    console.error("Error in login controller:", err);
    resp.status(500).json({ message: "Internal server error" });
  }
}

// all user info for admin or super admin
function getUsers(req, res) {
  console.log(">>", req.user);
  let limit = Number(req.query.limit);

  User.find()
    .limit(limit)
    .populate("article") //this the property name in User not the article name article name we have given in ref of user schema .populate("user", "name email -_id"); // Include "name" & "email", exclude "_id"
    .then((response) => {
      res.status(200).json({
        Message: "User is Successfully fetched!",
        response: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        Message: "Something went wrong in finding users",
        error: error,
      });
    });
}

//   deleting users by admin or super admin
function deleteUsers(req, res) {
  User.deleteMany()
    .then((response) => {
      res.status(200).json({
        Message: "Users are Successfully deleted!",
        response: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        Message: "Something went wrong in deletion of users",
        error: error,
      });
    });
}

//getting the user by id
async function userById(req, response) {
  try {
    let getUser = await User.findOne({ _id: req.params.id });
    if (getUser) {
      response.status(200).json({ User: getUser });
    } else {
      response.status(402).json({ error: "user not found" });
    }
  } catch (err) {
    response.status(502).json({ error: "internal server error" });
  }
}

//subscribing the whole app
async function subscribeApp(req, resp) {
  try {
    const updateUser = await User.findByIdAndUpdate(req.body.id, {
      isSubscribed: true,
    });
    if (!updateUser) {
      return resp.status(404).json({ Message: "User not found" });
    } else {
      resp.status(202).json({ Message: "Subscribed", data: updateUser });
    }
  } catch (err) {
    resp.status(504).json({ Message: "Internal server error" });
  }
}
//getting all  posts of user by id
async function allPosts(req, response) {
  try {
    User.findById(req.params.id)
      .populate("article", "article")
      .then((res) => response.staus(200).json({ data: res }))
      .catch((err) => {
        res.status(404).json({ error: "can't find user", err: err });
      });
  } catch (err) {
    resp.status(504).json({ Message: "Internal server error" });
  }
}

module.exports = {
  createUser,
  uploadImg,
  loginUser,
  getUsers,
  deleteUsers,
  userById,
  subscribeApp,
  allPosts,
};
