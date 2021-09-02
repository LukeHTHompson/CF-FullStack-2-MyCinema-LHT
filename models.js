/* eslint-disable */
const mongoose = require("mongoose");

let MovieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  Imagepath: String,
  Featured: Boolean
});

let UserSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: "Movie"}]
});

let Movie = mongoose.model("Movie", MovieSchema)
let User = mongoose.model("User", UserSchema);

module.exports.Movie = Movie;
module.exports.User = User;
