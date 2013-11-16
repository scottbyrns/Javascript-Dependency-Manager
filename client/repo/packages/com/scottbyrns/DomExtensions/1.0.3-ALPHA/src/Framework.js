(function (DOMWindow, DOMDocument) {

	if (!DOMWindow.DomExtensions) {
		var TemplateEngine = function () {
			/* Create the cache object */
			var cache = {},
			_template;
			/* Define the alias for the tmpl method and define the tmpl method */
			_template = function tmpl(template, data){
				/* Figure out if we're getting a template, or if we need to
				 load the template - and be sure to cache the result. */
				var fn = !/\W/.test(template) ? cache[template] = cache[template] || _template(template) :
				/* Generate a reusable function that will serve as a template
				 generator (and which will be cached). */
				new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +
				/* Introduce the data as local variables using with(){} */
				"with(obj){p.push('" +
				/*  Convert the template into pure JavaScript */
				template.replace(/[\r\t\n]/g, " ").split("<?").join("\t").replace(/((^|\?>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)\?>/g, "',$1,'").split("\t").join("');").split("?>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
				/* Provide some basic currying to the user */
				return data ? fn( data ) : fn;
			};
			return _template;
		}();
		/**
		 * Class to manage and coordinate the communication between a pool of registered listeners.
		 * @returns undefined
		 */
		var MessageController = function () {
			this.listenerPool = {};
		};
		/**
		 * Register a new listener
		 * @param {String} key Group key name
		 * @param {String|Number} UID Unique value to register a callback
		 * @param {Function} callback Method to be called with a message.
		 * @returns undefined
		 */
		MessageController.prototype.registerListener = function (key, UID, callback) {
			if (!this.listenerPool[key]) {
				this.listenerPool[key] = {};
			}
			this.listenerPool[key][UID] = callback;
		};
		/**
		 * Send a message to a listener pool
		 * @param {String} targetListener Group key name to send the message to.
		 * @param {Any} message Message to send to the target group.
		 * @returns undefined
		 */
		MessageController.prototype.sendMessage = function (targetListener, message) {
			try {
				var target = this.listenerPool[targetListener];
				for (callback in target) {
					if (target.hasOwnProperty(callback)) {
						target[callback](message);
					}
				}
			}
			catch (e) {
		
			}
		};

		MessageController = new MessageController();

		var Helpers = {
			/**
			 * Bind an execution context to a method and return it
			 * @param {Function} method Method to bind an execution context to.
			 * @param {Context} context Execution context to bind to method.
			 * @TODO Bind the context with a prototype like bind technique
			 */
			bind: function (method, context) {
				return function () {
					method.apply(context, arguments);
				};
			},
			/**
			 * Clone an object so that all properties are new instances of the objects
			 * rather than pointers to the original.
			 * @param {Object} from Object to clone
			 * @param {Context} scope Execution context to bind to all methods found
			 * in the object being cloned.
			 * @TODO Consider removing the execution context binding and creating a
			 * helper to do it. It falls out of the scope of "deep clone"ing but saves
			 * on lines of code. Is the trade off worth the unusal behavior?
			 */
			deepClone: function (from, scope) {
				var to = {};
				for (var i in from) {
					if (from.hasOwnProperty(i)) {
						if (typeof from[i] === 'object') {
							if (from[i] instanceof Array) {
								to[i] = [];
								for (var val in from[i]) {
									if (from[i].hasOwnProperty(val)) {
										to[i][val] = from[i][val];
									}
								}
							}
							else {
								to[i] = deepClone(from[i], scope);
							}
						}
						else if (typeof from[i] === 'function' && scope) {
							to[i] = Helpers.bind(from[i], scope);
						}
						else {
							to[i] = from[i];
						}
					}
				}
				return to;
			},
			/**
			 * Check to make sure the controller does not have have any properties that will conflict with
			 * the extensions properties and method.
			 * @param {Object} controller Controller provided in an addextension call.
			 * @returns {Boolean} True if the controller is fine, false if it will conflict with the extension.
			 */
			validateController: function (controller) {
				if (controller.reinit || controller.sendMessage || controller.model || controller.controller || controller.element) {
					return false;
				}
				else {
					return true;
				}
			},
			/**
			 * Check for missing properties on a extension and add them.
			 * @param {Object} extension extension to clean up.
			 * @returns {Object} a clean version of the extension
			 */
			cleanExtension: function (extension) {
				extension.constructor = extension.constructor || function () {};
				extension.reinit = extension.reinit || function () {};

				extension.model = extension.model || {};
				extension.controller = extension.controller || {};
				return extension;
			},
			/**
			 * Create the extension constructor. We capture the model in the scope of the
			 * constroctur, add the element property, controller methods with scope
			 * correction, call the extension constructor in the scope of this constructor,
			 * register a listener for grouped extensions, and call reinit.
			 * @param {Object} extension Our extension we are creating a class for.
			 * @returns undefined
			 */
			buildExtensionConstructor: function (extension) {
				return function (element) {
					this.model = Helpers.deepClone(extension.model, this);
					for (var i = 0, len = element.attributes.length; i < len; i += 1) {
						var name = element.attributes[i].name;
						if (name.indexOf('data-') > -1 && name !== 'data-extension-id' && name !== 'data-extension' && name !== 'data-template') {
							this.model[name.replace('data-', '')] = element.getAttribute(name);
						}
					}
					this.element = element;
					this.controller = Helpers.deepClone(extension.controller, this);
					extension.constructor.call(this);
			
					if (this.model.inlets) {
						
						var inlets = [];
						
						if (this.model.inlets.indexOf("|") > -1) {
							
							inlets = this.model.inlets.split("|");
							
						}
						else
						{
							
							inlets.push(this.model.inlets);
							
						}
				
						for (var i = 0, len = inlets.length; i < len; i += 1)
						{
				
						
							MessageController.registerListener(inlets[i], Math.floor(Math.random() * new Date()), Helpers.bind(function (messageObject) {
								if (this.element.getAttribute("data-extension-id") != messageObject.extensionId) {
									this.handleMessage(messageObject.message, messageObject.channel, messageObject.extensionId);
								}
							}, this));
					
						}
						
					}
			
					if (this.model.group) {
						
						var groups = [];
						if (this.model.group.indexOf("|") > -1) {
							groups = this.model.group.split("|");
						}
						else
						{
							groups.push(this.model.group);
						}
				
						for (var i = 0, len = groups.length; i < len; i += 1)
						{
				
						
							MessageController.registerListener(groups[i], Math.floor(Math.random() * new Date()), Helpers.bind(function (messageObject) {
								if (this.element.getAttribute("data-extension-id") != messageObject.extensionId) {
									this.handleMessage(messageObject.message, messageObject.channel, messageObject.extensionId);
								}
							}, this));
					
						}
						
					}
			
					this.reinit();
				};
			}
		};

		var Augments = {
			/**
			 * Method to send a message to a registered listener pool.
			 * @param {All} message Message to be sent to registered listeners, this can be any type of object.
			 * @param {String} channel Channel that can be used to filter messages for requests.
			 */
			sendMessage: function (message, channel) {
				var groups = [];
				if (this.model.group && this.model.group.indexOf("|") > -1) {
					groups = this.model.group.split("|");
				}
				else
				{
					groups.push(this.model.group);
				}
				
				for (var i = 0, len = groups.length; i < len; i += 1)
				{
				
					MessageController.sendMessage(groups[i], {
						extensionId: this.element.getAttribute("data-extension-id"),
						message: message,
						channel: channel
					});
					
				}
				this.model.outlets = this.element.getAttribute("data-outlets");
				if (this.model.outlets) {
					var outlets = [];
					if (this.model.outlets.indexOf("|") > -1) {
						outlets = this.model.outlets.split("|");
					}
					else
					{
						outlets.push(this.model.outlets);
					}
				
					for (var i = 0, len = outlets.length; i < len; i += 1)
					{
						// console.warn(outlets[i]);
						MessageController.sendMessage(outlets[i], {
							groups: this.model.group,
							extensionId: this.element.getAttribute("data-extension-id"),
							message: message,
							channel: channel
						});
					
					}
				}

				
			},
			/**
			 * Replace the innerHTML of the extension element with a rendered template
			 * @returns undefined
			 */
			renderTemplate: function () {
				this.element.innerHTML = TemplateEngine(this.template, this.model);
			}
		};
		/**
		 * Liveextensions
		 * @param {window} DOMWindow window global reference
		 * @param {document} DOMDOcument DOM Document
		 */
		var DomExtensions = function (DOMWindow, DOMDocument) {
			this.extensions = {};
			this.extensionInstances = {};
		};
		/**
		 * Add a new extension module to the extensions object.
		 * @param {Object} extensionModule Object containing the extension description.
		 */
		DomExtensions.prototype.addExtension = function (extensionModule) {
	
			extensionModule = Helpers.cleanExtension(extensionModule);
	
			if (!extensionModule.name) {
				return false;
			}
	
			if (!Helpers.validateController(extensionModule.controller)) {
				return false;
			}
	
			this.extensions[extensionModule.name] = Helpers.buildExtensionConstructor(extensionModule);
	
			this.extensions[extensionModule.name].prototype.handleMessage = extensionModule.controller.handleMessage || function () {};
	
			this.extensions[extensionModule.name].prototype.template = extensionModule.template || false;
			this.extensions[extensionModule.name].prototype.sendMessage = Augments.sendMessage;
			this.extensions[extensionModule.name].prototype.reinit = (function (reinit) {
				return function () {
					if (this.template) {
						this.renderTemplate();
					}
					reinit.call(this);
				};
			})(extensionModule.reinit);
	
			this.extensions[extensionModule.name].prototype.renderTemplate = Augments.renderTemplate;
		};
		/**
		 * Extend an existing extension.
		 * @param {String} extensionName Existing extension to be extended
		 * @param {Object} extention extension object to extend the existing extension with.
		 */
		DomExtensions.prototype.extendExtension = function (extensionName, extention) {
	
			if (!extention.reinit) {
				extention.reinit = this.extensions[extensionName].prototype.reinit;
			}
	
			extention = Helpers.cleanExtension(extention);
	
			if (!extention.name) {
				return false;
			}
	
			if (!Helpers.validateController(extention.controller)) {
				return false;
			}
	
			this.extensions[extention.name] = function (element) {
				this.extensions[extensionName].call(this, element);
				extention.constructor.call(this, element);
			};
	
			this.extensions[extention.name].prototype = this.extensions[extensionName].prototype;
	
			this.extensions[extention.name].prototype.handleMessage = extention.controller.handleMessage || this.extensions[extensionName].prototype.handleMessage;
			this.extensions[extention.name].prototype.reinit = (function (reinit) {
				return function () {
					if (this.template) {
						this.renderTemplate();
					}
					reinit.call(this);
				};
			})(extention.reinit);
		};
		/**
		 * Set every thing up to prepare to create an instance of the extension.
		 * @param {DOM} element DOM element that a extension will be deployed for.
		 */
		DomExtensions.prototype.initializeExtension = function (element) {
			if (!this.extensions[element.getAttribute('data-extension')]) {
				return false;
			}
			var UID = Math.floor(new Date()*Math.random());
			element.setAttribute('data-extension-id', UID);
			this.extensionInstances[UID] = this.instantiateExtension(element, element.getAttribute('data-extension'));
		};
		/**
		 * Return a new isntance of a extension by name attached to the specified element.
		 * @param {DOM} element DOM element to attach the extension to.
		 * @param {String} name Name of the extension class that will be instantiated
		 */
		DomExtensions.prototype.instantiateExtension = function (element, name) {
			try {
				return new this.extensions[name](element);
			}
			catch (e) {
				/* Defer extension here */
			}
		}

		DomExtensions = new DomExtensions(DOMWindow, DOMDocument);
		/**
		 * Class for managing the scanning of the DOM document.
		 * @param {Number} interval Interval length in MS to time successive
		 * scans of the document.
		 */
		var Monitor = function (interval) {
			this.interval = interval;
			this.monitor = {};
			this.domSize = 0;
		};
		/**
		 * Search the document for elements with the data-extension attribute that do
		 * not also have the data-extension-id attribute. Call Liveextensions.initializeextension
		 * with a DOM element that matches the above noted conditions.
		 * @returns undefined
		 */
		Monitor.prototype.searchForElements = function () {
			var domElements = DOMDocument.getElementsByTagName('*');
			if (domElements.length == this.domSize) {
				return false;
			}
			this.domSize = domElements.length;
			for (var el = 0, len = domElements.length; el < len; el += 1) {
				if (domElements[el].getAttribute('data-extension') && !domElements[el].getAttribute('data-extension-id')) {
					DomExtensions.initializeExtension(domElements[el]);
				}
			}
		};
		/**
		 * Start scanning the document for extensions.
		 * @returns undefined
		 */
		Monitor.prototype.startScanning = function () {
			try {
				document.addEventListener('DOMNodeInsertedIntoDocument', Helpers.bind(this.searchForElements), true);
			}
			catch (e) {
				clearInterval(this.monitor);
				this.monitor = setInterval(Helpers.bind(this.searchForElements, this), this.interval);
			}
		};
		/**
		 * Stop scanning the document for extensions.
		 * @returns undefined
		 */
		Monitor.prototype.stopScanning = function () {
			clearInterval(this.monitor);
		};

		Monitor = new Monitor(33);
		Monitor.startScanning();
		
		
		var VisualMode = function () {
			
		};
		
		VisualMode.prototype = {
			toggle: function () {
				var domElements = DOMDocument.getElementsByTagName('*');
				// if (domElements.length == this.domSize) {
				// 	return false;
				// }
				// this.domSize = domElements.length;
				for (var el = 0, len = domElements.length; el < len; el += 1) {
					if (domElements[el].getAttribute('data-extension')) {
						domElements[el].style.border="3px dotted #0099FF";
					}
				}
			}
		};
		
		var vm = new VisualMode();

		DOMWindow.DomExtensions = {
			addExtension: Helpers.bind(DomExtensions.addExtension, DomExtensions),
			extendExtension: Helpers.bind(DomExtensions.extendExtension, DomExtensions),
			stopScanning: Helpers.bind(Monitor.stopScanning, Monitor),
			startScanning: Helpers.bind(Monitor.startScanning, Monitor),
			toggleVisualMode: Helpers.bind(vm.toggle, DomExtensions)
		};

	}

})(window, document);