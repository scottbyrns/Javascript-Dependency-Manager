


LiveWidgets.addWidget({
        name: 'repo-data-source',
        model: {
			artifacts: []
        },
        controller: {
				handleMessage: function (message, channel) {
					console.log("repo-data-source", arguments);
					
					if (channel == "get-version") {
						console.log("Get Version", message);
						console.log(this.model);
						for (var i = 0, len = this.model.artifacts.length; i < len; i += 1) {
							
							var artifact = this.model.artifacts[i];
							
							if (artifact.groupId == message.artifact.groupId &&
								artifact.artifactId == message.artifact.artifactId &&
								artifact.version == message.version)
								{
									this.sendMessage(artifact, "show-version");
									i = len;
								}
							
						}

					}
					
					
					if (channel == "fetch-version") {
						for (var i = 0, len = this.model.artifacts.length; i < len; i += 1) {
							
							var artifact = this.model.artifacts[i];
							
							if (artifact.groupId == message.groupId &&
								artifact.artifactId == message.artifactId &&
								artifact.version == message.version)
								{
									try {
										message.callback(artifact);
									}
									catch (e)
									{
										console.error(e);
									}
									// this.sendMessage(artifact, "show-version");
									i = len;
								}
							
						}

					}
					
					
					if (message === "get-artifact-data") {
						try {

							channel.callback.call(channel.context, this.model.artifacts);
						}
						catch (e)
						{
							console.error(e);
						}
					}
					if (message == "download-repo-data")
					{
						console.log("repo data source");
						this.model.repoList = PackageManager.getRepositoryMap().src.packages;

						// var navigationList = new com.scottbyrns.Elements.List.DynamicList(this.element);

						for (var i = 0, len = this.model.repoList.length; i < len; i += 1) {
	
							// var artifactJSON = PackageManager.getArtifact(repoList[i].groupId, repoList[i].artifactId);
	
	
							// var listItem = com.scottbyrns.Elements.List.ListItem.createListItem(
							// 	""
							// 	// "<textarea>\n{\n     groupId: " + repoList[i].groupId +
							// 	// ",\n     artifactId: " + repoList[i].artifactId +
							// 	// ",\n     versions: " + JSON.stringify(repoList[i].versions) +
							// 	// "\n}\n</textarea>"
							// 		
							// );
							// 	
							// 	
							// navigationList.addListItem(
							// 	listItem
							// );
	
							// console.log(listItem);
	
							for (var j = 0, jlen = this.model.repoList[i].versions.length; j < jlen; j+= 1)
							{
	
								if (j == jlen - 1) {
	
									FileManager.loadJSON(
	
										"https://" + (this.model.server) + "/repo/packages/" + this.model.repoList[i].groupId.split(".").join("/") + "/" + this.model.repoList[i].artifactId + "/" + this.model.repoList[i].versions[j] + "/pom.json",
										// Call back to the package managers install.
										function (versions) {
											return function (json) {
												// console.log("new artifact");
												json.versions = versions;
												this.model.artifacts.push(json);
												this.sendMessage(json, "artifact-loaded");
											}.bind(this)
										}.bind(this)(this.model.repoList[i].versions)
					
									);	
								}
								else
								{
	
									FileManager.loadJSON(
	
										//
										// Construct the repository path.
										// repo/packages/groupId/artifactId/version/pom.xml
										//
										"https://" + (this.model.server) + "/repo/packages/" + this.model.repoList[i].groupId.split(".").join("/") + "/" + this.model.repoList[i].artifactId + "/" + this.model.repoList[i].versions[j] + "/pom.json",
	
	
										//
										// Constructing an anonyous callback that has a dependencyLoadCallback
										// reference held in the execution scope of our callback.
										//
								
										// Call back to the package managers install.
										function (versions) {
											return function (json) {
												// console.log("new artifact");
												json.versions = versions;
												this.model.artifacts.push(json);
												// this.sendMessage(json, "artifact-loaded");
											}.bind(this)
										}.bind(this)(this.model.repoList[i].versions)
					
									);	
									
								}
	
							}

						}
					}
					
					console.log("repo data source", arguments);
				}
        },
		constructor: function () {

		},
        reinit: function () {
                // this.element.removeEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets);
                // this.element.addEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets, true);
        }
});
