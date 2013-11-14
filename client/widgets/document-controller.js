LiveWidgets.addWidget({

	name: "document-controller",
	
	model: {},
	
	controller: {
		keypress: function (event) {
			this.sendMessage(String.fromCharCode(event.which), "key-pressed");
		}
	},
	
	constructor: function () {
		
	},
	
	reinit: function () {
		this.element.addEventListener("keypress", this.controller.keypress)
	}
	
});