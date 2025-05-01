import * as THREE from "three";
export declare class LightManager {
    static maxLights: number;
    private static lightData;
    private static lightDebug: { index: number, mesh: THREE.Mesh }[];
    static lightCount: number;
    private static lightTexture;
    private static pixelRatio;
    private static materials;
    /**
     * Create a new light
     *
     * @param { array } position - Light position: [ x, y, z ]
     * @param { number } intensity - Light intencity
     *
     */
    static addLight(position: [number, number, number], intensity: number): void;
    private static updateUniforms;
    static registerMaterial(mat: THREE.ShaderMaterial): void;
    /**
     * Upadate light values
     *
     * @param { number } index - Light index / id
     * @param { array } position - Light position: [ x, y, z ]
     * @param { number } intensity - Light intencity
     *
     */
    static updateLight(index: number, position: [number, number, number], intensity: number): void;
    private static updateDebugLight;
    static getPixelRatio(): number;
    /**
     * Upadate light pixelRatio
     *
     * @param { number } value - New pixelRatio value
     *
     */
    static setPixelRatio(value: number): void;
    /**
     * Debug light
     *
     * @param { THREE.Scene } scene - The scene where you want the helper be render
     */
    static debugLight(scene: THREE.Scene): void;
}
