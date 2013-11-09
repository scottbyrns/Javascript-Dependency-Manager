com.scottbyrns.Elements.List.DynamicList({
	
	setup: function () {
		
	},
	
	// Ul or Ol
	constructor: function (listDomElement) {
		
		if (typeof listDomElement === "string") {
			
			listDomElement = document.getElementById(listDomElement);
			
		}
		
		this.element = listDomElement;
		
	},
	
	prototype: {
		
		addListItem: function (listItemDomElement) {
			
			if (listItemDomElement instanceof com.scottbyrns.Elements.List.ListItem) {
			
				this.element.appendChild(listItemDomElement.element);
				
			}
			else {
			
				this.element.appendChild(listItemDomElement);				
			
			}

		}
	}
	
});
