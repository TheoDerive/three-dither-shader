import * as THREE from 'three';
export declare class DitherMaterial {
    private material;
    private decay;
    constructor();
    /**
    * Get shader material with mesh dimention required
    *
    * @param { number } width - Width of the mesh
    * @param { number } height - Height of the mesh
    * @param { boolean } isSphere - Act diferently if it's a sphere
    *
    */
    getMaterial(width: number, height: number, isSphere?: boolean): THREE.ShaderMaterial;
    /**
    * Set new decay value for a specific light
    *
    * @param { number } value - decay value
    *
    */
    setDecay(value: number): void;
}
