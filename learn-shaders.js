import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";

const scene = new THREE.Scene();

let ScreenSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
scene.add(camera);

const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(10, 10, 10);
scene.add(light);

// main part
const geometry = new THREE.IcosahedronGeometry(1, 5);
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const ico = new THREE.Mesh(geometry, material);
scene.add(ico);

// end of main part

const canvas = document.querySelector(".learn-shaders");

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  ScreenSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  camera.aspect = ScreenSize.width / ScreenSize.height;
  camera.updateProjectionMatrix();

  renderer.setSize(ScreenSize.width, ScreenSize.height);
});

const loop = () => {
  // controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
