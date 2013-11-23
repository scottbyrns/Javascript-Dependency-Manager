var path = require('path');
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
	
	
	socket.on("remove-package", function (message) {
		
		// console.log(arguments);
		
		var packageToRemove = message;
		
		
		
		fs.readFile("./client/repo/repo.json", 'utf8', function (err, repo) {
		  if (err) {
		    console.log('Error: ' + err);
		    return;
		  }

		  repo = JSON.parse(repo);

		  // console.dir(repo);
		  
		  console.log(JSON.stringify(packageToRemove));
		  
		  // Remove just a version if there are more than one.
		  var removedAVersionNumber = false;
		  
		  for (var j = 0, jlen = repo.packages.length; j < jlen; j += 1) {
			  
			  if (repo.packages[j].groupId == packageToRemove.groupId && repo.packages[j].artifactId == packageToRemove.artifactId && repo.packages[j].versions.length > 1) {
				  
				  removedAVersionNumber = true;
				  repo.packages[j].versions.pop(packageToRemove.version);
				  
			  }
			  
			  if (repo.packages[j].groupId == packageToRemove.groupId && repo.packages[j].artifactId == packageToRemove.artifactId && repo.packages[j].versions.length == 1) {
				  
				  // removedAVersionNumber = false;
				  repo.packages.splice(j, 1);
				  jlen -= 1;
				  j -= 1;
				  
			  }
			  
		  }
		  
		  
		  if (!removedAVersionNumber) {
			
  			function puts(error, stdout, stderr) { 
  				// fs.writeFile('client/repo/test/' + group + "/" + pom.artifactId + "/" + pom.version + "/pom.json", notification.data.data, function(err) {
  				//     if(err) {
  				//         console.log(err);
  				//     } else {
  				//         console.log("The file was saved!");
  				//     }
  				// });
  			}
  			exec("rm -rf " + './client/repo/packages/' + packageToRemove.groupId.split(".").join("/") + "/" + packageToRemove.artifactId + "", puts);
			// console.log("rm -rf " + './client/repo/packages/' + packageToRemove.groupId.split(".").join("/") + "/" + packageToRemove.artifactId + "");
		  }
		  else
		  {
			
    			function puts(error, stdout, stderr) { 
    				// fs.writeFile('client/repo/test/' + group + "/" + pom.artifactId + "/" + pom.version + "/pom.json", notification.data.data, function(err) {
    				//     if(err) {
    				//         console.log(err);
    				//     } else {
    				//         console.log("The file was saved!");
    				//     }
    				// });
    			}
    			exec("rm -rf " + './client/repo/packages/' + packageToRemove.groupId.split(".").join("/") + "/" + packageToRemove.artifactId + "/" + packageToRemove.version, puts);
				// console.log("rm -rf " + './client/repo/packages/' + packageToRemove.groupId.split(".").join("/") + "/" + packageToRemove.artifactId + "/" + packageToRemove.version);
			
		  }
		  				// 
		fs.writeFile("./client/repo/repo.json", JSON.stringify(repo, null, 4), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("Repo Updated, Artifact Removed");
		    }
		});
		  
		  // console.log(JSON.stringify(repo, null, 8));
		  
		  
		
		});
	});
	
	socket.on("download-package", function (package) {
	
	
			var path = "client/repo/packages/" + package.groupId.split(".").join("/") + "/" + package.artifactId + "/" + package.version + "/";
			var cmd = "cd " + path + "../../ ;tar -czvf /tmp/" + package.artifactId + "-" + package.version + ".tar " + "./" + package.artifactId;
			
			
			function puts(error, stdout, stderr) { 
				
				fs.readFile("/tmp/" + package.artifactId + "-" + package.version + ".tar", function (err, file) {
					// console.log(arguments);
					
					var base64data = new Buffer(file).toString('base64');
					
					socket.emit("output-file", {
						name: package.artifactId + "-" + package.version + ".tar ",
						file: "data:application/tar;base64," + base64data
					});
					
				});
				
			}
			exec(cmd, puts);
		// pom
		// src/*
		// readme
		
		
		
		
	});
	
	socket.on("save-package", function (newPackage) {
		
		
		
		
		
		var data = JSON.parse(newPackage.data);
		
		var path = "./client/repo/packages/" + data.groupId.split(".").join("/") + "/" + data.artifactId + "/" + data.version + "/src/"
		
		console.log(JSON.stringify(data, null, 5));
		

			
			
			function puts(error, stdout, stderr) { 
				
				var pom = {
					name: data.name,
					description: data.description,
					
					icon: data.icon,
					
					groupId: data.groupId,
					artifactId: data.artifactId,
					version: data.version,
					
					"url": data.url,
					"scm": data.scm,
					"issueTracking": data.issueTracking,
					
					developers: data.developers,
					
					sources: [],
					dependencies: [],
					
					configuration: {}
				}
				
				
				for (var i = 0, len = data.sources.length; i < len; i += 1) {
					
					var fileContent = data.sources[i].data;
					var fileName = data.sources[i].file.name;

					if (fileName == "README.md") {
						
						if (data.readmeData) {
							fileContent = data.readmeData;
						}
						
						fs.writeFile(path + "../README.md", fileContent, function(err) {
						    if(err) {
						        console.log(err);
						    } else {
						        console.log("The file was saved!");
						    }
						});
						
					}
					else
					{

						pom.sources.push(fileName);

						fs.writeFile(path + fileName, fileContent, function(err) {
						    if(err) {
						        console.log(err);
						    } else {
						        console.log("The file was saved!");
						    }
						});
					
						
					}
					
				}
				
				for (var i = 0, len = data.dependencies.length; i < len; i += 1) {
					
					var fileContent = data.dependencies[i]

					pom.dependencies.push({
						groupId: fileContent.groupId,
						artifactId: fileContent.artifactId,
						version: fileContent.version
					});
					
				}
				
				fs.writeFile(path + "../pom.json", JSON.stringify(pom, null, 4), function(err) {
				    if(err) {
				        console.log(err);
				    } else {
				        console.log("The file was saved!");
				    }
				});
				
				
				// Update repo index.
				
				
				fs.readFile("./client/repo/repo.json", 'utf8', function (err, repo) {
				  if (err) {
				    console.log('Error: ' + err);
				    return;
				  }
 
				  repo = JSON.parse(repo);
 
				  console.dir(repo);
				  
				  
				  
				  // Update version array or add new artifact
				  var update = false;
				  
				  for (var j = 0, jlen = repo.packages.length; j < jlen; j += 1) {
					  
					  if (repo.packages[j].groupId == data.groupId && repo.packages[j].artifactId == data.artifactId) {
						  
						  update = true;
						  repo.packages[j].versions.push(data.version);
						  
					  }
					  
				  }
				  
				  if (!update) {
					  
					  repo.packages.push({
						  
		  					groupId: data.groupId,
		  					artifactId: data.artifactId,
		  					versions: [data.version]
							
					  });
					  
				  }
				  
  				fs.writeFile("./client/repo/repo.json", JSON.stringify(repo, null, 4), function(err) {
					
  				    if(err) {
						
  				        console.log(err);
						
  				    }
					else {
						
  				        console.log("The file was saved!");
						
  				    }
					
  				});
				  
				  
				});
				
			}
			
			
			
			exec("mkdir -p " + path, puts);
			

		
		
		
	});
	
	
	
	
	socket.on("package-upload", function (tar) {
		
		// console.log(tar);
		
		// var fileName = "package-upload" + Math.random();
		
		var string = tar.url;
		var regex = /^data:.+\/(.+);base64,(.*)$/;
	
		// var name = package.pom.groupId + package.pom.artifactId + package.pom.version;

		var matches = string.match(regex);
		var ext = matches[1];
		var data = matches[2];
		var buffer = new Buffer(data, 'base64');
		
		
		
		fs.writeFileSync('/tmp/' + tar.file.name, buffer);

		exec("cd /tmp; " + 'tar -xf /tmp/' + tar.file.name, function () {
			
			
			
			fs.readFile("/tmp/" + tar.file.name.replace(".tar", "") + "/pom.json", function (err, file) {

				console.log(file);
				console.log("TODO Extract tar to repo.");

			});
			
			

		});
		
		// fs.writeFile('/tmp/' + tar.file.name, (tar.data), function(err) {
		//     if(err) {
		//         console.log(err);
		//     } else {
		// 		
		// 		exec("cd /tmp; " + 'tar -xf /tmp/' + fileName + ".tar" + " /tmp/" + fileName, function () {
		// 			console.log(fileName);
		// 		});
		// 			console.log(tar.file.name);				
		//         console.log("The file was saved!");
		//     }
		// });
		
		
	});
	
	
	
	socket.on("update-package", function (newPackage) {
		
		
		
		
		
		var data = JSON.parse(newPackage.data);
		
		var path = "./client/repo/packages/" + data.groupId.split(".").join("/") + "/" + data.artifactId + "/" + data.version;
		
		console.log(JSON.stringify(data, null, 5));

		
		
		var dependencies = [];
		
		for (var i = 0, len = data.dependencies.length; i < len; i += 1) {
			
			dependencies.push({
				groupId: data.dependencies[i].groupId,
				artifactId: data.dependencies[i].artifactId,
				version: data.dependencies[i].version
			});
			
		}
		
		
		var pom = {
			name: data.name,
			description: data.description,
			icon: data.icon,
			groupId: data.groupId,
			artifactId: data.artifactId,
			version: data.version,
			"url": data.url,
			"scm": data.scm,
			"issueTracking": data.issueTracking,
			developers: data.developers,
			sources: data.sources,
			dependencies: dependencies,
			configuration: {}
		}
		
		console.log(JSON.stringify(pom, null, 5));
		
		fs.writeFile(path + "/pom.json", JSON.stringify(pom, null, 4), function(err) {
			
		    if(err) {
				
		        console.log(err);
				
		    } else {
				
		        console.log("The file was saved!");
				
		    }
			
		});
		
		
		if (data.readmeData) {
			fs.writeFile(path + "/README.md", data.readmeData, function(err) {
			    if(err) {
			        console.log(err);
			    } else {
			        console.log("The file was saved!");
			    }
			});
		}
		

		
		
		
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
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
			
			
			function puts(error, stdout, stderr) { 
				fs.writeFile('client/repo/test/' + group + "/" + pom.artifactId + "/" + pom.version + "/pom.json", notification.data.data, function(err) {
				    if(err) {
				        console.log(err);
				    } else {
				        console.log("The file was saved!");
				    }
				});
			}
			exec("mkdir -p " + 'client/repo/test/' + group + "/" + pom.artifactId + "/" + pom.version + "/src", puts);
		}
		

	});
	
	socket.on("remote-deployment", function (package) {
		
		
		

		if (path.existsSync("client/repo/packages/" + package.pom.groupId.split(".").join("/") + "/" + package.pom.artifactId + "/" + package.pom.version)) { // or 
			
			socket.emit("package-denied-duplicate", package.pom);
			
		}
		else
		{
		
		
		
			var string = package.file;
			var regex = /^data:.+\/(.+);base64,(.*)$/;
		
			var name = package.pom.groupId + package.pom.artifactId + package.pom.version;

			var matches = string.match(regex);
			var ext = matches[1];
			var data = matches[2];
			var buffer = new Buffer(data, 'base64');
			fs.writeFileSync('/tmp/' + name + "." + ext, buffer);
		
			exec("mkdir -p tmp/" + name + "; tar -xf " + '/tmp/' + name + "." + ext + " -C tmp/" + name + "/", function () {
			
				exec("mkdir -p client/repo/packages/" + package.pom.groupId.split(".").join("/") + "/" + package.pom.artifactId + "/" + package.pom.version + "/src", function () {
				
					exec("mv tmp/" + name + "/* client/repo/packages/" + package.pom.groupId.split(".").join("/") + "/" + package.pom.artifactId + "/" + package.pom.version + "" , function () {
					
						fs.readFile("./client/repo/repo.json", 'utf8', function (err, repo) {

						    if (err) {
						        console.log('Error: ' + err);
						        return;
						    }

						    repo = JSON.parse(repo);

							var data = package.pom;



						    // Update version array or add new artifact
						    var update = false;

						    for (var j = 0, jlen = repo.packages.length; j < jlen; j += 1) {

						        if (repo.packages[j].groupId == data.groupId && repo.packages[j].artifactId == data.artifactId) {

						            update = true;
						            repo.packages[j].versions.push(data.version);

						        }

						    }

						    if (!update) {

						        repo.packages.push({

						            groupId: data.groupId,
						            artifactId: data.artifactId,
						            versions: [data.version]

						        });

						    }

						    fs.writeFile("./client/repo/repo.json", JSON.stringify(repo, null, 4), function (err) {

						        if (err) {

						            console.log(err);

						        } else {

									socket.emit("package-added-remotely", package.pom);

						        }

						    });


						});
					
					

					
					});
				
				});
			
			});
		
			console.log(package);	
		}
		
	});
	
	socket.on("ping", function () {
		console.log('ping')
		socket.emit("pong");
	})
	
	socket.on("create-project-stub-from-an-existing-pom", function (notification) {
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
			
			
			function puts(error, stdout, stderr) { 
				fs.writeFile('client/repo/test/' + group + "/" + pom.artifactId + "/" + pom.version + "/pom.json", notification.data.data, function(err) {
				    if(err) {
				        console.log(err);
				    } else {
				        console.log("The file was saved!");
				    }
				});
			}
			exec("mkdir -p " + 'client/repo/test/' + group + "/" + pom.artifactId + "/" + pom.version + "/src", puts);
		}
		

	});
});

server.listen(3000);



