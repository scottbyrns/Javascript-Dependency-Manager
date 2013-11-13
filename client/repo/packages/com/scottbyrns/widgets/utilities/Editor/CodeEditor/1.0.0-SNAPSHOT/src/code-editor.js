LiveWidgets.addWidget({
        name: 'code-editor',
        model: {
                event: ''
        },
        controller: {
			handleMessage: function () {
				console.log(arguments);
				// TODO move editor init into a message handler for remote triggering and controll.
			}
        },
		constructor: function () {
		    var editor = ace.edit(this.element);
		    editor.setTheme("ace/theme/monokai");
		    editor.getSession().setMode("ace/mode/javascript");

			var a = new com.scottbyrns.LiveWidgets.Framework();

		},
        reinit: function () {

        }
});
