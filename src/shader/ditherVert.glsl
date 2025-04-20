uniform vec2 meshDimention;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 projectedPosition = projectionMatrix * viewMatrix *  modelPosition;

  mat3 modelNormal = transpose(inverse(mat3(modelMatrix)));

  vUv = vec2(uv.x * meshDimention.x, uv.y * meshDimention.y);
  vPosition = modelPosition.xyz;
  vNormal = normalize(modelNormal * normal);

  gl_Position = projectedPosition;
}
