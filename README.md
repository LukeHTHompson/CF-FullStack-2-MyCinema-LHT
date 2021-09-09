# CF-FullStack-2-MyCinema-LHT

#myCinema

##Description:
This application stores and serves movie data to users on request. Explore our huge catalogue of movies, learning more about your favorite genres, directors, and actors to find the perfect movie for your next night in! From vintage classics, to modern day blockbusters, what you're looking for is sure to be found in the myCinema App! Found something you love? Add it to your list of favorite movies so you'll never lose track of it! Perfect for all ages, this application is sure to bring out the cinephile in everyone, so what are you waiting for, head over to [myCinema](https://lht-my-cinema.herokuapp.com/) now!

myCinema is comprised of a made-from-scratch API interacting with an external noSQL curated database. We will soon have a beautiful front-end GUI to assist you in finding the perfect movie for any occasion!


##Endpoints:
1. List All Movies (GET "/movies")
  1. This endpoint will GET a list of all movies in the database. This list will be displayed to the requester in JSON format.
  1. Parameters: None
  1. Request:
  !()!
  1. Response:
  !()!
1. Read Movie Data (GET "/movies/:Title")
  1.
  1. Parameters: Title - Title of the film to be returned
  1. Request:
  !()!
  1. Response:
  !()!
1. Update Movie Favorite (POST "/users/:Username/favorites/:MovieID")
  1.
  1. Parameters: Username - name of the user whose favorites list is affected | MovieID - unique database identifier of movie to be added
  1. Request:
  !()!
  1. Response:
  !()!
1. Update Movie Unfavorite (DELETE "/users/:Username/favorites/:MovieID")
  1.
  1. Parameters: Username - name of the user whose favorites list is affected | MovieID - unique database identifier of movie to be removed
  1. Request:
  !()!
  1. Response:
  !()!
1. Read Genre Data (GET "/genres/:Genre")
  1.
  1. Parameters: Genre - Title of the genre to be returned
  1. Request:
  !()!
  1. Response:
  !()!
1. Read Director Data (GET "/directors/:Director")
  1.
  1. Parameters: Director - Name of the director to be returned
  1. Request:
  !()!
  1. Response:
  !()!
1. Create User (POST "/users")
  1.
  1. Parameters: None
  1. Request:
  !()!
  1. Response:
  !()!
1. User Login (POST "/login?Username=&Password=)
  1.
  1. Parameters: Username and Password of the account being logged into
  1. Request:
  !()!
  1. Response:
  !()!
1. Update User Info (PUT "/users/:Username")
  1.
  1. Parameters: Username - name of the user whose info should be updated
  1. Request:
  !()!
  1. Response:
  !()!
1. Delete User (DELETE "/users/:Username")
  1.
  1. Parameters: Username - name of the user to be deleted
  1. Request:
  !()!
  1. Response:
  !()!

 
##Dependencies:
*bcrypt
*body-parser
*cors
*express
*express-validator
*git
*jsonwebtoken
*lodash
*mongoose
*morgan
*passport
*passport-jwt
*passport-local
