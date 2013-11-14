LiveWidgets.addWidget({
        name: 'file-drop-zone',
        model: {

        },
        controller: {
                // dispatchMessageToGroupedWidgets: function (event) {
                //         event.stopPropagation();
                //         this.sendMessage(this.model.message, this.model.channel);
                // }
				handleMessage: function () {
					console.log(arguments);
				},
				
				
				fileWasUploaded: function (data) {

					// console.log(data);
					var chan = this.model.channel || "dropped-file";
					this.sendMessage(data, chan);
				}
				
        },
		constructor: function () {
			this.model.dropzone = new com.scottbyrns.HTML5.IO.File.DragDrop(this.element);
			this.model.dropzone.registerCallback(this.controller.fileWasUploaded.bind(this));
		},
        reinit: function () {
                // this.element.removeEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets);
                // this.element.addEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets, true);
        }
});
