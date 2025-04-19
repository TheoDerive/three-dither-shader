import * as THREE from "three";
export declare class LightManager {
    static maxLights: number;
    private static lightData;
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
    static getPixelRatio(): number;
    /**
    * Upadate light pixelRatio
    *
    * @param { number } value - New pixelRatio value
    *
    */
    static setPixelRatio(value: number): void;
}
