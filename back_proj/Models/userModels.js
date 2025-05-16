var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
let cloudinary=require("cloudinary").v2;
let userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter the First Name"],
      minLength: 3,
    },
    last_name: {
      type: String,
      required: [true, "Please enter the Second Name"],
      minLength: 3,
    },
    about: {
      type: String,
      required: [true, "Please enter the Summary of the user"],
      minLength: 10,
      maxLength: 200,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Please enter the email of the user"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide the valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please input the user Password"],
    },
    
    role: {
      type: String,
      enum: ["ADMIN", "USER", "QA-TESTER", "CONTENT_WRITTER"],
      default: "USER",
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      required: [true, "Kindly provide the DOB!"],
      max: Date.now(),
    },
    article: [
      {
        type: mongoose.Schema.Types.ObjectId, //need to be focused on it is connecting to dufferent model whic is an interface
        ref: "Article",
      },
    ],
  },
  { timestamps: true }
);
// encoding the password bcrypt
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } else if (this.isModified("avatar")) {
      let result = await cloudinary.uploader.upload(this.avatar);
      this.avatar=result.secure_url;
      next();
    } else {
      next();
    }
  } catch (err) {
    console.error("Error in bcrypt hashing in schema:", err);
    next(err); 
  }
});

 //requires a function
const User = mongoose.model("User", userSchema);
module.exports = { User };
