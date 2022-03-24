//import './style.css';

import * as THREE from 'three';

//import * as THREE from '/node_modules/three';
//import * as THREE from "http://threejs.org/build/three.min.js";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import { BoxGeometry } from './three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//const material = new THREE.MeshStandardMaterial({color: 0xff0000});
const torusTexture = new THREE.TextureLoader().load('red_flow_hi.jpeg');
const material = new THREE.MeshStandardMaterial({map:torusTexture});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const icosGeometry = new THREE.IcosahedronGeometry(1.4);
const icosMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
const icosahedron = new THREE.Mesh(icosGeometry, icosMaterial);

scene.add(icosahedron);

icosahedron.position.x = 10;
icosahedron.position.y = 7;
icosahedron.position.z = 10;

const cylGeometry = new THREE.CylinderGeometry( 2, 2, 8, 32, 30, false, 0 , 2*Math.PI);
const cylMaterial = new THREE.MeshStandardMaterial( {color: 0xfd5602} );
//const cylMaterial = new THREE.TextureLoader().load('black_white.jpg');
const cylinder = new THREE.Mesh(cylGeometry, cylMaterial);

scene.add(cylinder);

cylinder.position.x = 17;
cylinder.position.y = 11;
cylinder.position.z = 14;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(40, 40, 40);

//scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(pointLight, ambientLight);

// Helpers 

/*
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
*/

//const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(270));
  
  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const johnTexture = new THREE.TextureLoader().load('portrait.jpg');
const john = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3), 
  new THREE.MeshBasicMaterial({map: johnTexture})
);

scene.add(john);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), 
  new THREE.MeshStandardMaterial({
    map: moonTexture, 
    normalMap: normalTexture, 
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(12);
moon.position.y = 20;

john.position.z = -5;
john.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  icosahedron.rotation.x += 0.03;
  icosahedron.rotation.y += 0.04;
  icosahedron.rotation.z += 0.03;

  cylinder.rotation.x += 0.02;
  cylinder.rotation.y += 0.01;
  cylinder.rotation.z += 0.02;

  john.rotation.y += 0.01;
  john.rotation.z += 0.01;

  camera.position.z = t *-0.01;
  camera.position.x = t * -0.005;
  camera.position.y = t * -0.005;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  icosahedron.rotation.z += 0.003;

  cylinder.rotation.x += 0.002;
  cylinder.rotation.y += 0.001;
  //cylinder.rotation.z += 0.001;

  moon.rotation.x += 0.005;
  //controls.update();

  renderer.render(scene,camera);
}

animate();
