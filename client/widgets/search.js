// Pass array of objects
// Array of keys
// Search object properties denoted by keys for fuzzy matched values


LiveWidgets.addWidget({

	name: "search",
	
	model: {
		
	},
	
	controller: {
		
		performSearch: function (dataset, keys, term) {
			
		},
		
		handleMessage: function (message, channel) {
			
			if (channel == "search") {
				
				this.controller.performSearch(message.dataset, message.keys, message.term);
				
			}
			
		}
		
	},
	
	constructor: function () {
		
	},
	
	reinit: function () {
		
	}
	
});