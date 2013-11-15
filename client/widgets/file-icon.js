LiveWidgets.addWidget({
	
	name: "file-icon",
	model: {},
	controller: {
		handleMessage: function () {
			
		},
		
		handleMouseEnter: function () {
			
		},
		
		handleMouseExit: function () {
			
		}
	},
	constructor: function () {
		this.model.fileName = this.element.innerHTML;

		var height = 45;// this.element.offsetHeight;
		
		this.element.innerHTML = "";
		
		var icon = document.createElement("div");
		
		
		icon.style.height = (height - 10) + "px";
		icon.style.lineHeight = (height - 10) + "px";
		icon.style.paddingLeft = "10px";
		icon.style.paddingRight = "10px";
		icon.style.margin = "5px";
		icon.style.background = "rgba(255,255,255,0.05)";
		icon.style.color = "rgba(0,0,0, 0.3)";

		icon.style.textAlign = "center";
		icon.style.display = "inline-block";
		icon.style.fontSize = "18px";
		icon.style.borderRadius = "100px";
		icon.style.marginRight = "20px";
		
		icon.innerHTML = this.model.fileName.split(".")[this.model.fileName.split(".").length - 1].toUpperCase();
		
		this.element.appendChild(icon);
		this.element.innerHTML += this.model.fileName;
		
		// this.element.getElementsByTagName("div")[0].style.lineHeight = this.element.getElementsByTagName("div")[0].offsetWidth + "px";
		// this.element.getElementsByTagName("div")[0].style.height = this.element.getElementsByTagName("div")[0].offsetWidth + "px";
		
		
	},
	reinit: function () {
		// this.element.addEventListener("mouseenter", this.controller.handleMouseEnter);
		// this.element.addEventListener("mouseexit", this.controller.handleMouseExit);
	}
	
})