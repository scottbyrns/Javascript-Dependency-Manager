com.scottbyrns.Elements.Table.Table = function (domTable) {
	this.element = domTable || document.createElement("table");
	this.columns = [];
};

com.scottbyrns.Elements.Table.Table.prototype = {
	addRow: function (row) {
		this.element.appendChild(row);
	}
};