import * as THREE from "three";
export class LightManager {
  static maxLights = 100;
  static lightData = new Float32Array(LightManager.maxLights * 4);
  static lightDebug = [];
  static lightCount = 0;
  static lightTexture = new THREE.DataTexture(
    LightManager.lightData,
    this.maxLights,
    1,
    THREE.RGBAFormat,
    THREE.FloatType,
  );
  static pixelRatio = 500;
  static materials = new Set();
  static addLight(position, intensity) {
    if (this.lightCount >= this.maxLights) {
      console.warn("Max number of lights reached");
      return;
    }
    const i = this.lightCount * 4;
    this.lightData[i] = position[0];
    this.lightData[i + 1] = position[1];
    this.lightData[i + 2] = position[2];
    this.lightData[i + 3] = intensity;
    this.lightCount++;
    this.lightTexture.minFilter = THREE.NearestFilter;
    this.lightTexture.magFilter = THREE.NearestFilter;
    this.lightTexture.wrapS = THREE.ClampToEdgeWrapping;
    this.lightTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.lightTexture.needsUpdate = true;
    this.updateUniforms();
  }
  static updateUniforms() {
    this.materials.forEach((mat) => {
      mat.uniforms.lightTexture.value = this.lightTexture;
      mat.uniforms.numberOfLights.value = this.lightCount;
      mat.uniforms.pixelRatio.value = this.pixelRatio;
    });
  }
  static registerMaterial(mat) {
    this.materials.add(mat);
    mat.uniforms.lightTexture.value = this.lightTexture;
    mat.uniforms.numberOfLights.value = this.lightCount;
  }
  static updateLight(index, position, intensity) {
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
    this.updateUniforms();

    if (this.lightDebug.length > 0) {
      this.updateDebugLight(
        index,
        new THREE.Vector3(position[0], position[1], position[2]),
      );
    }
  }
  static updateDebugLight(index, newPosition) {
    const light = this.lightDebug.find((l) => l.index === index);

    if (!light) return;

    light.mesh.position.copy(newPosition);
  }
  static getPixelRatio() {
    return this.pixelRatio;
  }
  static setPixelRatio(value) {
    this.pixelRatio = value;
    this.updateUniforms();
  }
  static debugLight(scene) {
    for (let i = 0; i < this.lightCount; i++) {
      const index = i * 4;
      const position = {
        x: this.lightData[index],
        y: this.lightData[index + 1],
        z: this.lightData[index + 2],
      };

      const lightHelper = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial(),
      );

      lightHelper.position.set(position.x, position.y, position.z);

      scene.add(lightHelper);

      this.lightDebug.push({
        index: i,
        mesh: lightHelper,
      });
    }
  }
}
