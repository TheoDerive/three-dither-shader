import * as THREE from "three";

import frag from "../shader/ditherFrag.glsl?raw";
import vert from "../shader/ditherVert.glsl?raw";
import { LightManager } from "./lightManager";

export class DitherMaterial {
  private material: THREE.ShaderMaterial;
  private decay: number;

  constructor() {
    this.decay = 0.4;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        lightTexture: { value: null },
        numberOfLights: { value: 0 },
        pixelRatio: { value: LightManager.getPixelRatio() },
        decayIntencity: { value: this.decay },
        meshDimention: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: vert,
      fragmentShader: frag,
    });

    LightManager.registerMaterial(this.material);
  }

  /**
   * Get shader material with mesh dimention required
   *
   * @param { number } width - Width of the mesh
   * @param { number } height - Height of the mesh
   * @param { boolean } isSphere - Act diferently if it's a sphere
   *
   */
  getMaterial(width: number, height: number, isSphere?: boolean) {
    const newMeshDimention = new THREE.Vector2(width, height);

    if (isSphere) {
      newMeshDimention.x *= 2.5;
      newMeshDimention.y *= 2.5;
    }

    this.material.uniforms.meshDimention.value = newMeshDimention;

    return this.material;
  }

  /**
   * Set new decay value for a specific light
   *
   * @param { number } value - decay value
   *
   */
  public setDecay(value: number) {
    this.decay = value;

    this.material.uniforms.decayIntencity.value = value;
  }
}
