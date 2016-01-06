var express = require('express');    //Express Web Server 
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

var app = express();
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

/* ========================================================== 
Create a Route (/upload) to handle the Form submission 
(handle POST requests to /upload)
Express v4  Route definition
============================================================ */
app.route('/upload')
    .post(function (req, res, next) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            var path = __dirname + '/uploads/' + filename;
            fstream = fs.createWriteStream(path);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.end(getHTML(path));        //where to go next
            });
        });
    });

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});

function getHTML(path)
{
    while (path.indexOf(' ') != -1)
    {
        var index = path.indexOf(' ');
        path = path.substring(0, index) + '%20' + path.substring(index + 1, path.length);
    }
    var html = '<head></head><body><img src="';
    var relPath = path.substring(path.indexOf('uploads/'), path.length);
    
    html += relPath;
    html += '">';
    html += relPath;
    html += '</body>';
    
    return html;
}