// TODO unravel application manager. Should be DependencyManager.loadDependencies();
// TODO Obscure package manager.




//
// Manage file access.
//
FileManager = function () {
	
	
	
	return {
		//
		// Load a *.json file and pass it as a JSON
		// object to the provided callback.
		//
		loadJSON: function (path, callback) {
			// path = path;
		    var req = new XMLHttpRequest();
		    req.open('GET', path, false);
		    req.onreadystatechange = function(){
		        if (req.readyState == 4) {
					callback(JSON.parse(req.responseText));
		            // var s = document.createElement("script");
		            // s.appendChild(document.createTextNode(req.responseText));
		            // document.head.appendChild(s);
		        }
		    };
		    req.send(null);
			
		},
		
		
		//
		// Load the file at the provided path and
		// pass to the provided callback.
		//
		loadFile: function (path, callback) {
			
			path = "https://192.168.1.108:3000/" + path;
		
		    var req = new XMLHttpRequest();
		    req.open('GET', path, false);
		    req.onreadystatechange = function(callback){
				return function () {
			        if (req.readyState == 4) {
						callback((req.responseText));
			            // var s = document.createElement("script");
			            // s.appendChild(document.createTextNode(req.responseText));
			            // document.head.appendChild(s);
			        }
				};
		    }(callback);
		    req.send(null);


			
		}
		
	};
	
}();






/**
 //  	  Manage javascript packages in the web application.
 //       
 //        Package manager and installer modeled after the POM.xml project object model used
 //        in Maven for java project modeling. This is more or less a javascript/json implementation
 //        for developer management of javascript libraries and their dependencies.
 //       
 //        This is built to resolve an issue I have with the management of an ever growing
 //        collection of javascript libraries I have written over the last decade. They
 //        are all fairly small and straitforward and provide a simple self contained
 //        execution scope and leave the global namespace intact.
 //        This project aims to make these countless scripts easily consumeable in a reusable
 //        manner much the way Maven made package dependency management in Java a dream for
 //        obsessive encapsulators like my self.
 // 
**/    
var PackageManager = (function () {
	
	// Closure local packages cache.
	// Protected from external modification so that access can be managed for building runtime secure contexts of execution.
	var packages = [];
	
	// Closure local map of packages.
	var packagesMap = {};
	
	var repositoryMap = {};
	
	// Installer for packages.
	var Installer = {
		
		// TODO Fix the pass through and actually validate the POM
		validatePackage: function (packageObjectModel) {
			
			if (packageObjectModel instanceof Object)
			{
				return Installer.VALID;
			}
			
		},
		
		//
		// Configure the package for installation.
		//
		configureInstallation: function (packageObjectModel) {
			
			
			// Install the packages namespace into the global execution context.
			var packageDeploymentTarget = Installer.installNamespace({
		
				namespace: packageObjectModel.groupId,
				groupId: packageObjectModel.groupId,
				artifactId: packageObjectModel.artifactId
		
			});
	
	
			Installer.registerPackage({
		
				pom: packageObjectModel,
				deploymentTarget: packageDeploymentTarget
		
			});
			
			return Installer.SUCCESS;

			// // Assign the configurations roperties of the POM in the locally deployed instance.
			// // TODO support installation tasks as lifecycle managed anonymous functions.
			// config.packageDeploymentTarget.configuration = config.configuration;
			
			
		},
		
		// Install a packages namespace.
		installNamespace: function (config) {

				// Use the window object for our global namespace root.
				var packageNode = window;
		
				// Ensure we were provided a string namespace.
				if (typeof config.groupId === "string") {
			
			
					// Split our namespace string into fragments for creation.
					var namespaceFragments = config.groupId.split(".");
			
					// Loop over our namespace fragments until we have consumed the lot.
					while(namespaceFragments.length > 0) {
				
						// Get our next package fragment name
						var packageFragmentName = namespaceFragments.shift();
				
						// Assign an object literal to our package if not already there.
						packageNode[packageFragmentName] = packageNode[packageFragmentName] || {};
				
						// Reassign package node for next loop run.
						packageNode = packageNode[packageFragmentName];
				
					
					}
			
			
				}
				else
				{
			
			
					console.error("Package Manager installation requires a groupId that is a String.")
					return;
			
			
				}
		
				// Apply the artifactId to the package creation.
		
				if (typeof config.artifactId === "string") {
			
					// Assign the nodes artifact id if not already there.
					// TODO detect and error on artifact collisions.
					packageNode[config.artifactId] = packageNode[config.artifactId] || {};
			
			
				}
				else
				{
			
			
					console.error("Package Manager installation requires an artifactId that is a String.")
					return;
			
			
				}
		
		
				return packageNode;
		
			},
			
			
			
			//
			// Register the package with the package manager.
			// Creates a map reference and holds a reference to the object model and deployment target.
			//
		    registerPackage: function (config) {
				
				console.log("Register Package", config);
				
				// Add the object model to our packages cache.
				// This will be referenced during runtime.
				packages.push({
					packageObjectModel: config.pom,
					packageDeploymentTarget: config.deploymentTarget
				});
				

				// Add the package group id if not already there.
				packagesMap[config.pom.groupId] = packagesMap[config.pom.groupId] || {};
			
			
				// Add the package artifact if not already there.
				// TODO detect and error on artifact collisions.
				packagesMap[config.pom.groupId][config.pom.artifactId] = packagesMap[config.pom.groupId][config.pom.artifactId] || {
					deploymentTarget: config.deploymentTarget
				};
			
			
			
		    },
			
			
			
			
			
			
			performInstall: function (packageObjectModel) {
				
				
				console.log("Perform Install", packageObjectModel);
				
				
				
				for (var i = 0, len = packageObjectModel.dependencies.length; i < len; i += 1) {
					var dependency = packageObjectModel.dependencies[i];
					FileManager.loadJSON("https://192.168.1.108:3000/repo/packages/" + dependency.groupId.split(".").join("/") + "/" + dependency.artifactId + "/" + dependency.version + "/pom.json", function (json) {
						PackageManager.install(json, function () {
							console.log(arguments);
						})
					});

				}
				
				
				var rootPath = "repo/packages/" +  packageObjectModel.groupId.split(".").join("/") + "/" + packageObjectModel.artifactId + "/" + packageObjectModel.version + "/src/";
				
				
				
				for (var i = 0, len = packageObjectModel.sources.length; i < len; i += 1) {
					
					var packageNode = window;
					// Split our namespace string into fragments for creation.
					var namespaceFragments = packageObjectModel.groupId.split(".");
		
					// Loop over our namespace fragments until we have consumed the lot.
					while(namespaceFragments.length > 0) {
			
						// Reassign package node for next loop run.
						packageNode = packageNode[namespaceFragments.shift()];
			
				
					}
		
		
					// If we have a javascript file.
					if (packageObjectModel.sources[i].indexOf(".js") > -1) {
						
						
						// Package namespace path + file name
						packageNode[packageObjectModel.artifactId][packageObjectModel.sources[i].split(".js")[0]] = function (deploymentTarget, methodName) {
							console.log(deploymentTarget)
							return function (method) {
								deploymentTarget[methodName] = method;
								Installer.commitInstallation(deploymentTarget, methodName);
							};
							
						}(packageNode[packageObjectModel.artifactId], packageObjectModel.sources[i].split(".js")[0]);
						
						
						
						
					    var script = document.createElement("script");
					    
						script.setAttribute("src", "https://192.168.1.108:3000/" + rootPath + packageObjectModel.sources[i]);
						
						
					    document.body.appendChild(script);
						
						
					}
				
					else {
						
						FileManager.loadFile(
						
							rootPath + packageObjectModel.sources[i],
						
							function (packageNode, resourceName) {
								return function (data) {
									console.log(packageNode);
									packageNode[resourceName] = data;
								};
							}(packageNode[packageObjectModel.artifactId], packageObjectModel.sources[i])
						
						);
					}
				
					
				}
				
				
				
			},
			
			
			
			
			
			
			commitInstallation: function (deploymentTarget, methodName) {
				var method = deploymentTarget[methodName];
				var out = method.constructor;
				out.prototype = method.prototype;
				
				method.setup("TODO Pass references to installation.");
				
				deploymentTarget[methodName] = out;
			},
			
			rollbackInstallation: function () {
				
			},
			// General Status Codes
			SUCCESS: 1001,
			
			// Validation Status Codes
			VALID: 2001,
			

	}
	
	
	return {
		
		
		loadRepository: function (repo) {
			
			// Callback for when the repository has been loaded.
			function success () {
				FileManager.loadJSON("pom.json", PackageManager.start);
			}
			
			console.log(repo);
			
			
			
			// Shorter reference to the packages.
			var dependencies = repo.packages;
			
			repositoryMap.src = repo;
			repositoryMap.packages = {};			
			repositoryMap.index = {
				artifacts:{},
				versions:{}
			};
			// Itterate over the packages.
			for (var i = 0, len = packages.length; i < len; i += 1) {
					
				repositoryMap.packages[packages[i].groupId] = repositoryMap.packages[packages[i].groupId] || {
					artifact: {
						artifactId: packages[i].artifactId,
						versions: packages[i].versions
					}
				};
				
				// TODO index versions and artifacts...
				
					
			}
			console.log(repositoryMap);
			success();
		},
		
		start: function (pom) {
			console.log(pom)
			var dependencyLoadCallback = function (count, pom) {
				
				// Locally store the count limit.
				var dependencyCount = count;
				// Locally store the loaded count for the anonymous counter function below.
				var loadedCount = 0;
				
				// Return a success counter anonymous callback.
				return function (success) {
					console.log(dependencyCount)
					// Count our loaded count up and check if it is our last dependency.
					if (++loadedCount >= dependencyCount) {

						setTimeout(function (pom) {
							return function () {
														ApplicationManager.doStart();
						
			
														var packageObjectModel = pom;
			
														for (var i = 0, len = packageObjectModel.sources.length; i < len; i += 1) {
				

															// If we have a javascript file.
															if (packageObjectModel.sources[i].indexOf(".js") > -1) {
					
					
																// // Package namespace path + file name
																// packageNode[packageObjectModel.artifactId][packageObjectModel.sources[i].split(".js")[0]] = function (deploymentTarget, methodName) {
																// 	console.log(deploymentTarget)
																// 	return function (method) {
																// 		deploymentTarget[methodName] = method;
																// 		Installer.commitInstallation(deploymentTarget, methodName);
																// 	};
																// 	
																// }(packageNode[packageObjectModel.artifactId], packageObjectModel.sources[i].split(".js")[0]);
																// 
																// 
																// 
																// 
															    var script = document.createElement("script");
				    
																script.setAttribute("src", packageObjectModel.sources[i]);
					
					
															    document.body.appendChild(script);
					
					
															}
			
															else {
					
																// FileManager.loadFile(
																// 
																// 	packageObjectModel.sources[i],
																// 
																// 	function (packageNode, resourceName) {
																// 		return function (data) {
																// 			console.log(packageNode);
																// 			packageNode[resourceName] = data;
																// 		};
																// 	}(packageNode[packageObjectModel.artifactId], packageObjectModel.sources[i])
																// 
																// );
															}
														}
													}
						}(pom), 20);
						
						console.log('asdfdostart')

						
						
						
						
						
					}
					// if (!success) {
					// 	console.error("Failed to start application.");
					// }
				};
				
			}(pom.dependencies.length, pom);
			
			
			
			// Shorter reference to the dependencies.
			var dependencies = pom.dependencies;
			
			
			
			// Itterate over the dependencies.
			for (var i = 0, len = dependencies.length; i < len; i += 1) {
				
				
				FileManager.loadJSON(
					
					//
					// Construct the repository path.
					// repo/packages/groupId/artifactId/version/pom.xml
					//
					"https://192.168.1.108:3000/repo/packages/" + dependencies[i].groupId.split(".").join("/") + "/" + dependencies[i].artifactId + "/" + dependencies[i].version + "/pom.json",
					
					
					//
					// Constructing an anonyous callback that has a dependencyLoadCallback
					// reference held in the execution scope of our callback.
					//
					function (dependencyLoadCallback) {
					
						var dependencyLoadCallback2 = dependencyLoadCallback;
					
						// Call back to the package managers install.
						return function (JSON) {
							PackageManager.install(JSON, dependencyLoadCallback2);
						}
					}(dependencyLoadCallback)
				);
				

				
			}
			
			
			
		},
		
		// [X] Create our namespace for the installation of our package.
		// [X] Register Package Installation
		// [/] Configure Package Installation
		// [ ] Download the package artifact
		// [ ] Download Dependencies (recursive for children)
		// [ ] Install Dependencies
		// [ ] Install Package
		install: function (packageObjectModel, callback) {
			// console.log(packageObjectModel);
			if (Installer.validatePackage(packageObjectModel) === Installer.VALID) {
				

				if (Installer.configureInstallation(packageObjectModel) === Installer.SUCCESS) {
					

						
				
					if (Installer.performInstall(packageObjectModel) === Installer.SUCCESS) {
						
						
						Installer.commitInstallation();
						callback();
						
						
					}
					else {
						
						
						Installer.rollbackInstallation();
						
						
					}
					
					callback();


					//
					//	 Installer.fetchDependencies()
					//	 Installer.installDependencies()
					//	 Installer.commitInstallation();
					//	 Installer.rollbackInstallation();
					//				
				
				
				}
					
					
				}
			

		},
		
		getRepositoryMap: function () {
			return repositoryMap;
		}
	};
	
}());






//
// Interface for managing the Application's lifecycle.
//
ApplicationManager = function () {
	
	// Private resources used by public methods in this manager.
	var resources = {};
	
	
	
	
	return {
		
		
		//
		// Register a callback for when the package manager has loaded all required dependencies.
		//
		setup: function (callback) {
			
			
			resources.setup = callback;
			
			
		},
		
		
		
		//
		// Register a callback for when the application is ready to start.
		//
		whenApplicationIsReadyToStart: function (callback) {
			
			
			resources.whenApplicationIsReadyToStart = callback;
			
		},
		
		
		
		
		
		// TODO
		// whenApplicationHasStarted: function () {},
		// whenApplicaitonShouldReportHealth: function () {},
		// whenApplicationHasFinished: function () {}
		
		
		
		
		
		//
		// Start the application.
		//
		start: function () {
			
			
			// FileManager.loadJSON("pom.json", PackageManager.start);
			FileManager.loadJSON("https://192.168.1.108:3000/repo/repo.json", PackageManager.loadRepository);
			
		},
		
		doStart: function () {
			// resources.setup.call(window);
			// resources.whenApplicationIsReadyToStart.call(window);
		}
		
	};
}();

setTimeout(ApplicationManager.start, 10);
setTimeout(ApplicationManager.start, 800);
