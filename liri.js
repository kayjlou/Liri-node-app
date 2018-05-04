//Code to import files
require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request')

var client = new Twitter(keys.twitter);

var input= "";

input = process.argv.slice(3);

runCommand(process.argv[2], input)

//Command using/case switch to run specialized functions
function runCommand(command, input){
      switch(command){

        //For Tweets
        case "my-tweets":
          getTweets();
          break;

        //For Spotify
        case "spotify-this-song":
          getSong(input)
          break;

        //For Movie OMDB
        case "movie-this":
          getMovie(input);
          break;

        //Read File
        case "do-what-it-says":
          getFile();
          break;

          //Undefined? and Defauly
      }
}


//Function for gathering tweets (Issue with it returning information)
function getTweets(){
  var client = new Twitter(keys.twitter)
  //Define params
  var params = { screen_name: 'itssunnyout1'}

  //Request to get tweet information
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i=0; i < tweets.length; i++){
          console.log(response)
            console.log(tweets[i].text + 
              "\nCreated on: " + tweets[i].created_at + "\n");
        }
    }
});
}



//Function for getting movie info
function getMovie(movieName){

//Set default movie (Does not work)
if (input = ""){
  movieName = "Mr Nobody"
}

//Url for the OMDB api with the movie name that was input by user
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  //Call request
  request(queryUrl, function(err, response,body){
    var movie = JSON.parse(body)
    console.log("--------------------------" + 
    "\nTitle: " + movie.Title + 
    "\n--------------------------" + 
    "\nThe movie's release year is: " + movie.Year + 
    "\nIMDB Rating: " + movie.imdbRating + 
    "\nRotten Tomatoes Rating: " + movie.Ratings[2].Value + 
    "\nCountry of production: " + movie.Country + 
    "\nLanguage of the movie: " + movie.Language +
    "\nPlot: " + movie.Plot + 
    "\nActors: " + movie.Actors + "\n");
  }) 
}

//Function for spotify-this-song   //Console log Artist/
function getSong(){
  var spotify = new Spotify(keys.spotify)
  //process.argv.slice(3)

  //Setting default song (Still debugging )
  if (input !== undefined){
    song = input;
  }
  else {
    song = "the sign ace of base"
  }
  //Spotify call 
  spotify.search({type: 'track', query: song }, function(err, data){
    if (err){
      return console.log('Error occurred: ' + err);
    }
    //Console log out information
    console.log("\nArtist: " + data.tracks.items[0].artists[0].name +
                "\nThe song's name: " + data.tracks.items[0].name +
                "\nPreview on spotify: " + data.tracks.items[0].external_urls.spotify +
                "\nAlbum name: " + data.tracks.items[0].album.name + "\n");
  })
}





//Function for do-what-it-says
function getFile(){
  fs.readFile('./random.txt', 'utf8', function(error, data){
    if(error){
      console.log("Unable to read")
    }
    //console log out information in file
    console.log("This is in file:" + data);
    //Split information to put in as params
    var textInfo = data.split(',');
    command = textInfo[0];
    input = textInfo[1];
    //Using first piece of file run under getSong function
    switch(command){
      case "spotify-this-song":
      getSong();
      break;
    }
  })
  

}


