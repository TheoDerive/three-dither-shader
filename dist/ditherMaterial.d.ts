import * as THREE from 'three';
type getMaterialType = {
    width: number;
    height: number;
    isSphere?: boolean;
};
export declare class DitherMaterial {
    private material;
    private decay;
    constructor(decay?: number);
    getMaterial({ width, height, isSphere }: getMaterialType): THREE.ShaderMaterial;
    setDecay(value: number): void;
}
export {};
