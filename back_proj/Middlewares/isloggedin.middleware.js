let jwt = require("jsonwebtoken");
function isLoggedIn(req, resp, next) {
  try {
    let { newlettertoken } = req.cookies;
    if (!newlettertoken) {
      resp.status(401).json({ Message: "Kindly Login" });
      return;
    }
    // getting the assigned info from jwt token sent to user
    decode_info = jwt.verify(newlettertoken, process.env.JWT_SECRET_KEY);
    //assigning user to request object as a property
    req.user = decode_info;
    next();
  } catch (err) {
    console.log(err, "in isLogged in middleware");
    resp.status(500).json({ Message: "internal server error" });
  }
}
module.exports = { isLoggedIn };
