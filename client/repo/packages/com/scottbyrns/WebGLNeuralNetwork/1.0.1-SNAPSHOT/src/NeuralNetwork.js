com.scottbyrns["WebGLNeuralNetwork"].NeuralNetwork({
	
	
	//
	// Setup the modules installation configuration.
	//
	// @parameter installer An installer instance from the PackageManager. This 
	//            will provide the setup with access to the in progress installation.
	//
	setup: function (installer) {
		
		com.scottbyrns["WebGLNeuralNetwork"].dispSize = {
			
			x: window.innerWidth,
			y: window.innerHeight
			
		};
		
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
		
		
		this.randomized = false;
		
		
		this.configuration = {
		
			inputNodes: input_nodes,
			hiddenLayers: hidden_layers,
			layerNodeCount: layer_node_count,
			outputNodes: output_nodes,
			targetDomElement: targetDomElement
		
		};
		
		
		
		
		//
		// Create a random distribution of values for our new neural network.
		//
		this.bufferWidth = 256;
		this.bufferDepth = 256;
		
		
		
		
		//
		// Initialize THREE.js
		//
		this.initTHREE();
		this.setupCamera();
		this.createRandomDistributionScene();
		this.createNeuralScene();
		// this.render(this);
	},
	
	
	prototype: {
		
		setupCamera: function () {
			// 
			// Setup Camera
			// 
			this.observer =  new THREE.PerspectiveCamera(
				40,
				com.scottbyrns["WebGLNeuralNetwork"].dispSize.x / com.scottbyrns["WebGLNeuralNetwork"].dispSize.y,
				0.1,
				2000
			);

		    this.observer.position.z = 1;
		    this.observer.position.y = 0;
		    this.observer.position.x = 0;		
		
			window.camera = this.observer;
		},
		
		//
		// 
		//
		// @private 
		//
		initTHREE: function (lock) {
		
				
				// Fetch the windows size.
				com.scottbyrns["WebGLNeuralNetwork"].dispSize = {
					x: window.innerWidth,
					y: window.innerHeight
				};
				
				// Create our WebGL Renderer
			    this.renderer = new THREE.WebGLRenderer({alpha: false });
				
				// THREE Errors if we don't have our renderer on the window. Not sure why... Required that we have only one perhaps?
				// TODO update THREE to allow renderers to be registered.
				window.renderer = this.renderer;
				
				// Background color of neural network visualization.
			    this.renderer.setClearColor(0x151515, false);
			    this.renderer.setBlending(THREE.AdditiveBlending);
				
				
				// Set our rendering canvas size.
			    this.renderer.setSize(com.scottbyrns["WebGLNeuralNetwork"].dispSize.x, com.scottbyrns["WebGLNeuralNetwork"].dispSize.y);


				
				console.log("Appending WebGL Rendering Context to Target Dom Element");
				this.configuration.targetDomElement.appendChild(renderer.domElement);

			
				this.inputTexture = new THREE.WebGLRenderTarget(
					this.bufferWidth,
					this.bufferDepth,
					{
			            format: THREE.RGBFormat,
			            generateMipmaps: false,
			            magFilter: THREE.NearestFilter,
			            type: THREE.FloatType
			        }
			    );
				
				
			    this.processCamera = new THREE.OrthographicCamera(
								-this.bufferWidth/2,
		                        this.bufferDepth/2,
		                        this.bufferWidth/2,
		                        -this.bufferDepth/2,
		                        -1,
		                        0
		        );
				

		},
		
		createNeuralScene: function () {
			this.neuralScene = new THREE.Scene();
			this.neuralScene.add( new THREE.AmbientLight( 0xffffff ) );
			// console.log(this.inputTexture);

			this.neuralUniforms = {
		        time: 	{ type: "f", value: Math.random() },
				input_vector: { type: "t", value: this.inputTexture }
		    };
			
			
			
			this.neuralMaterial = new THREE.ShaderMaterial( {
				
				
		        uniforms: this.neuralUniforms,
				vertexShader:com.scottbyrns["WebGLNeuralNetwork"]["shaders/neuralnet.vert"],
				fragmentShader:com.scottbyrns["WebGLNeuralNetwork"]["shaders/neuralnet.frag"],
		        depthWrite: false,
				map: this.inputTexture
				
				
			} );
			
			
			
	        this.neuralPlane = new THREE.Mesh(
				
				new THREE.PlaneGeometry(this.bufferWidth, this.bufferDepth),
				
				this.neuralMaterial
			);
			
	        this.neuralPlane.overdraw = false;
			
	        this.neuralScene.add(this.neuralPlane);
			
			
	        this.renderer.setViewport(this.bufferWidth, this.bufferDepth,this.bufferWidth, this.bufferDepth);
			
			this.neuralUniforms.input_vector.value = this.inputTexture;
            this.renderer.render(this.neuralScene, this.processCamera);
			
			// this.render(this);
		},
		
		createRandomDistributionScene: function () {
			
			this.randomDistributionScene = new THREE.Scene();

			
			this.randomDistributionUniforms = {
		        time: 	{ type: "f", value: Math.random() },
				input_vector: { type: "t", value: this.inputTexture}
		    };

			this.randomDistributionMaterial = new THREE.ShaderMaterial( {
				
		        uniforms: this.randomDistributionUniforms,
				attributes: {
					
				},
				vertexShader:com.scottbyrns["WebGLNeuralNetwork"]["shaders/random_distribution_2d.vert"],
				fragmentShader:com.scottbyrns["WebGLNeuralNetwork"]["shaders/random_distribution_2d.frag"],
		        depthWrite: false,
				map: this.inputTexture
				
			});
			
	        this.plane = new THREE.Mesh(
				
				new THREE.PlaneGeometry(this.bufferWidth, this.bufferDepth),
				
				this.randomDistributionMaterial
			);
			
	        this.plane.overdraw = false;
			
	        this.randomDistributionScene.add(this.plane);
	        this.renderer.setViewport(this.bufferWidth, this.bufferDepth,this.bufferWidth, this.bufferDepth);
			
			this.randomDistributionUniforms.input_vector.value = this.inputTexture;
            this.renderer.render(this.randomDistributionScene, this.processCamera);
			
			
			// var renderModelGlow = new THREE.RenderPass( this.randomDistributionScene, window.processCamera);
			// console.log("Render Pass:", renderModelGlow);
			// this.render(this);
		},

		
		render: function (context) {
								// input_vector: { type: "t", value: 0, texture:this.inputTexture}
			this.randomDistributionMaterial.uniforms.input_vector.value = this.texture;
			if (!this.randomized) {

				console.log("Rendering Random Distribution Textures");

	            // this.renderer.render(this.randomDistributionScene, window.camera, this.inputTexture);

				this.randomized = true;
			}

					
			// this.randomDistributionMaterial.uniforms.input_layer.value = this.inputTexture;
			// this.randomDistributionMaterial.weights.value = this.weightsTexture;
			// this.randomDistributionMaterial.mask.value = this.maskTexture;
			
			
	        this.renderer.setViewport(this.bufferWidth, this.bufferDepth,this.bufferWidth, this.bufferDepth);

			this.renderer.render(this.neuralScene, window.camera);

			window.requestAnimationFrame(function (context) {
				var self = context;
				return function () {
					context.render(self);
				}
			}(context));
		},
		
		
	}
	


});