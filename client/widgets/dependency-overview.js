LiveWidgets.addWidget({

	name: "dependency-overview",
	model: {},
	controller: {
		
		dataFetched: function (artifact) {
			console.log("dependency-overview", arguments);
			
			this.element.innerHTML = [
			'<div class="item-wrapper">',
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
			
		}
		
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