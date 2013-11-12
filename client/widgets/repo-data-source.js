


LiveWidgets.addWidget({
        name: 'repo-data-source',
        model: {
			// repoList: {},
			artifacts: []
        },
        controller: {
                // dispatchMessageToGroupedWidgets: function (event) {
                //         event.stopPropagation();
                //         this.sendMessage(this.model.message, this.model.channel);
                // }
				handleMessage: function (message) {
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
	
							FileManager.loadJSON(
	
								//
								// Construct the repository path.
								// repo/packages/groupId/artifactId/version/pom.xml
								//
								"https://localhost:3000/repo/packages/" + this.model.repoList[i].groupId.split(".").join("/") + "/" + this.model.repoList[i].artifactId + "/" + this.model.repoList[i].versions[(-1) + this.model.repoList[i].versions.length] + "/pom.json",
	
	
								//
								// Constructing an anonyous callback that has a dependencyLoadCallback
								// reference held in the execution scope of our callback.
								//
	
								// Call back to the package managers install.
								function (json) {
									// console.log("new artifact");
									this.model.artifacts.push(json);
									this.sendMessage(json, "artifact-loaded");
								}.bind(this)
					
							);
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
