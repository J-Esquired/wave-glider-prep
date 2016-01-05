var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer();
var app = express();

app.get('/', function (req, res) {
    var html = fs.readFileSync('tempTest.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.post('/', function(req, res){
    console.log('POST /');
    
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('...');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});