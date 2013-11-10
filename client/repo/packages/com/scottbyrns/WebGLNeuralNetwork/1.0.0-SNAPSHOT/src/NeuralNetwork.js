com.scottbyrns["WebGLNeuralNetwork"].NeuralNetwork({
	
	
	//
	// Setup the modules installation configuration.
	//
	// @parameter installer An installer instance from the PackageManager. This 
	//            will provide the setup with access to the in progress installation.
	//
	setup: function (installer) {
		// 
		// installer.localVariables = {
		// 	
		// 	"Random Seed": Math.random()*Math.random()/Math.random()
		// 	
		// };
		// 
		
		
		var fragment = com.scottbyrns["WebGLNeuralNetwork"]["shaders/neuralnet.frag"];
		
	    var script = document.createElement("script");
	    
		script.setAttribute("type", "x-shader/x-fragment");
		script.setAttribute("id", "neural-network-fragment");
		script.innerHTML = fragment;
		
	    document.body.appendChild(script);
		
		
		
	},
	
	
	// On a failed initialization this method will allow you to roll back the modules setup.
	rollback: function () {
		// 
		// installer.localVariables["Random Seed"] = undefined;
		// 
	},
	
	
	//
	//
	// Construct a new NeuralNetwork
	//
	//
	// @paramater input_nodes
	// @paramater hidden_layers
	// @paramater layer_node_count
	// @paramater output_nodes
	// @paramater targetDomElement
	//
	//
	constructor: function (input_nodes, hidden_layers, layer_node_count, output_nodes, targetDomElement) {
		
		//
		// Restricting access to prototype methods with a private variable lock.
		// I do this to keep access to methods used by the class that we don't
		// want to recreate in the compiler for each instance of this class
		// but wish to keep private access to.
		//
		// The lock can be broken by reassigning validateLock but then you cant expect
		// this to code to run as designed any more.
		//
		var privateLock = Math.random();
		
		this.validateLock = function (lock) {
			return (lock == privateLock);
		};
		
		
		this.randomized = false;
		
		
		this.configuration = {
		
			inputNodes: input_nodes,
			hiddenLayers: hidden_layers,
			layerNodeCount: layer_node_count,
			outputNodes: output_nodes,
			targetDomElement: targetDomElement
		
		};
		
		
		//
		// Initialize THREE.js
		//
		this.initTHREE(privateLock);
		
		
		
		//
		// Create a random distribution of values for our new neural network.
		//

		
		this.bufferWidth = 256;
		this.bufferDepth = 256;
		
		//
		//	Network Textures
		//
		
		this.inputTexture = [];
		
		this.inputTexture = new THREE.WebGLRenderTarget(
	        this.bufferWidth,
	        this.bufferDepth, {
	            format: THREE.RGBAFormat,
	            generateMipmaps: false,
	            magFilter: THREE.NearestFilter,
	            type: THREE.FloatType
	        }
	    );
		
		this.weightsTexture = new THREE.WebGLRenderTarget(
	        this.bufferWidth,
	        this.bufferDepth, {
	            format: THREE.RGBAFormat,
	            generateMipmaps: false,
	            magFilter: THREE.NearestFilter,
	            type: THREE.FloatType
	        }
	    );
		
		this.maskTexture = new THREE.WebGLRenderTarget(
	        this.bufferWidth,
	        this.bufferDepth, {
	            format: THREE.RGBAFormat,
	            generateMipmaps: false,
	            magFilter: THREE.NearestFilter,
	            type: THREE.FloatType
	        }
	    );
		
		
		
		
		//
		//	Uniforms
		//
		
		this.networkUniform =  {
	        input_vector: {type: "t", value: this.inputTexture},
	        weights: {type: "t", value: this.weightsTexture},
	        mask: {type: "t", value: this.maskTexture}
	    };
		
		this.attributes = {
			id: {type: 'f', value: []}
		};
		

		//
		//	Materials
		//

	    this.neuralMaterial = new THREE.ShaderMaterial( {
	        uniforms: this.networkUniform,
			attributes: {
			id: {type: 'f', value: []}
		},
	        fragmentShader:com.scottbyrns["WebGLNeuralNetwork"]["shaders/neuralnet.frag"],
	        depthWrite: false
	    });
		
		
		
		
	    this.brain = new THREE.Scene(); // Had to play with the naming :)
		
	    this.neuralPlane = new THREE.Mesh(
			
			new THREE.PlaneGeometry(
				this.bufferWidth,
	            this.bufferDepth
			),
			
			this.neuralMaterial
			
		);
		
		this.brain.add(this.neuralPlane);
		
		var dispSize = {x:window.innerWidth, y:window.innerHeight};
		
		
		this.observer =  new THREE.PerspectiveCamera( 40, dispSize.x/dispSize.y, 0.1, 2000 );
		window.camera = this.observer;
	    window.camera.position.z = 1;
	    window.camera.position.y = 0;
	    window.camera.position.x = 0;

		this.brain.add(window.camera);

	    this.processCamera = new THREE.OrthographicCamera(-this.bufferWidth/2,
	                        this.bufferDepth/2,
	                        this.bufferWidth/2,
	                        -this.bufferDepth/2,
	                        -1,
	                        0
	        );

		this.createRandomDistribution();

		this.render(this);
	},
	
	
	prototype: {
		
		//
		// 
		//
		// @private 
		//
		initTHREE: function (lock) {
			
			// Restricts access to private.
			if (this.validateLock(lock)) {
				
				// Fetch the windows size.
				var dispSize = {
					x: window.innerWidth,
					y:window.innerHeight
				};
				
				// Create our WebGL Renderer
			    this.renderer = new THREE.WebGLRenderer({alpha: true });
				
				// THREE Errors if we don't have our renderer on the window. Not sure why... Required that we have only one perhaps?
				// TODO update THREE to allow renderers to be registered.
				window.renderer = this.renderer;
				
				// Background color of neural network visualization.
			    this.renderer.setClearColor(0x151515, false);
			    this.renderer.setBlending(THREE.AdditiveBlending);
				
				
				// Set our rendering canvas size.
			    this.renderer.setSize(dispSize.x, dispSize.y);


				
				console.log("Appending WebGL Rendering Context to Target Dom Element");
				this.configuration.targetDomElement.appendChild(renderer.domElement);
				
				
			}
			else
			{
				
				console.error("Access is privately restricted to the constructor.")
				
			}
			
		},

		//
		// Create a random distribution of values to seed the neural network.
		//
		createRandomDistribution: function () {

			console.log("Creating Random Distribution");
			
			this.randomDistributionScene = new THREE.Scene();

			
		    this.randomDistributionUniforms = {
				
		        time: {
					type: "f",
					value: 1.0
				},
								// 
				// seed: {
				// 	type: "f",
				// 	value: Math.random()
				// }
				// 
		    };

			
			this.randomDistributionMaterial = new THREE.ShaderMaterial({
				
		        uniforms: this.randomDistributionUniforms,
		        vertexShader:com.scottbyrns["WebGLNeuralNetwork"]["shaders/random_distribution_2d.vert"],
		        fragmentShader:com.scottbyrns["WebGLNeuralNetwork"]["shaders/random_distribution_2d.frag"],
		        depthWrite: false,
		        transparent: true,
				attributes: {
			id: {type: 'f', value: []}
		},
		        blending: THREE.AdditiveBlending
				
			});
			
		    this.randomDistributionPlane = new THREE.Mesh(
			
				new THREE.PlaneGeometry(
					this.bufferWidth,
					this.bufferDepth
				),
				
				this.randomDistributioMaterial
			
			);
		
		    // this.randomDistributionScene.add(this.randomDistributionPlane);
			// this.randomDistributionScene.add(window.camera);
		

		    //var dispPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), dispMaterial);
		    // 
		    var particles = new THREE.Geometry();
		    // 
		    // 
		    for (var i = 0; i < 5000; i++) {
		        particles.vertices.push(new THREE.Vector3(Math.random(), Math.random() , Math.random())); //   i/texSize
		    }
		    // 	
		//    particles.vertices.push(new THREE.Vector3(1, 1, 0));
		//    particles.vertices.push(new THREE.Vector3(0, 0, 0));
		//    particles.vertices.push(new THREE.Vector3(1, 0, 0));

		/*
		    particles.normals.push(new THREE.Vector3(0,0,0));
		    particles.normals.push(new THREE.Vector3(1,0,0));
		    particles.normals.push(new THREE.Vector3(2,0,0));
		    particles.normals.push(new THREE.Vector3(3,0,0));
		*/

		    // var particleMesh = new THREE.ParticleSystem(particles, dispMaterial);

		    var particleMesh = new THREE.ParticleSystem(particles, this.neuralMaterial);

		/*
		    for( var v = 0; v < particleMesh.geometry.vertices.length; v++ ) {
		        dispMaterial.attributes.id.value[v] = v;
		    }

		*/




		    this.neuralPlane.add(particleMesh);
			
		},




		
		fillWeights: function () {
			
		},
		
		fillVector: function () {
			
		},
		
		generateLayer: function () {
			
		},
		
		render: function (context) {
			
			
			if (!this.randomized) {
				
				console.log("Rendering Random Distribution Textures");
				
				
	            // renderer.render(this.randomDistributionScene, this.observer, this.randomDistributioMaterial);
	            renderer.render(this.brain, this.processCamera, this.inputTexture);
	            renderer.render(this.brain, this.processCamera, this.weightsTexture);
	            renderer.render(this.brain, this.processCamera, this.outputTexture);

				
				this.randomized = true;
				
				this.networkUniform.input_vector.value = this.inputTexture;
				this.networkUniform.weights.value = this.weightsTexture;
				this.networkUniform.mask.value = this.maskTexture;
			}
			

					
			// this.randomDistributionMaterial.input_vector.value = this.inputTexture;
			// this.randomDistributionMaterial.weights.value = this.weightsTexture;
			// this.randomDistributionMaterial.mask.value = this.maskTexture;
			
	        this.renderer.setViewport(0,0,this.bufferWidth, this.bufferDepth);

			this.renderer.render(this.brain, window.camera);
			
			window.requestAnimationFrame(function (context) {
				var self = context;
				return function () {
					context.render(self);
				}
			}(context));
		},
		
		
	}
	


});