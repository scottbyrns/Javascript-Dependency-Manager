
LiveWidgets.addWidget({
	
        name: 'event-trigger',
		
        model: {
			
                event: ''
				
        },
		
        controller: {
			
			
                dispatchMessageToGroupedWidgets: function (event) {
					
					
                    event.stopPropagation();
					
                    this.sendMessage(
						
						this.model.message,
						this.model.channel
						
					);
					
					
                }
				
        },
		
		constructor: function () {
			
			
			console.info(
				
				"A new event-trigger has been registered.",
				this.element
				
			);
			
			
		},
		
        reinit: function () {
			
			
				// Reinit is called often through out the life cycle of a widget.
				// Any time a parent widget is redrawn it's children are likely
				// effected and are rinitialized. Instance variables carry over
				// but the dom is likely refreshed under the instance. THe element
				// will need it's event handlers reattached. However if the dom
				// has not changed we need to remove the listeners before we attach
				// them to ensure that we do not register more than one event
				// handler on the dom element.
			
			
                this.element.removeEventListener(
					
					this.model.event,
					this.controller.dispatchMessageToGroupedWidgets
					
				);
				
				
                this.element.addEventListener(
					
					this.model.event,
					this.controller.dispatchMessageToGroupedWidgets,
					true
				
				);
		
				
        }
});
