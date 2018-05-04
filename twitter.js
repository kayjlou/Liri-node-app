//function twitter(){
  //var fs = require('fs');

require("dotenv").config();
  //Twitter require
  var twitter = require('twitter');
   //Twitter keys
   var keys = require('./keys.js');
   var client = new twitter(keys.twitter);

  //var client = new twitter({
 // consumer_key: process.env.TWITTER_CONSUMER_KEY,
 // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
 // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
 // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
 // });

  //Grabs twitter information
  var params = { screen_name: "itsSunnyOut1", count: 20 };

  client.get('status/user_timeline', params, function(error, tweets, response){
    //If there is an error
    if(error){ 
      console.log("Error: " + error)
    } else {
      console.log("===================================");
      console.log("Last 20 tweets");
      //For Loop
      for (var i = 0; i < tweets.length; i++){
        console.log("Tweeted on: " + tweets[i].created_at);
        console.log("Tweets: " + tweets[i].text);
        console.log("");
      }
    }
  });

//}
