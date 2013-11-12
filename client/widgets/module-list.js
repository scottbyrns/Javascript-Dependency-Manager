


LiveWidgets.addWidget({
        name: 'module-list',
        model: {

        },
        controller: {
                // dispatchMessageToGroupedWidgets: function (event) {
                //         event.stopPropagation();
                //         this.sendMessage(this.model.message, this.model.channel);
                // }
				handleMessage: function () {
					console.log(arguments);
				}
        },
		constructor: function () {

			var repoList = PackageManager.getRepositoryMap().src.packages;


			var navigationList = new com.scottbyrns.Elements.List.DynamicList(this.element);

			for (var i = 0, len = repoList.length; i < len; i += 1) {
	
				// var artifactJSON = PackageManager.getArtifact(repoList[i].groupId, repoList[i].artifactId);
	
	
				var listItem = com.scottbyrns.Elements.List.ListItem.createListItem(
					""
					// "<textarea>\n{\n     groupId: " + repoList[i].groupId +
					// ",\n     artifactId: " + repoList[i].artifactId +
					// ",\n     versions: " + JSON.stringify(repoList[i].versions) +
					// "\n}\n</textarea>"
		
				);
	
	
				navigationList.addListItem(
					listItem
				);
	
				console.log(listItem);
	
				FileManager.loadJSON(
	
					//
					// Construct the repository path.
					// repo/packages/groupId/artifactId/version/pom.xml
					//
					"https://localhost:3000/repo/packages/" + repoList[i].groupId.split(".").join("/") + "/" + repoList[i].artifactId + "/" + repoList[i].versions[(-1) + repoList[i].versions.length] + "/pom.json",
	
	
					//
					// Constructing an anonyous callback that has a dependencyLoadCallback
					// reference held in the execution scope of our callback.
					//
					function (listItem) {
	
						var listItem2 = listItem;
	
						// Call back to the package managers install.
						return function (json) {
							 // + JSON.stringify(json)

							var artifact = [
							
							"<div ",
							'data-widget="drag-data" ',
							'draggable="true"' ,
							'data-data="' + encodeURIComponent(JSON.stringify(json)) + '"',
							">",
								"<h5>" + json.name + "</h5>",
								
								"<p>" + json.description + "</p>",
								
								"<span>" + json.version + "</span>",
								
								"</div>"
								
							].join("\n");
				
							listItem2.element.setAttribute("data-widget", "event-trigger");
							listItem2.element.setAttribute("data-event", "click");
							listItem2.element.setAttribute("data-group", "artifact|repository-control");
							listItem2.element.setAttribute("data-channel", "show-artifact");
							listItem2.element.setAttribute("data-message", encodeURIComponent(JSON.stringify(json)));
							
							listItem2.element.innerHTML = artifact;// + "\n" + listItem2.element.innerHTML;
						}
					}(listItem)
				);
			}
		},
        reinit: function () {
                // this.element.removeEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets);
                // this.element.addEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets, true);
        }
});
