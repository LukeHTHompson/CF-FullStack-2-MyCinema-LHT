const express = require("express"),
  morgan = require("morgan");

const app = express();

let topTenFilms = [
  {
    title: "Catch Me If You Can",
    director: "Steven Spielberg"
  },
  {
    title: "Wall-E",
    director: "Andrew Stanton"
  },
  {
    title: "Up",
    director: "Pete Doctor"
  },
  {
    title: "The Tomorrow War",
    director: "Chris McKay"
  },
  {
    title: "The Suicide Squad",
    director: "James Gunn"
  },
  {
    title: "PAW Patrol: The Movie",
    director: "Cal Brunker"
  },
  {
    title: "Free Guy",
    director: "Matt Lieberman"
  },
  {
    title: "Narco Sub",
    director: "Shawn Welling"
  },
  {
    title: "Black Widow",
    director: "Cate Shortland"
  },
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont"
  }
]

// Middleware
// Serve Documentation file as static from the public folder
app.use(express.static("public"));
// Log info via Morgan's "combined" pre-set format
app.use(morgan("combined"));


// GET Requests
app.get("/", (req, res) => {
  res.send("Welcome to MyCinema!");
});

// Excercise 2.5 Additions
// Returns a list of all movies in the database.
app.get("/movies", (req, res) => {
  res.send("GET all movies in database")
});

// Returns info on a particular movie via title.
app.get("/movies/:title", (req, res) => {
  res.send("GET info on one movie specified by title")
});

// Adds a movie to a user's list of favorites.
app.post("/users/:username/favorites/:title", (req, res) => {
  res.send("POST a new movie to a user's list of favorites by title")
});

// Removes a movie from a user's list of favorites.
app.delete("/users/:username/favorites/:title", (req, res) => {
  res.send("DELETE an existing movie from a user's list of favorites by title")
});

// Returns info on a specific film genre.
app.get("/genres/:genre", (req, res) => {
  res.send("GET info on a genre of film by name/title")
});

// Returns data on a specific director.
app.get("/directors/:director", (req, res) => {
  res.send("GET info on a director by name")
});

// Create your own account with a custom username.
app.post("/users", (req, res) => {
  res.send("POST a new account to the site with info in your request body")
});

// Update your own username.
app.put("/users/:username", (req, res) => {
  res.send("PUT an update to your username")
});

// Delete your own account.
app.delete("/users/:username", (req, res) => {
  res.send("DELETE your own account")
});

// Test for error handler
// app.get("/error", (req, res) => {
//   throw new Exception();
// });

// Handle any errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Listen on port 8080 for requests
app.listen(8080, () => {
  console.log("Running on Port 8080.");
});
