path = require("path");
fs = require("fs");
module.exports=function(app)
{
    app.get('/',function(req,res){
        res.render('index')
    });
//    app.get('/about',function(req,res){
//        res.render('about');
//    });
//    app.get('/second',function(req,res){
//        res.render('second');
//    });
//    app.get('/third',function(req,res){
//        res.render('third');
//    });
//    app.get('/fourth',function(req,res){
//        res.render('fourth');
//    });
//    app.get('/fifth',function(req,res){
//        res.render('fifth');
//    });
    app.get(/.*\.ico/, function(req, res) {
        res.send(0);
    });
    app.get(/.*\.html/, function(req, res) {
        if (req.originalUrl && req.originalUrl.length > 5) {
            res.render(req.originalUrl.slice(1, -5));
        }
        else {
            res.send("Please specify an .html file");
        }
    });
//    app.get(/.*\.(jpg|jpeg|png|mp4|mkvs)/, function(req, res) {
    app.get(/.*\./, function(req, res) {
        if (req.originalUrl.indexOf('.css') !== -1) {
            res.setHeader('content-type', 'text/css');
        }
        res.send(fs.readFileSync(path.normalize(__dirname + "/../" + req.originalUrl)));
    });
    app.get(/.*/, function(req, res) {
        if (req.originalUrl && req.originalUrl.length > 0) {
            res.render(req.originalUrl.slice(1, req.originalUrl.length));
        }
        else {
            res.render(req.originalUrl);
        }
    });
}