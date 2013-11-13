LiveWidgets.addWidget({
	
	name: "draggable-file-download",
	model: {
		
	},
	controller: {
		
	},
	constructor: function () {
		
	},
	reinit: function () {
		this.element.addEventListener("dragstart",function(evt){
		    evt.dataTransfer.setData("DownloadURL", this.model.datafile);
		}.bind(this),false);
	}
	
});

