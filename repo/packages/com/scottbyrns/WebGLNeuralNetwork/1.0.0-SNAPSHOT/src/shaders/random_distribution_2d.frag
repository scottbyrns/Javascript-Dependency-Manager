




    #ifdef GL_ES
		precision highp float;
    #endif
	
	
	
	uniform float time;
    varying vec2 vUv;
    
	
	
	


    float rand(vec2 co, float time)
	{
			
		
        return fract(sin(dot(co.xy ,vec2(12.9898,time))) * 43758.5453);
		
		
    }






    void main()
    {


	    vec3 col;
		
		
	    col.r = rand(
			vec2(
				vUv.x,
				vUv.y
			),
			time
		);
		
		
	    col.g = rand(
			vec2(
				vUv.x,
				vUv.y + 1.0
			),
			time
		);
		
		
	    col.b = rand(
			vec2(
				vUv.x,
				vUv.y + 2.0
			),
			time
		);


	    gl_FragColor = vec4(
			col,
			1.0
		);
		
		
    }
	
	
	
	
