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
    app.get(/.*\.js/, function(req, res) {
//        res.send(fs.readFileSync("../scripts" + req.originalUrl, "utf8"));
//        res.send(fs.readFileSync(path.resolve(__dirname, req.originalUrl));
        res.send(fs.readFileSync(__dirname + "/../scripts" + req.originalUrl, "utf8"));
    });
    app.get(/.*\.(jpg|png)/, function(req, res) {
//        res.send(fs.readFileSync("../scripts" + req.originalUrl, "utf8"));
//        res.send(fs.readFileSync(path.resolve(__dirname, req.originalUrl));
        res.send(fs.readFileSync(__dirname + "/.." + req.originalUrl));
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