


LiveWidgets.addWidget({
        name: 'artifact-viewer',
        model: {

        },
        controller: {

				handleMessage: function (artifact) {
					artifact = decodeURIComponent(artifact);
					artifact = JSON.parse(artifact);
					console.log(artifact);
					this.controller.showArtifact(artifact);
				},
				
				showArtifact: function (artifact) {

					var dependencies = [];
					
					if (artifact.dependencies.length > 0) {
						
						dependencies.push("<h4>Dependencies</h4><ul>");
						
						for (var i = 0, len = artifact.dependencies.length; i < len; i += 1) {
							var dependency = artifact.dependencies[i];
							console.log(dependency);
							dependencies.push("<li>" + JSON.stringify(dependency) + "</li>");
						}
						
						dependencies.push("</ul>");						
					}
					

					
					
					var html = [
						
					'<div class="artifact-overview">',
					
						'<h3>' + artifact.name + '</h3>',
						'<p>' + artifact.description + '</p>',
						'<nav>',
						
			            '<button data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="add-package">',
			            '    Add Package',
			            '</button>',

						'<button data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="export-package">',
			            '    Export Package',
			            '</button>',

						'<button data-widget="event-trigger" data-group="repository-control" data-event="click" data-message="remove-package">',
						'	Remove Package',
						'</button>',
						
						'</nav>',
						'<span>' + artifact.version + '</span>',
					
					'</div>',
					
					
					'<div data-widget="artifact-dependencies-map" data-group="dependencies-browser">',
						dependencies.join(""),
					'</div>',
					
					'<div data-widget="code-editor-controls" data-group="editor"></div>',
					'<div data-widget="code-editor" data-group="editor">',
						JSON.stringify(artifact, undefined, 4),
					'</div>',
					
					'<div data-widget="artifact-sources-list" data-group="artifact-sources-list"></div>',
						
					].join("");
					
					this.element.innerHTML = html;
				}
        },
		constructor: function () {

		},
        reinit: function () {
                // this.element.removeEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets);
                // this.element.addEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets, true);
        }
});
