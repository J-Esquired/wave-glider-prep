var TwitterBot = require("node-twitterbot").TwitterBot;

// Include your access information below
var Bot = new TwitterBot({
  "consumer_secret": "hR2hehFZm5L5NvP9Z0Slc9o9c0vDd7CcVXRVMNGVwsJm56fksG",
  "consumer_key": "VHQSzYyZCDL5RncFJs8WfH5v3",
  "access_token": "3494627359-GyjHa7ryYFUDJXE2sTy8XlxVQ9bIiSt9vL8mvpH",
  "access_token_secret": "q1no3HCXqJL7RHJWSHZWp427ByRdiqlJ6kaEfvtkBf3QR"
});

var tweet = ["hello", "world", "goodbye", "bill", "qualifier", "connected", "march", "chat", "calendar", "chew"];

Bot.tweet("I'm posting a tweet!");

setInterval(function()
            {
                Bot.tweet(tweet[~~(Math.random()*tweet.length)])
            }, 1000*30);