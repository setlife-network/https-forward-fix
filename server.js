var express = require('express');
var fs = require('fs');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 4000;

app.use(express.static(__dirname + '/build'));

app.get('*', function (req, res, next) {
    // Prevents an HTML response for API calls
    if (req.path.indexOf('/api/') != -1) {
        return next();
    }

    fs.readFile(__dirname + '/build/index.html', 'utf8', function (err, text) {
        res.send(text);

    });
});

app.listen(port, function () {
    console.log('SetLife-ReactWithApi: Server running on port ' + port);

});
