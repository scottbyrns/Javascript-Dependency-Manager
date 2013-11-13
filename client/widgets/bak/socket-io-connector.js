LiveWidgets.addWidget({
	name: "socket-io-connector",
	model: {},
	controller: {},
	constructor: function () {
		
        window.socket = io.connect(this.model.host, {
            secure: this.model.secure,
            port: this.model.port
        });
	
        window.socket.on('error', function () {
            console.error(arguments)
        });
	
        window.socket.on('message', function () {
            console.log(arguments)
        });
		
	},
	reinit: {}
})