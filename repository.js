var sys = require('sys');
var express = require ('express');
var exec = require('child_process').exec;
var fs = require('fs');
var options = {
    key: fs.readFileSync('SSL/privatekey.pem'),
    cert: fs.readFileSync('SSL/certificate.pem')
};

// NEVER use a Sync function except at start-up!
index = fs.readFileSync(__dirname + '/client/console.html');

//Create server
var app = express(options);

// Configure server
app.configure(function () {
	// Allow cross domain requests.
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

	  next();
	});
    //parses request body and populates request.body
    app.use(express.bodyParser());
    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());
    //perform route lookup based on url and HTTP method
    app.use(app.router);
    //Where to serve static content
    // app.use(express.static('./'));
	
	app.use(express.directory('./client'));
	
	app.use(express.static('./client'));
	

	
	app.all('/', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	 });
	
	
	app.get("/", function(req, res) {
  	  res.header("Access-Control-Allow-Origin", "*");
  	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

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


var newPackage = {
	hasPom: false,
	hasSrc: false
};


io.sockets.on('connection', function(socket) {
	socket.on("file-test", function (notification) {
		// console.log("Mute");
		// function puts(error, stdout, stderr) { sys.puts(stdout) }
		// exec("automator Scripts/System/Mute\\ Microphone.workflow", puts);
		// console.log(notification);
		console.log(notification.data.file.name);
		
		if (notification.data.file.name.indexOf(".js") > -1)
		{
			
		}
		
		if (notification.data.file.name == "pom.json")
		{
			var pom = JSON.parse(notification.data.data);
			var group = pom.groupId.split(".").join("/");
			
			
			function puts(error, stdout, stderr) { sys.puts(stdout) }
			exec("mkdir -p /tmp/" + group, puts);
		}
		
		fs.writeFile("/tmp/test", notification.data.data, function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		});
	});
});

server.listen(3000);



