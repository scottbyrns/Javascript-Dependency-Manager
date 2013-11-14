LiveWidgets.addWidget({
        name: 'drag-data',
        model: {

        },
        controller: {
				handleMessage: function () {
					console.log(arguments);
				},
				
				drop: function () {
					this.element.className = this.element.className.replace(" drag", "");
				},
				
				ondragstart: function (event) {
					
					this.element.className += " drag";

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
			
			this.element.addEventListener(
				'drop',
				this.controller.drop,
				true
			);
        }
});
