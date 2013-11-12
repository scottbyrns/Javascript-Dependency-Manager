


LiveWidgets.addWidget({
        name: 'module-list',
        model: {

        },
        controller: {
			
			fuzzy_match: function(str,pattern){
				return (str.indexOf(pattern) > -1);
			},
			
			searchActivity: function () {
				console.log('activity');
				this.controller.search(document.getElementById("search", this.element).value);
			},
			
			search: function (term) {
				console.log("search");
				if (this.model.artifactData === undefined)
				{
					this.sendMessage("get-artifact-data", {
						context:this,
						callback: function (term) {
						return function (data) {
								console.info("Fetching Artifact Data.");
								this.model.artifactData = data;
								this.controller.search(term);
							}.bind(this)
						}.bind(this)(term)
					});
				}
				else
				{

					console.log(term);
					for (var i = 0, len = this.model.artifactData.length; i < len; i += 1)
					{

						var artifact = this.model.artifactData[i];
						
						// (artifact.groupId.indexOf(term) > -1)

						if (
							(artifact.groupId.toLowerCase().indexOf(term) > -1)      ||
							(artifact.artifactId.toLowerCase().indexOf(term) > -1)   ||
							(artifact.version.toLowerCase().indexOf(term) > -1)      ||
							// (artifact.description.toLowerCase().indexOf(term) > -1)  ||
							(artifact.name.toLowerCase().indexOf(term) > -1)		   			
						) {
							
							
							document.getElementById(artifact.groupId + artifact.artifactId + artifact.version).style.display = "block";
							
							
						}
						else
						{
							document.getElementById(artifact.groupId + artifact.artifactId + artifact.version).style.display = "none";
						}

					}
				}
			},

				handleMessage: function (message, channel) {
					console.log("artifact-loaded", arguments);

					if (channel == "artifact-loaded") {

						var listItem = com.scottbyrns.Elements.List.ListItem.createListItem("");
	
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
						listItem.element.setAttribute("id", message.groupId + message.artifactId + message.version);

						listItem.element.innerHTML = artifact;// + "\n" + listItem2.element.innerHTML;
					}
					
					// if (message == "get-artifact-data") {
					// 	try {
					// 		channel(this.model.artifacts);
					// 	}
					// 	catch (e)
					// 	{
					// 		console.error(e);
					// 	}
					// }
				}
        },
		constructor: function () {

			var repoList = PackageManager.getRepositoryMap().src.packages;
			this.model.navigationList = new com.scottbyrns.Elements.List.DynamicList(this.element);



		},
        reinit: function () {
			
		
            document.getElementById("search", this.element).removeEventListener(
				
				"keyup",
				this.controller.searchActivity.bind(this)
				
			);
			
			
            document.getElementById("search", this.element).addEventListener(
				
				"keyup",
				this.controller.searchActivity.bind(this),
				true
			
			);

            document.getElementById("search", this.element).removeEventListener(
				
				"search",
				this.controller.searchActivity.bind(this)
				
			);
			
			
            document.getElementById("search", this.element).addEventListener(
				
				"search",
				this.controller.searchActivity.bind(this),
				true
			
			);	
			
            document.getElementById("search", this.element).focus();
		
			setTimeout(function () {
				this.sendMessage("download-repo-data");
				this.sendMessage("get-artifact-data", {
					context:this,
					callback: function (term) {
					return function (data) {
							this.model.artifactData = data;
						}.bind(this)
					}.bind(this)("nop")
				});
			}.bind(this), 80);
        }
});
