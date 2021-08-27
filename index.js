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

app.get("/movies", (req, res) => {
  res.json(topTenFilms);
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
