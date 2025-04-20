import * as THREE from 'three';
import { LightManager } from './lightManager';

const vert = `
uniform vec2 meshDimention;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 projectedPosition = projectionMatrix * viewMatrix *  modelPosition;

  vec4 modelNormal = transpose(inverse(mat3(modelMatrix)));

  vUv = vec2(uv.x * meshDimention.x, uv.y * meshDimention.y);
  vPosition = modelPosition.xyz;
  vNormal = normalize(modelNormal * normal);

  gl_Position = projectedPosition;
}
`

const frag = `
uniform sampler2D lightTexture;
uniform int numberOfLights;
uniform float pixelRatio;
uniform float decayIntencity;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

float dither4x4(vec2 position, float brightness) {
  vec2 pixel = floor(mod((position.xy * pixelRatio)/ 4.0, 4.0));
  int x = int(mod(pixel.x, 4.0));
  int y = int(mod(pixel.y, 4.0));
  int index = x + y * 4;
  float limit = 0.0;

  if (x < 8) {
    if (index == 0) limit = 0.0625;
    if (index == 1) limit = 0.5625;
    if (index == 2) limit = 0.1875;
    if (index == 3) limit = 0.6875;
    if (index == 4) limit = 0.8125;
    if (index == 5) limit = 0.3125;
    if (index == 6) limit = 0.9375;
    if (index == 7) limit = 0.4375;
    if (index == 8) limit = 0.25;
    if (index == 9) limit = 0.75;
    if (index == 10) limit = 0.125;
    if (index == 11) limit = 0.625;
    if (index == 12) limit = 1.0;
    if (index == 13) limit = 0.5;
    if (index == 14) limit = 0.875;
    if (index == 15) limit = 0.375;
  }

  return brightness < limit ? 0.0 : 1.0;
}

void main(){
 float CENTER = 1.0 / float(numberOfLights);

  vec3 light = vec3(0);


  for ( int i = 0; i < numberOfLights; i++ ){

    vec2 uv = vec2((float(i) + CENTER) / float(numberOfLights), CENTER);

    vec4 lightData = texture(lightTexture, uv);


    vec3 lightPosition = lightData.xyz;

    float lightIntencity = lightData.w;

  vec3 lightDelta = lightPosition - vPosition;

  float lightDistance = length(lightDelta);

  vec3 lightDirection = normalize(lightDelta);


float shading = dot(vNormal, lightDirection) * 0.5 + 0.5;
shading = max(shading, 0.0);


  float decay = 1.0 - lightDistance * decayIntencity;
  light += vec3(.8, .3, .8) * lightIntencity * shading * decay;
  }

light = clamp(light, 0.0, 1.0); 

  float grey = dot(light.rgb, vec3(0.299, 0.587, 0.114));

  float threshold = dither4x4(vUv, grey);
  float dither = step(grey, threshold);

  vec3 ambiantLight = vec3(0.0, 0.3, .7) * .1;

  if(light.r < 0.05) {
    gl_FragColor = vec4(vec3(0) + ambiantLight, 1);
  }
  else{
    gl_FragColor = vec4(vec3(dither) + ambiantLight, 1);
  }
}
`

export class DitherMaterial {
    material;
    decay;
    constructor(decay) {
        this.decay = decay || .4;
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                lightTexture: { value: null },
                numberOfLights: { value: 0 },
                pixelRatio: { value: LightManager.getPixelRatio() },
                decayIntencity: { value: this.decay },
                meshDimention: { value: new THREE.Vector2(1, 1) }
            },
            vertexShader: vert,
            fragmentShader: frag
        });
        LightManager.registerMaterial(this.material);
    }
    getMaterial( width, height, isSphere ) {
        const newMeshDimention = new THREE.Vector2(width, height);
        if (isSphere) {
            newMeshDimention.x *= 2;
            newMeshDimention.y *= 2;
        }
        this.material.uniforms.meshDimention.value = newMeshDimention;
        return this.material;
    }
    setDecay(value) {
        this.decay = value;
        this.material.uniforms.decayIntencity.value = value;
    }
}
