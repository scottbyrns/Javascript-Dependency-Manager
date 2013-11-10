LiveWidgets.addWidget({
        name: 'jdm-package-builder',
        model: {

        },
        controller: {
                // dispatchMessageToGroupedWidgets: function (event) {
                //         event.stopPropagation();
                //         this.sendMessage(this.model.message, this.model.channel);
                // }
				handleMessage: function (data) {
					console.log("jdm-package-builders", arguments);
					
					var html = [
					'<div data-widget="code-editor" data-group="editor">',
						data,
					'</div>',
					].join("");
					
					this.element.innerHTML = html;
					
					socket.emit("file-test", {"data":data});
				},
				
        },
		constructor: function () {
		},
        reinit: function () {
        }
});
