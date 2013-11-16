LiveWidgets.addWidget({
	name: "markdown-viewer",
	model: {},
	controller: {
	
	
		renderMode: function (dataToRender) {
			this.element.innerHTML = Markdown.toHTML(dataToRender);
		},
		
		editMode: function (dataToEdit) {
			
			this.model.textarea = document.createElement("textarea");
			this.model.textarea.innerHTML = dataToEdit;
			
			this.model.editor = new EpicEditor({
				container:this.element,
				textarea: this.model.textarea,
				autogrow: true
			}).load();
			
			this.model.editor.on("autosave", this.controller.notifyReadmeSave.bind(this));
			
			this.element.style.marginBottom = "100px";
		},
		
		notifyReadmeSave: function () {
			this.sendMessage(this.model.editor.exportFile(), "md-edit-complete");
		},
		
		
		handleMessage: function (message, channel, id) {
			
			if (channel == "render-markdown") {
				
				this.controller.renderMode(message);
				
			}
			
			if (channel == "edit-markdown") {
				
				this.controller.editMode(message);
				
			}
			
		}
		
	},
	constructor: function () {
		
	},
	reinit: function () {
		
	}
})