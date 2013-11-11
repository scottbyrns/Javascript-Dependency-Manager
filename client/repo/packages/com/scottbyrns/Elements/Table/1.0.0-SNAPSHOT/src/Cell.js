com.scottbyrns.Elements.Table.Cell = function (domCell, value) {
	this.element = domCell || document.createElement("td");
	this.value = value || "";
	this.element.innerHTML = value;
};

com.scottbyrns.Elements.Table.Cell.prototype = {
	setValue: function (value) {
		this.value = value;
		this.element.innerHTML = value;
	}
};