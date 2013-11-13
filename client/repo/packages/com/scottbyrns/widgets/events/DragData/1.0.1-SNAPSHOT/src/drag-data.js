LiveWidgets.addWidget({
        name: 'drag-data',
        model: {

        },
        controller: {
				handleMessage: function () {
					console.log(arguments);
				},
				
				ondragstart: function (event) {

					event.dataTransfer.setData(
						'application/json',
						decodeURIComponent(this.model.data)
					);
					
				}
				
        },
		constructor: function () {

		},
        reinit: function () {

				this.element.addEventListener(
					'dragstart',
					this.controller.ondragstart,
					true
				);
        }
});
