# CF-FullStack-2-MyCinema-LHT

#myCinema

##Description:
This application stores and serves movie data to users on request. Explore our huge catalogue of movies, learning more about your favorite genres, directors, and actors to find the perfect movie for your next night in! From vintage classics, to modern day blockbusters, what you're looking for is sure to be found in the myCinema App! Found something you love? Add it to your list of favorite movies so you'll never lose track of it! Perfect for all ages, this application is sure to bring out the cinephile in everyone, so what are you waiting for, head over to [myCinema](https://lht-my-cinema.herokuapp.com/) now!

myCinema is comprised of a made-from-scratch API interacting with an external noSQL curated database. We will soon have a beautiful front-end GUI to assist you in finding the perfect movie for any occasion!


##Endpoints:
###List All Movies (GET "/movies")
  * This endpoint will GET a list of all movies in the database. This list will be displayed to the requester in JSON format.
  * Parameters: None
  * Request:
  !()!
  * Response:
  !()!
###Read Movie Data (GET "/movies/:Title")
  *
  * Parameters: Title - Title of the film to be returned
  * Request:
  !()!
  * Response:
  !()!
###Update Movie Favorite (POST "/users/:Username/favorites/:MovieID")
  *
  * Parameters: Username - name of the user whose favorites list is affected | MovieID - unique database identifier of movie to be added
  * Request:
  !()!
  * Response:
  !()!
###Update Movie Unfavorite (DELETE "/users/:Username/favorites/:MovieID")
  *
  * Parameters: Username - name of the user whose favorites list is affected | MovieID - unique database identifier of movie to be removed
  * Request:
  !()!
  * Response:
  !()!
###Read Genre Data (GET "/genres/:Genre")
  *
  * Parameters: Genre - Title of the genre to be returned
  * Request:
  !()!
  * Response:
  !()!
###Read Director Data (GET "/directors/:Director")
  *
  * Parameters: Director - Name of the director to be returned
  * Request:
  !()!
  * Response:
  !()!
###Create User (POST "/users")
  *
  * Parameters: None
  * Request:
  !()!
  * Response:
  !()!
###User Login (POST "/login?Username=&Password=)
  *
  * Parameters: Username and Password of the account being logged into
  * Request:
  !()!
  * Response:
  !()!
###Update User Info (PUT "/users/:Username")
  *
  * Parameters: Username - name of the user whose info should be updated
  * Request:
  !()!
  * Response:
  !()!
###Delete User (DELETE "/users/:Username")
  *
  * Parameters: Username - name of the user to be deleted
  * Request:
  !()!
  * Response:
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
