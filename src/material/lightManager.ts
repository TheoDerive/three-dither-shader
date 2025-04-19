import * as THREE from "three"

export class LightManager {
  static maxLights = 100;
  private static lightData = new Float32Array(LightManager.maxLights * 4);
  static lightCount = 0;

  private static lightTexture = new THREE.DataTexture(
    LightManager.lightData,
    LightManager.lightCount,
    1,
    THREE.RGBAFormat,
    THREE.FloatType
  );

  private static pixelRatio = 500;

  private static materials: Set<THREE.ShaderMaterial> = new Set()

  static addLight(position: [number, number, number], intensity: number) {
    if (this.lightCount >= this.maxLights) {
      console.warn("Max number of lights reached");
      return;
    }

    const i = this.lightCount * 4;
    this.lightData[i] = position[0];
    this.lightData[i + 1] = position[1];
    this.lightData[i + 2] = position[2];
    this.lightData[i + 3] = intensity;

    this.lightCount++
    this.lightTexture.image.width = this.lightCount
    this.lightTexture.needsUpdate = true

    this.updateUniforms()
  }

  private static updateUniforms(){
    this.materials.forEach(mat => {
      mat.uniforms.lightTexture.value = this.lightTexture
      mat.uniforms.numberOfLights.value = this.lightCount
      mat.uniforms.pixelRatio.value = this.pixelRatio
    })
  }

  static registerMaterial(mat: THREE.ShaderMaterial) {
    this.materials.add(mat)
    mat.uniforms.lightTexture.value = this.lightTexture
    mat.uniforms.numberOfLights.value = this.lightCount
  }

  static updateLight(index: number, position: [number, number, number], intensity: number) {
    const base = index * 4;

    if (base + 3 >= this.lightData.length) {
      console.warn("Index out of bounds");
      return;
    }

    this.lightData[base] = position[0];
    this.lightData[base + 1] = position[1];
    this.lightData[base + 2] = position[2];
    this.lightData[base + 3] = intensity;

    this.lightTexture.needsUpdate = true;

    this.updateUniforms()
  }

  static getPixelRatio(){
    return this.pixelRatio
  }

  static setPixelRatio(value: number){
    this.pixelRatio = value

    this.updateUniforms()
  }
}
