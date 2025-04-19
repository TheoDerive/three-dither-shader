import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { DitherMaterial } from "./material/ditherMaterial";
import { LightManager } from "./material/lightManager";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ditherCube = new DitherMaterial()
const ditherSphere = new DitherMaterial()
const ditherPlane = new DitherMaterial()
LightManager.addLight([0, 1, 1], 3)
LightManager.setPixelRatio(200)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 5, 2),
  ditherCube.getMaterial({ width: 2, height: 5 })
)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(),
  ditherSphere.getMaterial({ width: 1, height: 1, isSphere: true })
)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 7),
  ditherPlane.getMaterial({ width: 1, height: 7 })
)

sphere.position.x += 3
plane.position.x -= 3

scene.add(cube)
scene.add(sphere)
scene.add(plane)

camera.position.z = 4;

const clock = new THREE.Clock()
clock.start()

function animate() {
  const elapsedTime = clock.getElapsedTime()
  controls.update();
  
  LightManager.updateLight(0, [
    Math.sin(elapsedTime) * 4,
    1,
    1
  ], 1)

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
