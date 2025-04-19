import * as THREE from "three";
export declare class LightManager {
    static maxLights: number;
    private static lightData;
    static lightCount: number;
    private static lightTexture;
    private static pixelRatio;
    private static materials;
    static addLight(position: [number, number, number], intensity: number): void;
    private static updateUniforms;
    static registerMaterial(mat: THREE.ShaderMaterial): void;
    static updateLight(index: number, position: [number, number, number], intensity: number): void;
    static getPixelRatio(): number;
    static setPixelRatio(value: number): void;
}
