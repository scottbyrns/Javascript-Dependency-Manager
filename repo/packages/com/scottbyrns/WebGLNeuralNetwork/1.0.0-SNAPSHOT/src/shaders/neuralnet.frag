// Source: http://leenissen.dk/fann/html_latest/files2/gpu-txt.html
#define input_size 4.0
#define output_size 8.0
#define offset 8.0
#define i_delta 0.25
#define i_delta_dev 0.125
//start HERE ¤

//output_size is the number of output neurons
//input_size is the number of (input neurons / 4), rounded up
//offset is the number that the program should decrease the coords with to get coords starting from 0.

//dynamic inputs to the program.
uniform sampler2D input_vector; // inputs
uniform sampler2D weights; //weight matrix
uniform sampler2D mask; //mask connections - not implemented yet

void main(void){
//compiler computations
  // float i_delta = 1.0/input_size;
  float o_delta = 1.0/output_size;

//get the texture coordinates
  float col = gl_FragCoord.x-0.5-offset;
  float row = col*4.0*o_delta;
//initialize the sum vector
  vec4 sum = vec4(0.0,0.0,0.0,0.0);
  vec2 input_tuple;
  vec4 weight_tuple;
  vec4 weight_tuple2;
  vec4 inputVec;
  
  
//iterate over the input vector, texel by texel
  for (float i = i_delta_dev; i < 1.0; i += i_delta){
    input_tuple = vec2(i, 0.0);
  //compute weight texture coordinates
  weight_tuple = vec4(i, row+0.5*o_delta, i, row+1.5*o_delta);
  weight_tuple2 = vec4(i, row+2.5*o_delta, i, row+3.5*o_delta);
  //get input value
  inputVec = texture2D(input_vector, input_tuple);
  //compute the sum for all 4 elements
  sum.r += dot(inputVec, texture2D(weights, weight_tuple.xy));
  sum.g += dot(inputVec, texture2D(weights, weight_tuple.zw));
  sum.b += dot(inputVec, texture2D(weights, weight_tuple2.xy));
  sum.a += dot(inputVec, texture2D(weights, weight_tuple2.zw));
  }
  //return the sigmoid of the sum
  vec4 sigmoid = (1.0/(1.0 + exp(-2.0 * sum))); // ACTIVATION FUNCTION
  gl_FragColor = sigmoid;
}