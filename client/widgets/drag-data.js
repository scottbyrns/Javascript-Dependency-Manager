LiveWidgets.addWidget({
        name: 'drag-data',
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
					// this.sendMessage(data, "dropped-file");
				},
				
				ondragstart: function (event) {
					// console.log(this.model.data);
					event.dataTransfer.setData('application/json', decodeURIComponent(this.model.data));
				}
				
        },
		constructor: function () {
			// this.model.dropzone = new com.scottbyrns.HTML5.IO.File.DragDrop(this.element);
			// this.model.dropzone.registerCallback(this.controller.fileWasUploaded.bind(this));
		},
        reinit: function () {
                // this.element.removeEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets);
                // this.element.addEventListener(this.model.event, this.controller.dispatchMessageToGroupedWidgets, true);
				this.element.addEventListener('dragstart', this.controller.ondragstart, true);
        }
});
