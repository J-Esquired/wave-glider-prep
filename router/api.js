path = require("path");
fs = require("fs");
module.exports=function(app)
{
    // Create Twitter bot
    var TwitterBot = require("node-twitterbot").TwitterBot;

    // Include your access information below
    var Bot = new TwitterBot({
      "consumer_secret": "hR2hehFZm5L5NvP9Z0Slc9o9c0vDd7CcVXRVMNGVwsJm56fksG",
      "consumer_key": "VHQSzYyZCDL5RncFJs8WfH5v3",
      "access_token": "3494627359-GyjHa7ryYFUDJXE2sTy8XlxVQ9bIiSt9vL8mvpH",
      "access_token_secret": "q1no3HCXqJL7RHJWSHZWp427ByRdiqlJ6kaEfvtkBf3QR"
    });

    var tweet = ["hello", "world", "goodbye", "bill", "qualifier", "connected", "march", "chat", "calendar", "chew"];
    
    app.get(/tweet.*/,function(req,res){
        if (res.req.query.message) {
            Bot.tweet(res.req.query.message);
        }
        console.log(res.req.query.message);
        res.sendStatus(res.req.query.message||"no message received");
    });
}