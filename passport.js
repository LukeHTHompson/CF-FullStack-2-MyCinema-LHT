/* eslint-disable */
const passport = require("passport"),
  // Does the "passport-local" specify this variable as the "local" Strategy
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  // Does the "passport-jwt" specify this variable as the "jwt" Strategy
  passportJWT = require("passport-jwt");

  let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;
/* eslint-enable */

// LocalStrategy is our function for HTTP Auth, only used at login.
passport.use(new LocalStrategy(
  // What the authentication gets from user:
  {usernameField: "Username",
  passwordField: "Password"},
  // How that data is used:
  (username, password, callback) => {
  console.log("Username: " + username + " | " + "Password: " + password);
  Users.findOne({ Username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!user) {
      console.log("Incorrect Username");
      return callback(null, false, {message: "Incorrect username or password."});
    }

    if (!user.validatePassword(password)) {
      console.log("Incorrect Password");
      return callback(null, false, {message: "Incorrect Password"});
    }

    console.log("Finished");
    return callback(null, user);
  });
}));

// JWTStrategy is our function for JWT Authentication/Authorization.
// This will be the method used for all endpoints barring user creation/login.
passport.use(new JWTStrategy(
  {jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "super secret jwt that nobody knows" },
  (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
      .then( (user) => {
        return callback(null, user);
      })
      .catch( (error) => {
        return callback(error)
      });
}));
