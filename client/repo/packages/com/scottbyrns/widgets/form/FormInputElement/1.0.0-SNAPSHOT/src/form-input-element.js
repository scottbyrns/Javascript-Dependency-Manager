LiveWidgets.addWidget({
	
	name: "form-input-element",
	
	model: {
		
	},
	
	controller: {
		
		handleFocus: function () {
			this.sendMessage(this.element.getAttribute("name"), "form-input-focus");
		},
		
		handleBlur: function () {
			this.sendMessage(this.element.getAttribute("name"), "form-input-blur");			
		},
		
		handleChange: function () {
			this.sendMessage(this.element.getAttribute("name"), "form-input-change");
		},
		
		handleMessage: function (message, channel, id) {
			
			if (channel == "set-input-value" && message && message.name == this.element.getAttribute("name")) {
				
				this.element.value = message.value;
				this.sendMessage(this.element.getAttribute("name"), "form-input-change");
				
			}
			
			if (channel == "focus-input-element" && message == this.element.getAttribute("name")) {
				this.element.focus();
			}
			
			if (channel == "blur-input-element" && message == this.element.getAttribute("name")) {
				this.element.blur();
			}
			
		}
	},
	
	constructor: function () {
		
	},
	
	reinit: function () {

		this.element.removeEventListener("focus", this.controller.handleFocus);
		this.element.removeEventListener("blur", this.controller.handleBlur);
		this.element.removeEventListener("change", this.controller.handleChange);
		
		this.element.addEventListener("focus", this.controller.handleFocus, false);
		this.element.addEventListener("blur", this.controller.handleBlur, false);
		this.element.addEventListener("change", this.controller.handleChange, false);
		
	}
	
})