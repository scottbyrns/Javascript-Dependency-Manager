var sys = require('sys');
var express = require ('express');
var exec = require('child_process').exec;
var fs = require('fs');

var options = {
    key: fs.readFileSync('SSL/privatekey.pem'),
    cert: fs.readFileSync('SSL/certificate.pem')
};

// NEVER use a Sync function except at start-up!
index = fs.readFileSync(__dirname + '/SocketServerClient.html');

//Create server
var app = express(options);

// Configure server
app.configure(function () {
    //parses request body and populates request.body
    app.use(express.bodyParser());
    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());
    //perform route lookup based on url and HTTP method
    app.use(app.router);
    //Where to serve static content
    app.use(express.static('./repo'));
	app.get("/", function(req, res) {
	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end(index);
	});
    //Show all errors in development
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});


//Start server
var server = require('https');


// Send index.html to all requests
var server = server.createServer(options, app);

var io = require('socket.io').listen(server);


server.listen(3000);