


LiveWidgets.addWidget({
        name: 'artifact-viewer',
        model: {
			// activeArtifact: []
        },
        controller: {

				handleMessage: function (artifact, channel) {
					
					
					if (artifact == "export-package")
					{
						socket.emit("download-package", {
							groupId: this.model.activeArtifact.groupId,
							artifactId: this.model.activeArtifact.artifactId,
							version: this.model.activeArtifact.version
						});
					}
					
					console.log("artifact-viewer", arguments);
					if (channel == "remove-package")
					{
						socket.emit("remove-package", {
							groupId: this.model.activeArtifact.groupId,
							artifactId: this.model.activeArtifact.artifactId,
							version: this.model.activeArtifact.version
						});
					}
					else if (channel == "show-artifact")
					{
						artifact = decodeURIComponent(artifact);
						artifact = JSON.parse(artifact);
						console.log(artifact);
						this.controller.showArtifact(artifact);
					}
				},
				
				showArtifact: function (artifact) {

					this.model.activeArtifact = artifact;

					var dependencies = [];
					dependencies.push('<h3 class="dependencies">Dependencies</h3>');
									
										
					if (artifact.dependencies.length > 0) {
						

						dependencies.push('<table class="dependencies">');
						dependencies.push('<tr><th>Group</th><th>Artifact</th><th>Version</th></tr>');

						
						for (var i = 0, len = artifact.dependencies.length; i < len; i += 1) {
							var dependency = artifact.dependencies[i];
							console.log(dependency);
							dependencies.push('<tr><td>' + dependency.groupId + '</td><td>' + dependency.artifactId + '</td><td>' + dependency.version + '</td></tr>');
						}
						
						dependencies.push('</table>');	
					}
					
					var sources = [];
					
					if (artifact.sources.length > 0) {
						
						// sources.push('<h3 class="dependencies">Sources</h3>');
						sources.push('<table class="dependencies">');
						sources.push('<tr><th>Source</th></tr>');

						
						for (var i = 0, len = artifact.sources.length; i < len; i += 1) {
							var source = artifact.sources[i];
							console.log(source);
							sources.push('<tr><td>' + source + '</td></tr>');
						}
						
						sources.push('</table>');	
					}
					

					
					
					var html = [
						
					'<div class="artifact-overview">',

					'<div class="artifact-icon"></div>',










						// '<div class="download-icon rounded" data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="export-package"><p></p></div>',
						// '<div class="delete-icon rounded" data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="remove-package"><p></p></div>',
					// '<div class="add-icon rounded" data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="add-package"><p></p></div>',
						'<h3>' + artifact.name + '</h3>',
						'<p>' + artifact.description + '</p>',
						// '<nav>',
							// '<div class="download-icon rounded" data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="export-package"><p></p></div>',
							// '<div class="delete-icon rounded" data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="remove-package"><p></p></div>',
							// '<div class="add-icon rounded" data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="add-package"><p></p></div>',
						// '</nav>',
						'<span>' + artifact.version + '<p class="down-arrow"></p></span>',

					'</div>',
					
					
					'<div>',
					'<table>',
					'<tr><th>Group</th><td>' + artifact.groupId + '</td></tr>',
					'<tr><th>Artifact</th><td>' + artifact.artifactId + '</td></tr>',
					'<tr><th>Author</th><td>' + artifact.developers[0].name + '</td></tr>',
					'<tr><th>Homepage</th><td></td></tr>',
					'<tr><th>Version Control</th><td></td></tr>',
					'<tr><th>Issue Tracker</th><td></td></tr>',
					'</table>',
					'</div>',
					
					
					'<div>',
					'<table>',
					'<tr><td>',
					
					'<div class="artifact-snippet">',
					
					"<textarea onClick=\"this.select()\">\n{\n     groupId: " + artifact.groupId,
					",\n     artifactId: " + artifact.artifactId,
					",\n     versions: " + artifact.version,
					"\n}\n</textarea>",
		
					'</div>',
					
					'</td><td class="download-label">',
						'<div class="download-button" data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="export-package">',
							'<div class="download-icon rounded"><p></p></div>',
							'<span>Download Artifact</span>',
						'</div>',					
					'</td></tr>',
					'</table>',
					'</div>',
					

		
					
					'<div data-widget="artifact-dependencies-map" data-group="dependencies-browser">',

						dependencies.join(""),
					

					'</div>',
					
					'<div data-widget="artifact-dependencies-map" data-group="dependencies-browser">',

						sources.join(""),
					

					'</div>',
					
					// '<div data-widget="code-editor-controls" data-group="editor"></div>',
					// '<div data-widget="code-editor" data-group="editor">',
					// 	JSON.stringify(artifact, undefined, 4),
					// '</div>',
					
					'<div data-widget="artifact-sources-list" data-group="artifact-sources-list"></div>',
						
					].join("");
					
					this.element.innerHTML = html;
				},
				
				downloadFile: function (file) {
					
					com.scottbyrns.HTML5.IO.DownloadDataURL(file.name, file.file);
					
				    // 
				    // function eventFire(el, etype){
				    //     if (el.fireEvent) {
				    //         (el.fireEvent('on' + etype));
				    //     } else {
				    //         var evObj = document.createEvent('Events');
				    //         evObj.initEvent(etype, true, false);
				    //         el.dispatchEvent(evObj);
				    //     }
				    // }
				    // 
				    // var link = document.createElement("a");
				    // link.download = file.name;
				    // link.href = file.file;
				    // eventFire(link, "click");

					
					// window.location = file.file;
				}
        },
		constructor: function () {
			socket.on("output-file", this.controller.downloadFile);
		},
        reinit: function () {
                // this.element.removeEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets);
                // this.element.addEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets, true);
        }
});
