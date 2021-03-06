# CF-FullStack-2-MyCinema-LHT

# myCinema

## Description:
This application stores and serves movie data to users on request. Explore our huge catalogue of movies, learning more about your favorite genres, directors, and actors to find the perfect movie for your next night in! From vintage classics, to modern day blockbusters, what you're looking for is sure to be found in the myCinema App! Found something you love? Add it to your list of favorite movies so you'll never lose track of it! Perfect for all ages, this application is sure to bring out the cinephile in everyone, so what are you waiting for, head over to [myCinema](https://lht-my-cinema.herokuapp.com/) now!

myCinema is comprised of a made-from-scratch API interacting with an external noSQL curated database. We will soon have a beautiful front-end GUI to assist you in finding the perfect movie for any occasion!


## Endpoints:
### List All Movies (GET "/movies")
  * This endpoint will GET a list of all movies in the database. This list will be displayed to the requester in JSON format.
  * Parameters: None
  * User Auth: Required
  * Request:
  ![](/img/1.png)
  * Response:
  ![](/img/2.png)
### Read Movie Data (GET "/movies/:Title")
  * This endpoint will GET a single movie, specified by title, and return its info in JSON format.
  * Parameters: Title - Title of the film to be returned
  * User Auth: Required
  * Request:
  ![](/img/3.png)
  * Response:
  ![](/img/4.png)
### Update Movie Favorite (POST "/users/:Username/favorites/:MovieID")
  * This endpoint will add a movie, specified by database ID to the favorite movies list of a user, specified by username.
  * Parameters: Username - name of the user whose favorites list is affected | MovieID - unique database identifier of movie to be added
  * User Auth: Required
  * Request:
  ![](/img/5.png)
  * Response:
  ![](/img/6.png)
### Update Movie Unfavorite (DELETE "/users/:Username/favorites/:MovieID")
  * This endpoint will delete a movie, specified by database ID from the favorite movies list of a user, specified by username.
  * Parameters: Username - name of the user whose favorites list is affected | MovieID - unique database identifier of movie to be removed
  * User Auth: Required
  * Request:
  ![](/img/7.png)
  * Response:
  ![](/img/8.png)
### Read Genre Data (GET "/genres/:Genre")
  * This endpoint will return data on a single movie genre, specified by title, in JSON format.
  * Parameters: Genre - Title of the genre to be returned
  * User Auth: Required
  * Request:
  ![](/img/9.png)
  * Response:
  ![](/img/10.png)
### Read Director Data (GET "/directors/:Director")
  * This endpoint will return data on a single director, specified by name, in JSON format.
  * Parameters: Director - Name of the director to be returned
  * User Auth: Required
  * Request:
  ![](/img/11.png)
  * Response:
  ![](/img/12.png)
### Create User (POST "/users")
  * This endpoint will create a new user, and return info on the new user in JSON format to confirm creation.
  * Parameters: None
  * User Auth: Not Required
  * Request:
  ![](/img/13.png)
  * Response:
  ![](/img/14.png)
### User Login (POST "/login?Username=&Password=)
  * This endpoint will allow a user to login to the site, authorizing them to use endpoints that are security restricted.
  * Parameters: Username and Password of the account being logged into
  * User Auth: Not Required
  * Request:
  ![](/img/15.png)
  * Response:
  ![](/img/16.png)
### Update User Info (PUT "/users/:Username")
  * This endpoint will update the user data of one user, specified by username, to match the data in the request body.
  * Parameters: Username - name of the user whose info should be updated
  * User Auth: Required
  * Request:
  ![](/img/17.png)
  * Response:
  ![](/img/18.png)
### Delete User (DELETE "/users/:Username")
  * This endpoint will delete the account of one user, specified by username.
  * Parameters: Username - name of the user to be deleted
  * User Auth: Required
  * Request:
  ![](/img/19.png)
  * Response:
  ![](/img/20.png)

 
## Dependencies:
* bcrypt
* body-parser
* cors
* express
* express-validator
* git
* jsonwebtoken
* lodash
* mongoose
* morgan
* passport
* passport-jwt
* passport-local
