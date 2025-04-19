uniform vec2 meshDimention;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 projectedPosition = projectionMatrix * viewMatrix *  modelPosition;

  vec4 modelNormal = modelMatrix * vec4(normal, 1.0);

  float scaleX = length(vec3(modelMatrix[0].xyz));
  float scaleY = length(vec3(modelMatrix[1].xyz));

  vUv = vec2(uv.x * meshDimention.x, uv.y * meshDimention.y);
  vPosition = modelPosition.xyz;
  vNormal = modelNormal.xyz;

  gl_Position = projectedPosition;
}
