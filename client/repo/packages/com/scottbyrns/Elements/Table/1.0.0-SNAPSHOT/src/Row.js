com.scottbyrns.Elements.Table.Row = function (domRow) {
	this.element = domRow || document.createElement("tr");
	this.cells = [];
};

com.scottbyrns.Elements.Table.Row.prototype = {
	addCell: function (cell) {
		this.element.appendChild(cell);
	}
};