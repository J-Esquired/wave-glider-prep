var express = require('express');
var app = express(), api = express();
var port = 8080, apiPort = 8081;
require('./router/main')(app);
require('./router/api')(api);
app.set('views',__dirname + '/views');
//app.use(express.staticProvider(__dirname));
app.set('view engine', 'jade');
app.engine('.jade', require('jade').__express);
//app.get('/',function(req,res) {
//    res.send('Hello world');
//});
var server = app.listen(port,function() {
    console.log("We have started our server on port " + port);
})
var apiServer = api.listen(apiPort,function() {
    console.log("We have started our api server on port " + apiPort);
})