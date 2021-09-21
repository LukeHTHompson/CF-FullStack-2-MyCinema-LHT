/* eslint-disable */
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

// Local DB Connection
// mongoose.connect("mongodb://localhost:27017/myCinemaDB", { useNewUrlParser: true, useUnifiedTopology: true });
// Online DB Connection
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");

const { check, validationResult } = require('express-validator');
/* eslint-enable */

const app = express();
// Enable use of bodyParser functionality in all Endpoints
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Imports authentication logic from auth.js
// "(app)" extends Express to auth.js file
/* eslint-disable */

const cors = require('cors');
// Use CORS with the following sites' requests being accepted
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    // If a specific origin isn’t found on the list of allowed origins
    if (allowedOrigins.indexOf(origin) === -1) {
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));


let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");
/* eslint-enable */
// Serve Documentation file as static from the public folder
app.use(express.static("public"));
// Log info via Morgan's "combined" pre-set format
app.use(morgan("combined"));


// GET Requests
app.get("/", (req, res) => {
  res.send("Welcome to MyCinema!");
});

// Returns a list of all movies in the database.
app.get("/movies", /* passport.authenticate("jwt", { session: false }) ,*/(req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
      console.log(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Returns info on a particular movie via title.
app.get("/movies/:Title", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    })
});

// Adds a movie by databse ID to a user's list of favorites.
app.post("/users/:Username/favorites/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    { $addToSet: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Removes a movie by database ID from a user's list of favorites.
app.delete("/users/:Username/favorites/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Returns info on a specific film genre.
app.get("/genres/:Genre", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.find({ "Genre.Name": req.params.Genre },
    { "Genre.Name": 1, "Genre.Description": 1 })
    .then((genre) => {
      res.status(200).json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    })
});

// Returns data on a specific director.
app.get("/directors/:Director", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.find({ "Director.Name": req.params.Director },
    { "Director.Name": 1, "Director.Bio": 1, "Director.Birth": 1, "Director.Death": 1 })
    .then((director) => {
      res.status(200).json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    })
});

// Create your own account with a unique username. No Auth needed.
app.post("/users",
  [
    check("Username", "Username is required.").isLength({ min: 5 }),
    check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required.").not().isEmpty(),
    check("Email", "Email does not appear to be valid.").isEmail()
  ],
  (req, res) => {

    // check validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((name) => {
        // 'name' is a boolean, true if we found that username in the DB, else false
        if (name) {
          return res.status(400).send(req.body.Username + "already exists.");
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            // handle any errors in user creation attempt
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            })
        }
      })
      // handle any errors in DB search attempt
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  });

// Update user info for specified user via the info in the request body.
app.put("/users/:Username",
  [
    check("Username", "Username is required.").isLength({ min: 5 }),
    check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required.").not().isEmpty(),
    check("Email", "Email does not appear to be valid.").isEmail()
  ],
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    // check validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Users.findOneAndUpdate({ Username: req.params.Username }, {
      $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
      { new: true }, // makes the return of our callback function the updated document,
      // as opposed to the original (callback function is next line)
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      });
  });

// Delete specified user's account.
app.delete("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(200).send(req.params.Username + " was successfully deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Test for error handler
// app.get("/error", (req, res) => {
//   throw new Exception();
// });

// Handle any errors in the API as a whole
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
