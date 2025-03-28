function authorizeRole(...rest){ //this is a wrapper function main middleware is returned function we know ...rest collects arguments as an []
    return function(req,resp,next){
        if (!rest.includes(req.user.role)) {
            resp.status(401).json({ Message: "User is not authorized!!" });
            return;
          }
          next();
    }
}
module.exports = { authorizeRole };