import * as THREE from "three";

export class LightManager {
  static maxLights = 100;
  private static lightData = new Float32Array(LightManager.maxLights * 4);
  private static lightDebug = [] as { index: number; mesh: THREE.Mesh }[];
  static lightCount = 0;

  private static lightTexture = new THREE.DataTexture(
    LightManager.lightData,
    this.maxLights,
    1,
    THREE.RGBAFormat,
    THREE.FloatType,
  );

  private static pixelRatio = 500;

  private static materials: Set<THREE.ShaderMaterial> = new Set();

  /**
   * Create a new light
   *
   * @param { array } position - Light position: [ x, y, z ]
   * @param { number } intensity - Light intencity
   *
   */
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

    this.lightCount++;
    this.lightTexture.minFilter = THREE.NearestFilter;
    this.lightTexture.magFilter = THREE.NearestFilter;
    this.lightTexture.wrapS = THREE.ClampToEdgeWrapping;
    this.lightTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.lightTexture.needsUpdate = true;

    this.updateUniforms();
  }

  private static updateUniforms() {
    this.materials.forEach((mat) => {
      mat.uniforms.lightTexture.value = this.lightTexture;
      mat.uniforms.numberOfLights.value = this.lightCount;
      mat.uniforms.pixelRatio.value = this.pixelRatio;
    });
  }

  static registerMaterial(mat: THREE.ShaderMaterial) {
    this.materials.add(mat);
    mat.uniforms.lightTexture.value = this.lightTexture;
    mat.uniforms.numberOfLights.value = this.lightCount;
  }

  /**
   * Upadate light values
   *
   * @param { number } index - Light index / id
   * @param { array } position - Light position: [ x, y, z ]
   * @param { number } intensity - Light intencity
   *
   */
  static updateLight(
    index: number,
    position: [number, number, number],
    intensity: number,
  ) {
    const base = index * 4;

    if (index > this.lightCount - 1) {
      throw Error("Index out of bounds");
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

  private static updateDebugLight(index: number, newPosition: THREE.Vector3) {
    const light = this.lightDebug.find((l) => l.index === index);

    if (!light) return;

    light.mesh.position.copy(newPosition);
  }

  static getPixelRatio() {
    return this.pixelRatio;
  }

  /**
   * Upadate light pixelRatio
   *
   * @param { number } value - New pixelRatio value
   *
   */
  static setPixelRatio(value: number) {
    this.pixelRatio = value;

    this.updateUniforms();
  }

  /**
   * Debug light
   *
   * @param { THREE.Scene } scene - The scene where you want the helper be render
   */
  static debugLight(scene: THREE.Scene) {
    for (let i = 0; i < this.lightCount; i++) {
      const position = {
        x: this.lightData[i],
        y: this.lightData[i + 1],
        z: this.lightData[i + 2],
      };

      const lightHelper = new THREE.Mesh(
        new THREE.SphereGeometry(.2, 16, 16),
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
