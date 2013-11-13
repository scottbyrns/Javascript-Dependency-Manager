LiveWidgets.addWidget({

	name: "version-toggle",
	
	model: {
		
		// versions: []
		
	},
	
	controller: {
		handleMessage: function () {
			
		},
		
		handleClick: function () {
			
			
			var selectedOption = document.getElementsByTagName("option")[
				document.getElementsByTagName("select", this.element)[0].selectedIndex
			]
			
			
			
			this.sendMessage(selectedOption.value, "change-version");
		}
	},
	
	constructor: function () {
		this.model.versions = this.element.getAttribute('data-versions').split(",");
	},
	
	reinit: function () {
	
        document.getElementsByTagName("select", this.element)[0].removeEventListener(
			
			"change",
			this.controller.handleClick
			
		);
		
		
        document.getElementsByTagName("select", this.element)[0].addEventListener(
			
			"change",
			this.controller.handleClick,
			true
		
		);
		
	}
	
});