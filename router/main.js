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
    app.get(/.*\.js/, function(req, res) {
//        res.send(fs.readFileSync("../scripts" + req.originalUrl, "utf8"));
        res.send(fs.readFileSync(path._directory + "../scripts" + req.originalUrl));
    });
    app.get(/.*/, function(req, res) {
        res.render(req.originalUrl.slice(1, req.originalUrl.length));
    });
}