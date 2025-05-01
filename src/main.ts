import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { DitherMaterial } from "./material/ditherMaterial";
import { LightManager } from "./material/lightManager";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight,
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

LightManager.addLight([0, 7, 1], .2)
LightManager.addLight([0, 2, 2], .2)
LightManager.debugLight(scene)

LightManager.setPixelRatio(200)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 5, 2),
  ditherCube.getMaterial(2, 5)
)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(),
  ditherSphere.getMaterial(1, 1, true)
)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 7),
  ditherPlane.getMaterial(1, 2)
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

  cube.position.y = Math.sin(elapsedTime) * 2

  const { y } = cube.position
  LightManager.updateLight(0, [
    0,
    y,
    2
  ], .5)

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
