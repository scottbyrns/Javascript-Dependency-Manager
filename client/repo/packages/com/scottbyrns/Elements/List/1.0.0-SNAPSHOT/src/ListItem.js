com.scottbyrns.Elements.List.ListItem({
	
	setup: function () {
		
	},
	
	// li
	constructor: function (listItemDomElement) {
		if (typeof listItemDomElement === "string") {
			listItemDomElement = document.getElementById(listItemDomElement);
		}
		this.element = listItemDomElement;
	},
	
	prototype: {
		setIcon: function (image) {
			this.element.appendChild(image);
		},
		setText: function (text) {
			this.element.innerHTML = text;
		},

	}
	
});

com.scottbyrns.Elements.List.ListItem.createListItem = function (text) {
	var li = document.createElement("li");
	li.innerHTML = text;
	return new com.scottbyrns.Elements.List.ListItem(li);
};