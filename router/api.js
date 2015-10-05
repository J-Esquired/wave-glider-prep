path = require("path");
fs = require("fs");
module.exports=function(app)
{
    // Create Twitter bot
    app.get(/tweet.*/,function(req,res){
        console.log(res.req);
        res.sendStatus(res.req.query.message||"no message received");
    });
}