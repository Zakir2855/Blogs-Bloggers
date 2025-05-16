const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const { userRoutes } = require("./Routers/user.router");
const { Connect } = require("./Configurations/db");

const cookieParser = require("cookie-parser");
const { articleRoutes } = require("./Routers/article.router");
const { commentsRoute } = require("./Routers/comments.router");
const { cloudinaryConfig } = require("./Configurations/cloudinary");
const { likeRouter } = require("./Routers/like.router");
const { isLoggedIn } = require("./Middlewares/isloggedin.middleware");
const { limiter } = require("./Middlewares/rateLimiter");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true, //this allows client side to send credentials like cookies in request;
  })
);
app.use(express.json());
// app.use(limiter);

let PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    Connect();
    cloudinaryConfig();
    console.log(`server started at ${PORT}`);
  }
});

app.use(express.urlencoded({ extended: true })); //to parse simple form data
app.use(cookieParser());
app.use("/api/v1", userRoutes);
app.use("/api/article/v1", articleRoutes);
app.use("/api/comment/v1", commentsRoute);
app.use("/api/like/v1", isLoggedIn, likeRouter);
