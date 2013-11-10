com.scottbyrns.AspectLogger.Logger = {
	document: function (docId, document) {
		console.log(docId, document);
	},
	event: function (eventId, event) {
		console.log(eventId, event);
	},
	// document: function (docId, document) {
	// 	console.log(docId, document);
	// },
};