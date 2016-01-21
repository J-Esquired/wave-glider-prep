var express = require('express');
var app = express(), api = express();
var port = process.env.PORT || 8080, apiPort = 8081;
if (port === apiPort) apiPort = 8080;
require('./router/main')(app);
require('./router/api')(api);
app.set('views',__dirname + '/views');
//app.use(express.staticProvider(__dirname));
app.set('view engine', 'jade');
app.engine('.jade', require('jade').__express);
//app.get('/',function(req,res) {
//    res.send('Hello world');
//});

// Add headers
app.use(function (req, res) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + apiPort);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
//    next();
});

// Add headers
api.use(function (req, res) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
//    next();
});
var server = app.listen(port,function() {
    console.log("We have started our server on port " + port);
})
var apiServer = api.listen(apiPort,function() {
    console.log("We have started our api server on port " + apiPort);
})