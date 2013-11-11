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
    app.use(express.static('./public'));
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
/*

Source = http://stackoverflow.com/questions/9914816/what-is-an-example-of-the-simplest-possible-socket-io-example

*/

var options = {
  key: fs.readFileSync('SSL/privatekey.pem'),
  cert: fs.readFileSync('SSL/certificate.pem')
};


// var http = require('https'),



// Send index.html to all requests
var server = server.createServer(options, app);

// server.get("/", function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(index);
// });

// https://localhost:3000/three.js
// Socket.io server listens to our app
var io = require('socket.io').listen(server);

// Send current time to all connected clients
function sendTime() {
    io.sockets.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
	
	/**
	 *	Speak
	 */
	socket.on("System-Speak", function (message) {
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		console.log(message);
		exec("say \"" + message.data + "\"", puts);
	});
	
	/**
	 *	Notifications
	 */
	socket.on("System-Notification", function (notification)
	{
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec("terminal-notifier -message \"" + notification.data.message + "\" -title \"" + notification.data.title + "\" -open " + notification.data.target, puts);
	});
	
	/**
	 *	Reminders
	 */
	socket.on("System-Reminder", function (notification) {
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec("automator -i \"" + notification.data + "\" ./Scripts/System/Reminders.workflow", puts);
	});
	
	/**
	 *	Mute Microphone
	 */
	socket.on("System-Input-Mute", function (notification) {
		console.log("Mute");
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec("automator Scripts/System/Mute\\ Microphone.workflow", puts);
	});
	
	/**
	 *	Activate Microphone
	 */
	socket.on("System-Input-Activate", function (notification) {
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec("automator ./Scripts/System/Restore\\ Microphone.workflow", puts);
	});
	
	/**
	 *	Focus Caldron
	 */
	socket.on("System-Focus-Caldron", function (notification) {
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec("automator ./Scripts/System/Focus\\ Caldron.workflow", puts);
	});
	
	/**
	 * Search Wikipedia
	 */
	socket.on("System-Search-Wikipedia", function (message) {
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		console.log(message);
		exec("say \"Searching wikipedia for " + message.data + "\"", puts);
		
		exec("open http://en.wikipedia.org/wiki/Special:Search?search=" + message.data.replace(/^\s+|\s+$/g, "").split(" ").join("+") + "&go=Go", puts);
	});
	
	/**
	 * Close Tab
	 */
	socket.on("System-Close-Tab", function (message) {
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec("say \"Closing Current Tab\"", puts);
		exec("osascript -e 'tell application \"System Events\" to keystroke \"w\" using command down'", puts);
	})
});



server.listen(3000);