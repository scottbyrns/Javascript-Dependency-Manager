


LiveWidgets.addWidget({
        name: 'activity-workspace',
        model: {
			
        },
        controller: {
			handleMessage: function (message, channel) {
				console.log("Activity workspace:", arguments);
				
				if (message == "package-upload") {
					document.getElementById("package-upload").style.display="block";

					document.getElementById("artifact-viewer").style.display="none";
					document.getElementById("jdm-package-builder").style.display="none";
					// document.getElementById("modules").style.display="none";
					
					
					document.getElementById("passive-control").innerHTML = '<div class="back-icon" data-widget="event-trigger" data-event="click" data-group="repository-control" data-message="show-modules"><p></p></div>';
					document.getElementById("title").innerHTML = "Artifact List";
							
							
					document.getElementsByTagName("nav")[0].appendChild(document.getElementById("modules"));
					document.getElementsByTagName("ul", document.getElementsByTagName("nav")[0])[0].style.display="none";
					

					
					document.getElementById("modules").style.display = "block";
					document.getElementById("package-menu").style.display = "none";
				}
				
				if (channel == "edit-artifact") {
					document.getElementById("package-upload").style.display="none";
					document.getElementById("artifact-viewer").style.display="none";
					document.getElementById("jdm-package-builder").style.display="block";
					// document.getElementById("modules").style.display="none";
					
					
					document.getElementById("passive-control").innerHTML = '<div class="back-icon" data-widget="event-trigger" data-event="click" data-group="repository-control" data-message="show-modules"><p></p></div>';
					var a = document.createElement("datalist");
					document.getElementById("passive-control").appendChild(document.createElement("datalist"));
					// document.getElementById("passive-control").removeChild(a);
					
					document.getElementById("title").innerHTML = "Artifact List";
							
							
					document.getElementsByTagName("nav")[0].appendChild(document.getElementById("modules"));
					document.getElementsByTagName("ul", document.getElementsByTagName("nav")[0])[0].style.display="none";
					

					
					document.getElementById("modules").style.display = "block";
					document.getElementById("package-menu").style.display = "none";
					
					
				}
				
				
				if (message == "create-package")
				{
					document.getElementById("package-upload").style.display="none";
					document.getElementById("artifact-viewer").style.display="none";
					document.getElementById("jdm-package-builder").style.display="block";
					// document.getElementById("modules").style.display="none";
					

			
			
					document.getElementsByTagName("nav")[0].appendChild(document.getElementById("modules"));
					document.getElementsByTagName("ul", document.getElementsByTagName("nav")[0])[0].style.display="none";
					
					document.getElementById("passive-control").innerHTML = '<div class="back-icon" data-widget="event-trigger" data-event="click" data-group="repository-control" data-message="show-modules"><p></p></div>';
					document.getElementById("title").innerHTML = "Artifact List";
					
					document.getElementById("modules").style.display = "block";
					document.getElementById("package-menu").style.display = "none";
					
				}
				
				if (channel == "show-artifact")
				{
					document.getElementById("package-upload").style.display="none";
					document.getElementById("artifact-viewer").style.display="block";
					document.getElementById("jdm-package-builder").style.display="none";
					// document.getElementById("modules").style.display="none";
					
					document.getElementById("passive-control").innerHTML = '<div class="back-icon" data-widget="event-trigger" data-event="click" data-group="repository-control" data-message="show-modules"><p></p></div>';
					document.getElementById("title").innerHTML = "Artifact List";
			
			
					document.getElementsByTagName("nav")[0].appendChild(document.getElementById("modules"));
					document.getElementsByTagName("ul", document.getElementsByTagName("nav")[0])[0].style.display="none";
					document.getElementById("modules").style.display = "none";
					document.getElementById("package-menu").style.display = "block";
					// document.getElementById("modules").parrentNode.removeChild(document.getElementById("modules"));
				}
				
				if (message == "show-modules")
				{
					document.getElementById("package-upload").style.display="none";
					document.getElementById("artifact-viewer").style.display="none";
					document.getElementById("jdm-package-builder").style.display="none";
					document.getElementById("modules").style.display="block";
					
					document.getElementsByTagName("ul", document.getElementsByTagName("nav")[0])[0].style.display="block";
					
					document.getElementById("artifact-viewer").parentNode.appendChild(document.getElementById("modules"));
					
					document.getElementById("passive-control").innerHTML = '<div class="dot"></div>';
					document.getElementById("title").innerHTML = "JS Package Repository";
					
					document.getElementById("modules").style.display = "block";
					document.getElementById("package-menu").style.display = "none";
				}
			}
        },
		constructor: function () {
			// document.getElementsByName("artifact-viewer").style.display="none";
			// document.getElementsByName("package-builder").style.display="none";
			// document.getElementsByName("introduction").style.display="none";
			
			document.getElementById("artifact-viewer").style.display="none";
			document.getElementById("jdm-package-builder").style.display="none";
			document.getElementById("package-upload").style.display="none";			
			document.getElementById("modules").style.display="block";

		},
        reinit: function () {

        }
});
