


LiveWidgets.addWidget({
        name: 'module-list',
        model: {

        },
        controller: {

				handleMessage: function (message, channel) {
					console.log("artifact-loaded", arguments);
					
					if (channel == "artifact-loaded") {
						var listItem = com.scottbyrns.Elements.List.ListItem.createListItem(
							""
							// "<textarea>\n{\n     groupId: " + repoList[i].groupId +
							// ",\n     artifactId: " + repoList[i].artifactId +
							// ",\n     versions: " + JSON.stringify(repoList[i].versions) +
							// "\n}\n</textarea>"
		
						);
	
	
						this.model.navigationList.addListItem(
							listItem
						);
						

						var artifact = [
						
						"<div ",
						'data-widget="drag-data" ',
						'draggable="true"' ,
						'data-data="' + encodeURIComponent(JSON.stringify(message)) + '"',
						">",
							"<h5>" + message.name + "</h5>",
							
							"<p>" + message.description + "</p>",
							
							"<span>" + message.version + "</span>",
							
							"</div>"
							
						].join("\n");
			
						listItem.element.setAttribute("data-widget", "event-trigger");
						listItem.element.setAttribute("data-event", "click");
						listItem.element.setAttribute("data-group", "artifact|repository-control");
						listItem.element.setAttribute("data-channel", "show-artifact");
						listItem.element.setAttribute("data-message", encodeURIComponent(JSON.stringify(message)));

						listItem.element.innerHTML = artifact;// + "\n" + listItem2.element.innerHTML;
					}
				}
        },
		constructor: function () {

			var repoList = PackageManager.getRepositoryMap().src.packages;
			this.model.navigationList = new com.scottbyrns.Elements.List.DynamicList(this.element);

		},
        reinit: function () {
			this.sendMessage("download-repo-data");
        }
});
