LiveWidgets.addWidget({
	name: "markdown-viewer",
	model: {},
	controller: {
	
		handleMessage: function (message, channel, id) {
			if (channel == "render-markdown") {
				this.element.innerHTML = Markdown.toHTML(message);
				
			}
		}
		
	},
	constructor: function () {
		
	},
	reinit: function () {
		
	}
})