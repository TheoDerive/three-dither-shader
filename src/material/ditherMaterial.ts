import * as THREE from 'three';

import frag from "../shader/ditherFrag.glsl?raw"
import vert from "../shader/ditherVert.glsl?raw"
import { LightManager } from './lightManager';

type getMaterialType = {
  width: number
  height: number
  isSphere?: boolean
}

export class DitherMaterial {
  private material: THREE.ShaderMaterial
  private decay: number

  constructor(decay?: number) {
    this.decay = decay || .4

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        lightTexture: { value: null },
        numberOfLights: { value: 0 },
        pixelRatio: { value: LightManager.getPixelRatio() },
        decayIntencity: { value: this.decay },
        meshDimention: { value: new THREE.Vector2(1, 1)}
      },
      vertexShader: vert,
      fragmentShader: frag
    })

    LightManager.registerMaterial(this.material)
  }

  getMaterial({ width, height, isSphere }: getMaterialType){

    const newMeshDimention = new THREE.Vector2(width, height)

    if(isSphere){
      newMeshDimention.x *= 2
      newMeshDimention.y *= 2
    }

    this.material.uniforms.meshDimention.value = newMeshDimention

    return this.material
  }

  public setDecay(value: number){
    this.decay = value

    this.material.uniforms.decayIntencity.value = value
  }

}

