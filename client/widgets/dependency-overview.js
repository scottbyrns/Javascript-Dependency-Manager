LiveWidgets.addWidget({

	name: "dependency-overview",
	model: {},
	controller: {
		
		dataFetched: function (artifact) {
			console.log("dependency-overview", arguments);
			
			if (this.model.removeable && this.model.removeable == 'true')
			{
				var fragment = 'data-widget="drag-data" draggable="true" data-data="' + encodeURIComponent(JSON.stringify({
					"groupId": artifact.groupId,
					"artifactId": artifact.artifactId,
					"version": artifact.version
				})) + '"';
			}
			
			this.element.innerHTML = [
			'<div class="item-wrapper" ',
			fragment,
			'>',
			'<div class="artifact-icon"></div>',
			
			"<h6>",
				artifact.name,
			"</h6>",
			
			"<p>",
				artifact.groupId,
				"<br />",
				artifact.artifactId,
			"</p>",
			
			"<span>",
				artifact.version,
			"</span>",
			'</div>'
			
			].join("");
			
			if (this.model.removeable && this.model.removeable == 'true')
			{
				this.element.getElementsByClassName("item-wrapper")[0].addEventListener("dragstart", this.controller.handleDrag);
				this.element.getElementsByClassName("item-wrapper")[0].addEventListener("dragleave", this.controller.dragLeave);
				this.element.getElementsByClassName("item-wrapper")[0].addEventListener("dragend", this.controller.dragEnd);
			}
			
			this.model.artifact = artifact;
			
		},
		dragEnd: function (event) {
			this.element.style.opacity = "1";

			
			var top = this.element.getBoundingClientRect().top
			var left= this.element.getBoundingClientRect().left
			
			var width = this.element.offsetWidth;
			var height = this.element.offsetHeight;
			
			if (event.x < left ||
				event.y < top ||
				event.x > left + width ||
				event.y > top + height) {
					
					this.sendMessage({
						
						"groupId": this.model.artifact.groupId,
						"artifactId": this.model.artifact.artifactId,
						"version": this.model.artifact.version
					
					}, "remove-dependency-overview");
			}
			
		},
		dragLeave: function () {
			this.element.style.opacity = "0.0";
		},
		handleDrag: function () {
			this.element.style.opacity = "0.3";
		},
		
	},

	constructor: function () {
		
		this.model.artifact = JSON.parse(decodeURIComponent(this.model.artifact));
		this.model.artifact.callback = this.controller.dataFetched.bind(this);
		
		this.sendMessage(
			this.model.artifact,
			"fetch-version"
		);
		
	},
	reinit: function () {
		
	}
	
});