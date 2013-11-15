LiveWidgets.addWidget({
        name: 'jdm-package-builder',
        model: {
			
			
			name: "",
			description: "",
			
			
			groupId:"",
			artifactId: "",
			version: "",
			
			author:"",
			homepageUrl: "",
			
			versionControl: "",
			issueTrackerUrl: "",
			
			dependencies: [],
			
			sources: [],
			

        },
        controller: {
                // dispatchMessageToGroupedWidgets: function (event) {
                //         event.stopPropagation();
                //         this.sendMessage(this.model.message, this.model.channel);
                // }
				
				validateDataSet: function () {
					console.log(
						this.model.name === "",
						this.model.description === "",
						this.model.groupId === "",
						this.model.artifactId === "",
						this.model.version === "",
						this.model.author === "",
						this.model.sources.length == 0);
					if (
						this.model.name === "" &&
						this.model.description === "" &&
						this.model.groupId === "" &&
						this.model.artifactId === "" &&
						this.model.version === "" &&
						this.model.author === "" &&
						this.model.sources.length == 0
					
					) {
						console.log("wtf")
						return false;
					}
						console.log("no-wtf")					
					return true;
				},
				
				saveDataToServer: function () {
					// console.log(this.model.dependencies);
					// console.log(this.model.sources);
					var package = {
	
						"name": this.model.name,
						"description": this.model.description,
						
						"icon": this.model.icon || "",
	
						"groupId": this.model.groupId,
						"artifactId": this.model.artifactId,
						"version": this.model.version,
						
						
						"url": this.model.homepageUrl,
			
						"scm": this.model.versionControl,
						"issueTracking": this.model.issueTrackerUrl,
	
						"developers": [
							{
								"name":this.model.author
							}
						],
	
						"dependencies": (this.model.dependencies),
						"sources": (this.model.sources),
						"configuration": {
		
						}
	
					};
					
					// console.log("Save Data", package);
					
					if (this.model.editMode) {
						socket.emit("update-package", {data:JSON.stringify(package)});
					}
					else
					{
						socket.emit("save-package", {data:JSON.stringify(package)});
					}
				},
				
				handleMessage: function (data, channel) {
					// console.log("jdm-package-builders", arguments);
				
					if (channel == "edit-artifact") {
						
						this.model.editMode = true;
						
						document.getElementsByName("group-id", this.element)[0].setAttribute("value", data.groupId);
						document.getElementsByName("artifact-id", this.element)[0].setAttribute("value", data.artifactId);
						document.getElementsByName("artifact-version", this.element)[0].setAttribute("value", data.version);
						
						
						document.getElementsByName("group-id", this.element)[0].setAttribute("disabled", "disabled");
						document.getElementsByName("artifact-id", this.element)[0].setAttribute("disabled", "disabled");
						document.getElementsByName("artifact-version", this.element)[0].setAttribute("disabled", "disabled");
						
						document.getElementById("source-dropzone").style.display="none";
						
						
						
						document.getElementsByName("package-description", this.element)[0].innerHTML = data.description;
						document.getElementsByName("package-name", this.element)[0].setAttribute("value", data.name);
						document.getElementsByName("author-name", this.element)[0].setAttribute("value", data.developers[0].name);
						document.getElementsByName("homepage-url", this.element)[0].setAttribute("value", data.url);
						document.getElementsByName("version-control", this.element)[0].setAttribute("value", data.scm);
						document.getElementsByName("issue-tracker-url", this.element)[0].setAttribute("value", data.issueTracking);
						
						this.model.dependencies = [];
						
						for (var i = 0, len = data.dependencies.length; i < len; i += 1) {
							
							this.model.dependencies.push({
								groupId: data.dependencies[i].groupId,
								artifactId: data.dependencies[i].artifactId,
								version: data.dependencies[i].version
							});
							
						}
						
						this.controller.drawDependencies();
						
						// alert(JSON.stringify(data.sources))
						document.getElementById("add-sources").innerHTML = "";
						for (var i = 0, len = data.sources.length; i < len; i += 1) {
							var itemCell = new com.scottbyrns.Elements.Table.Cell();
							itemCell.setValue(data.sources[i]);

							var sourceRow = new com.scottbyrns.Elements.Table.Row();
							sourceRow.addCell(itemCell.element);
						
							document.getElementById("source-dropzone").style.opacity="0.25"
						
							// console.log(sourceRow);
							document.getElementById("add-sources").appendChild(sourceRow.element)
							
						}
						
						this.model.sources = data.sources;
						

						this.controller.handleMessage("package-name");
						this.controller.handleMessage("package-description");
						this.controller.handleMessage("group-id");
						this.controller.handleMessage("artifact-id");
						this.controller.handleMessage("artifact-version");
						this.controller.handleMessage("author-name");
						this.controller.handleMessage("homepage-url");
						this.controller.handleMessage("version-control");
						this.controller.handleMessage("issue-tracker-url");

						
						
						
						// document.getElementsByName("package-name", this.element)[0].setAttribute("value", data.name);
						// document.getElementsByName("package-name", this.element)[0].setAttribute("value", data.name);
						
					}
					else {
						
						
						
					}
					
					
					
					
					if (channel == "remove-dependency-overview") {

						
						for (var i = 0, len = this.model.dependencies.length; i < len; i += 1) {
							if (this.model.dependencies[i].groupId == data.groupId &&
								this.model.dependencies[i].artifactId == data.artifactId &&
								this.model.dependencies[i].version == data.version) {


									this.model.dependencies.splice(i, 1);
									i = len;
									this.controller.drawDependencies();
								}
						}
					}
				

					if (data === "save") {
						// console.log("save", this.controller.validateDataSet())
						if (
							this.model.name === "" ||
							this.model.description === "" ||
							this.model.groupId === "" ||
							this.model.artifactId === "" ||
							this.model.version === "" ||
							this.model.author === "" ||
							this.model.sources.length == 0
					
						) {
							alert("Please provide all required fields.");
						}
						else
						{
							this.controller.saveDataToServer();
						}
						
					}
					


					if (data === "drag-over") {
						// console.log(arguments);
						// document.getElementById("dependencies").class += " drag-over";
					}


					if (data === "package-name") {
	
						this.model.name = document.getElementsByName("package-name", this.element)[0].value;
	
						if (this.model.name != "") {
							document.getElementsByName("package-name", this.element)[0].setAttribute("class", "filled");
						}
	
					}

					if (data === "package-description") {
	
						this.model.description = document.getElementsByName("package-description", this.element)[0].value;
	
						if (this.model.description != "") {
							document.getElementsByName("package-description", this.element)[0].setAttribute("class", "filled");
						}
	
					}

					if (data === "group-id") {
						
						this.model.groupId = document.getElementsByName("group-id", this.element)[0].value;
						
						if (this.model.groupId != "") {
							document.getElementsByName("group-id", this.element)[0].setAttribute("class", "filled");
						}
						
					}
					
					if (data === "artifact-id") {
						
						this.model.artifactId = document.getElementsByName("artifact-id", this.element)[0].value;
						
						if (this.model.artifactId != "") {
							document.getElementsByName("artifact-id", this.element)[0].setAttribute("class", "filled");
						}
						
					}
					
					if (data === "artifact-version") {
						
						this.model.version = document.getElementsByName("artifact-version", this.element)[0].value;
						
						if (this.model.version != "") {
							document.getElementsByName("artifact-version", this.element)[0].setAttribute("class", "filled");
						}
						
					}

					if (data === "author-name") {
						
						this.model.author = document.getElementsByName("author-name", this.element)[0].value;
						
						if (this.model.artifactId != "") {
							document.getElementsByName("author-name", this.element)[0].setAttribute("class", "filled");
						}
						
					}

					if (data === "homepage-url") {
						
						this.model.homepageUrl = document.getElementsByName("homepage-url", this.element)[0].value;
						
						if (this.model.homepageUrl != "") {
							document.getElementsByName("homepage-url", this.element)[0].setAttribute("class", "filled");							
						}

						
					}
					
					if (data === "version-control") {
						
						this.model.versionControl = document.getElementsByName("version-control", this.element)[0].value;

						if (this.model.versionControl != "") {
							document.getElementsByName("version-control", this.element)[0].setAttribute("class", "filled");
						}
						
					}
					
					if (data === "issue-tracker-url") {
						
						this.model.issueTrackerUrl = document.getElementsByName("issue-tracker-url", this.element)[0].value;
						
						if (this.model.issueTrackerUrl != "") {
							document.getElementsByName("issue-tracker-url", this.element)[0].setAttribute("class", "filled");
						}
						
					}

					
					
					if (channel == "icon-dropzone") {
						
					    var reader = new FileReader();
					    reader.onload = function (event) {
							this.model.icon = event.target.result;
							document.getElementById("artifact-icon").style.backgroundImage = "url(" + event.target.result + ")";
							
						// 					      var image = new Image();
						// 					      image.src = event.target.result;
						// 					      image.width = 128; // a fake resize
						// document.getElementById("artifact-icon").appendChild(image);
						// 					      // holder.appendChild(image);
					    }.bind(this);

					    reader.readAsDataURL(data.file);
						
						// // console.log("icon drop");
						// 				        var image = new Image();
						// 				        image.src = data.data;
						// 				        image.width = 128; // a fake resize
						// document.getElementById("artifact-icon").appendChild(image);
					}
					
					if (channel == "dropped-file") {
						
						
						

						
						
						
						if (data.file.name == "pom.json") {
							
							data.data = JSON.parse(data.data);
							
							document.getElementsByName("package-name", this.element)[0].setAttribute("value", data.data.name);
							document.getElementsByName("package-description", this.element)[0].innerHTML = data.data.description;
							document.getElementsByName("group-id", this.element)[0].setAttribute("value", data.data.groupId);
							document.getElementsByName("artifact-id", this.element)[0].setAttribute("value", data.data.artifactId);
							document.getElementsByName("artifact-version", this.element)[0].setAttribute("value", data.data.version);
							document.getElementsByName("author-name", this.element)[0].setAttribute("value", data.data.developers[0].name);
							document.getElementsByName("homepage-url", this.element)[0].setAttribute("value", data.data.url);							
							document.getElementsByName("version-control", this.element)[0].setAttribute("value", data.data.scm);
							document.getElementsByName("issue-tracker-url", this.element)[0].setAttribute("value", data.data.issueTracking);
					
					
							
						}
						else
						{
						
						
							this.model.sources.push(data);
						
							var itemCell = new com.scottbyrns.Elements.Table.Cell();
							itemCell.setValue(data.file.name);

							var sourceRow = new com.scottbyrns.Elements.Table.Row();
							sourceRow.addCell(itemCell.element);
						
							document.getElementById("source-dropzone").style.opacity="0.25"
						
							console.log(sourceRow);
							document.getElementById("add-sources").appendChild(sourceRow.element)
						
							
						}

						
					}
					if (data != "create-package" && channel != "show-artifact")
					{
					
						// var html = [
						// '<div data-widget="code-editor" data-group="editor">',
						// 	data,
						// '</div>',
						// ].join("");
						// 					
						// this.element.innerHTML = html;
						// 					
						// socket.emit("file-test", {"data":data});
						
					}
					else
					{
						
						
						
						// var html = [
						// 	
						// ].join("");
						// 					
						// this.element.innerHTML = html;
						
						
					}
					
					// document.getElementById("debug-out").innerHTML = JSON.stringify(this.model);
				},
				drawDependencies: function () {
					
					var dependencies = [];
					
					if (dependencies.length == this.model.dependencies) {
						document.getElementById("dependency-list").innerHTML = this.model.defaultContent;
						return;
					}
					
					
					dependencies.push('<div class="dependencies">');
					// dependencies.push('<tr><th>Group</th><th>Artifact</th><th>Version</th></tr>');

					
					for (var i = 0, len = this.model.dependencies.length; i < len; i += 1) {
						var direction = (i%2 == 0 ? "left" : "right");
						var dependency = this.model.dependencies[i];
						console.log(dependency);
						dependencies.push([
							'<span class="item ' + direction + '" data-widget="dependency-overview" data-removeable="true" data-outlets="',
							"jdm-package-builder-dependencies",
							'" data-group="repo-data-source" data-artifact="',
							encodeURIComponent(JSON.stringify(dependency)),
							'">',
							'<div class="item-wrapper">',
							'<div class="artifact-icon"></div>',
							
							'<h6>',
							'Fetching...',
							'</h6>',
							
							'</div>',
							'</span>'

						
							].join(''));
					}
					
					dependencies.push('</div>');
					document.getElementById("dependency-list").innerHTML = dependencies.join("");
					

					
				},
				handleDrop: function (event) {
					// console.log(decodeURI(event.dataTransfer.getData("Text")));
					// console.log("handle drop", arguments);
					console.log(event.dataTransfer.getData('application/json'));
					var data = JSON.parse(event.dataTransfer.getData('application/json'));
					
					for (var i = 0, len = this.model.dependencies.length; i < len; i += 1) {
						if (this.model.dependencies[i].groupId == data.groupId) {
							if (this.model.dependencies[i].artifactId == data.artifactId) {
								return;
							}
						}
					}
					
					
					this.model.dependencies.push(data);
					
					this.controller.drawDependencies();

					
				},
				dragover: function (e) {
					e.preventDefault();
				}
				
        },
		constructor: function () {
			this.model.editMode = false;
			document.getElementById("dependencies-dropzone").removeEventListener("drop", this.controller.handleDrop);
			document.getElementById("dependencies-dropzone").addEventListener("drop", this.controller.handleDrop, true);
			
			document.getElementById("dependencies-dropzone").removeEventListener("dragover", this.controller.dragover);
			document.getElementById("dependencies-dropzone").addEventListener("dragover", this.controller.dragover, true);
			
			this.model.defaultContent = document.getElementById("dependency-list").innerHTML;
		},
        reinit: function () {

        }
});
