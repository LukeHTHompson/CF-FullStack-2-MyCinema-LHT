const express = require("express"),
  morgan = require("morgan");

const app = express();


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
