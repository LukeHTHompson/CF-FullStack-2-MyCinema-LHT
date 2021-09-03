/* eslint-disable */
const jwtSecret = "your_jwt_secret";

const jwt = require("jsonwebtoken"),
  passport = require("passport");

  require("./passport");
/* eslint-disable */

let generateJWTToken = (user) => {
  return jwt.sign(user,jwtSecret, {
    // Username to encode in JWT
    subject: user.Username,
    // Time before token expires automatically
    expiresIn: "7d",
    // Encoding method for JWT
    algorithm: "HS256"
  });
}

/* POST login. */
module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false}, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right.",
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        // ES6 shorthand equivalent to: res.json({ user: user, token: token });
        return res.json({ user, token });
      });
    })(req, res);
  });
}
