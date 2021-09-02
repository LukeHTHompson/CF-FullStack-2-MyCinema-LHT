/* eslint-disable */
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myCinemaDB", { useNewUrlParser: true, useUnifiedTopology: true });

const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");
/* eslint-enable */

const app = express();
// Enable use of bodyParser functionality in all Endpoints
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve Documentation file as static from the public folder
app.use(express.static("public"));
// Log info via Morgan's "combined" pre-set format
app.use(morgan("combined"));


// GET Requests
app.get("/", (req, res) => {
  res.send("Welcome to MyCinema!");
});

// Returns a list of all movies in the database.
app.get("/movies", (req, res) => {
  Movies.find()
  .then( (movies) => {
    res.status(201).json(movies);
  })
  .catch( (err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Returns info on a particular movie via title.
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then( (movie) => {
    res.status(201).json(movie);
  })
  .catch( (err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  })
});

// Adds a movie by databse ID to a user's list of favorites.
app.post("/users/:Username/favorites/:MovieID", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    { $addToSet: {FavoriteMovies: req.params.MovieID} },
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
app.delete("/users/:Username/favorites/:MovieID", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    { $pull: {FavoriteMovies: req.params.MovieID} },
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
app.get("/genres/:Genre", (req, res) => {
  Movies.find({"Genre.Name": req.params.Genre},
  {"Genre.Name":1, "Genre.Description":1})
    .then( (genre) => {
      res.status(201).json(genre);
    })
    .catch( (err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    })
});

// Returns data on a specific director.
app.get("/directors/:Director", (req, res) => {
  Movies.find({"Director.Name": req.params.Director},
  {"Director.Name":1,"Director.Bio":1,"Director.Birth":1,"Director.Death":1})
    .then( (director) => {
      res.status(201).json(director);
    })
    .catch( (err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    })
});

// Create your own account with a custom username.
app.post("/users", (req, res) => {
  Users.findone({ Username: req.body.Username })
    .then( (name) => {
      // 'name' is a boolean, true if we found that username in the DB, else false
      if (name) {
        return res.status(400).send(req.body.Username + "already exists.");
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Passwaord,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then( (user) => {res.status(201).json(user)})
        // handle any errors in user creation attempt
        .catch( (error) => {
          console.error(error);
          res.status(500).send("Error: " + error);
        })
      }
    })
    // handle any errors in DB search attempt
    .catch( (error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Update user info.
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
  { $set:
      { Username: req.body.Username,
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

// Delete your own account.
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then( (user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(200).send(req.params.Username + " was successfully deleted.");
      }
    })
    .catch( (err) => {
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

// Listen on port 8080 for requests
app.listen(8080, () => {
  console.log("Running on Port 8080.");
});
