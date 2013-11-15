#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');
var socket;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

// √ deploy
// install
// redeploy
// √ package
// compile
// create
// spawn (spawn new module as dependency, child module)

var runDate = new Date();

var jdmActions = {
	
	package: function () {
		var pom = JSON.parse(fs.readFileSync('./pom.json'));
		
		var tarOut = pom.groupId + pom.artifactId + pom.version + (runDate*1) + ".tar";
		var tmpPath = '/tmp/' + pom.groupId + pom.artifactId + pom.version + (runDate*1);
		var mkdirCmd = 'mkdir ' + tmpPath;
		
			

		function puts(error, stdout, stderr) {
			

			
			function aputs(error, stdout, stderr) {
				// console.log("Pom Transfer Completed");
				var sourceTransferCount = 0;
				var sourceTransferLimit = pom.sources.length;
				for (var i = 0, len = pom.sources.length; i < len; i += 1) {
					function puts(error, stdout, stderr) {
						// console.log("A Source Transfer Completed");
						
						if (++sourceTransferCount == sourceTransferLimit) {
							
							
							
							var cmd = "cd " + tmpPath + "; tar -czvf " + tarOut + " ./*";
			
			
							function puts(error, stdout, stderr) { 
								
								exec("mv " + tmpPath + "/" + tarOut + " ./" + pom.artifactId + "-" + pom.version + ".tar", function () {
									console.log("Packaged => " + pom.artifactId + "-" + pom.version + ".tar");
								});
				
							}
							exec(cmd, puts);
							
							
							

							
						}
					}
			
					var pathToSource = pom.sources[i].split("/");
					pathToSource.splice(pathToSource.length - 1, 1);
					pathToSource = pathToSource.join("/");

					exec("mkdir -p " + tmpPath + "/src/" + pathToSource + "; cp src/" + pom.sources[i] + " " + tmpPath + "/src/" + pom.sources[i] , puts);
				}
			}

			exec("cp ./pom.json " + tmpPath + "/pom.json" , aputs);
			
			
		}
		
		exec(mkdirCmd, puts);
	},

	"deploy": function () {
		var pom = JSON.parse(fs.readFileSync('./pom.json'));
		
		var tarOut = pom.groupId + pom.artifactId + pom.version + (runDate*1) + ".tar";
		var tmpPath = '/tmp/' + pom.groupId + pom.artifactId + pom.version + (runDate*1);
		var mkdirCmd = 'mkdir ' + tmpPath;
		
			

		function puts(error, stdout, stderr) {
			

			
			function aputs(error, stdout, stderr) {
				console.log("Pom Transfer Completed");
				var sourceTransferCount = 0;
				var sourceTransferLimit = pom.sources.length;
				for (var i = 0, len = pom.sources.length; i < len; i += 1) {
					function puts(error, stdout, stderr) {
						console.log("A Source Transfer Completed");
						
						if (++sourceTransferCount == sourceTransferLimit) {
							
							
							
							var cmd = "cd " + tmpPath + "; tar -czvf " + tarOut + " ./*";
			
			
							function puts(error, stdout, stderr) { 
				
								fs.readFile(tmpPath + "/" + tarOut, function (err, file) {
									// console.log(arguments);
					
									var base64data = new Buffer(file).toString('base64');
					
									socket.on("package-denied-duplicate", function (data) {
										if (data.groupId == pom.groupId && data.artifactId == pom.artifactId && data.version == pom.version) {
											socket.disconnect('unauthorized');

											exec("rm -rf " + tmpPath, function () {
												console.log("Rejected. Duplicate artifact.")
											});
										}
										else
										{
											// Nop
										}
									});
									
									socket.on("package-added-remotely", function (data) {
										if (data.groupId == pom.groupId && data.artifactId == pom.artifactId && data.version == pom.version) {
											socket.disconnect('unauthorized');
											exec("rm -rf " + tmpPath, function () {
													console.log("Deployment Completed.")
											});
										}
										else
										{
											// Nop
										}
									});
					
									socket.emit("remote-deployment", {
										pom: pom,
										file: "data:application/tar;base64," + base64data
									});
									

					
								});
				
							}
							exec(cmd, puts);
							
							
							

							
						}
					}
			
					var pathToSource = pom.sources[i].split("/");
					pathToSource.splice(pathToSource.length - 1, 1);
					pathToSource = pathToSource.join("/");

					exec("mkdir -p " + tmpPath + "/src/" + pathToSource + "; cp src/" + pom.sources[i] + " " + tmpPath + "/src/" + pom.sources[i] , puts);
				}
			}

			exec("cp ./pom.json " + tmpPath + "/pom.json" , aputs);
			
			
		}
		
		exec(mkdirCmd, puts);
		
		
	}
	
}



process.argv.forEach(function (input, position, dataasdf) {



	if (input == "deploy") {
	    var io = require('socket.io-client');
	
	     socket = io.connect("https://localhost", {port:3000, secure: true});
	 
	     socket.on('error', function () {
	         console.log("error", arguments);
	     });
	 
	     socket.on('connect', function () {
			 console.log("connect");
			 jdmActions.deploy();
	     });

	}

	if (input == "package") {
		jdmActions.package();
	}

	// console.log(process.argv);

	// node jdm.js create com.scottbyrns.ajax FileDownloader 1.0.0-SNAPSHOT name="File Downloader" description="Simple javascript file downloader."
	if (input == "create") {
		var group = process.argv[position + 1];
		var artifact = process.argv[position + 2];
		var version = process.argv[position + 3];
	
	
	
		var options = {};
	

		process.argv.forEach(function (val, index, array) {

			if (index < 4) {
				return;
			}

			var args = val.split("=");
			var key = args[0]
			var val = args[1]
		
			options[key] = val;

		});
	
	
	
		var pom = {
			name: options.name || "Package Name",
			description: options.description || "Package Description",
			groupId: group,
			artifactId: artifact,
			version: version,
			issueTracking: options.issueTracking || "",
			scm: options.scm || "",
			url: options.url || "",
			developers: [{
				name: "You"
			}],
			dependencies: [],
			sources: [artifact + ".js"]
		}
	
		fs.writeFile("pom.json", JSON.stringify(pom, null, 4), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
				exec("mkdir src", function () {
					fs.writeFile("src/" + artifact + ".js", group + "." + artifact + "." + artifact + " = function () {\n\n};\n\n\n" + group + "." + artifact + "." + artifact + ".prototype = {};", function(err) {
					    if(err) {
					        console.log(err);
					    } else {
							fs.writeFile("README.md", "#" + artifact + " - " + version + "\n" + group + "\n\n" + pom.description + "\n\n", function(err) {
							    if(err) {
							        console.log(err);
							    } else {
									console.log("Project Created");
							    }
							});
					    }
					});
				});
		    }
		});

		console.log(pom);
	
		// process.argv
	}


	
});






// fs.writeFile('client/repo/test/' + group + "/" + pom.artifactId + "/" + pom.version + "/pom.json", notification.data.data, function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("The file was saved!");
//     }
// });