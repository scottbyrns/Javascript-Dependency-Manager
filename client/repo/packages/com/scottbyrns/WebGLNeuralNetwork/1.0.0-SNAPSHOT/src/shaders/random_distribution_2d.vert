


    // switch on high precision floats
    #ifdef GL_ES
	
		precision highp float;
		
    #endif




    varying vec2 vUv;



    void main()
    {
		
		
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( vec2(input_layer, 1.0), 1.0 );
		
		
    }


