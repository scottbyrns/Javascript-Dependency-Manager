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
					console.log(this.model.dependencies);
					console.log(this.model.sources);
					var package = {
	
						"name": this.model.name,
						"description": this.model.description,
	
						"groupId": this.model.groupId,
						"artifactId": this.model.artifactId,
						"version": this.model.version,
	
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
					
					console.log("Save Data", package);
					
					socket.emit("save-package", {data:JSON.stringify(package)});
				},
				
				handleMessage: function (data, channel) {
					// console.log("jdm-package-builders", arguments);

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
						
						
						
						// var cell = document.getElementsByName("issue-tracker-url", this.element)[0].parentNode;
						// cell.innerHTML = this.model.issueTrackerUrl;
						
					}

					
					
					if (channel == "icon-dropzone") {
						
					    var reader = new FileReader();
					    reader.onload = function (event) {
					      var image = new Image();
					      image.src = event.target.result;
					      image.width = 128; // a fake resize
						document.getElementById("artifact-icon").appendChild(image);
					      // holder.appendChild(image);
					    }.bind(this);

					    reader.readAsDataURL(data.file);
						
						// // console.log("icon drop");
						// 				        var image = new Image();
						// 				        image.src = data.data;
						// 				        image.width = 128; // a fake resize
						// document.getElementById("artifact-icon").appendChild(image);
					}
					
					if (channel == "dropped-file") {
						this.model.sources.push(data);
						console.log(data.file.name);
						
						var itemCell = new com.scottbyrns.Elements.Table.Cell();
						itemCell.setValue(data.file.name);

						var sourceRow = new com.scottbyrns.Elements.Table.Row();
						sourceRow.addCell(itemCell.element);
						
						document.getElementById("source-dropzone").style.opacity="0.25"
						
						console.log(sourceRow);
						document.getElementById("add-sources").appendChild(sourceRow.element)
						// new com.scottbyrns.Elements.Table.Table().addRow();

						// console.log(this.table);
						// this.element.getElementById("add-sources").append("")
						// console.log(data);
						
						// var html = [
						// // '<div data-widget="code-editor" data-group="editor">',
						// 	data,
						// // '</div>',
						// ].join("");
					
						// this.element.innerHTML = html;
					
						// socket.emit("file-test", {"data":data});
						
						
						
						
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
					
					document.getElementById("debug-out").innerHTML = JSON.stringify(this.model);
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
					
					
					
					
					var tr = new com.scottbyrns.Elements.Table.Row();
					
					
					var groupCell = document.createElement("td");
					groupCell.innerHTML = (data.groupId);
					
					var artifactCell = document.createElement("td");
					artifactCell.innerHTML = (data.artifactId);
					
					var versionCell = document.createElement("td");
					versionCell.innerHTML = (data.version);
					

					document.getElementById("dependency-list").appendChild(tr.element);
					

					tr.element.appendChild(groupCell);
					tr.element.appendChild(artifactCell);
					tr.element.appendChild(versionCell);
					
					


					
				},
				dragover: function (e) {
					e.preventDefault();
				}
				
        },
		constructor: function () {
			document.getElementById("dependencies-dropzone").removeEventListener("drop", this.controller.handleDrop);
			document.getElementById("dependencies-dropzone").addEventListener("drop", this.controller.handleDrop, true);
			
			document.getElementById("dependencies-dropzone").removeEventListener("dragover", this.controller.dragover);
			document.getElementById("dependencies-dropzone").addEventListener("dragover", this.controller.dragover, true);
		},
        reinit: function () {

        }
});
