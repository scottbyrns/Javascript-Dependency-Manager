LiveWidgets.addWidget({
	name: "package-uploader",
	model: {},
	controller: {
		handleMessage: function (message, channel) {
			if (channel == "dropped-file") {
				
				console.log("Dropped package,", message);
				
				delete message.data;
				
				socket.emit("package-upload", (message));
				
			}
		},
	},
	constructor: function () {

	},
	reinit: function () {
		
	}
})