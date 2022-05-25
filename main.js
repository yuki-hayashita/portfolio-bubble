import './style.css'
import * as THREE from './build/three.module.js';
import {FlyControls} from './jsm/controls/FlyControls.js';
// import { Clock } from './build/three.module';
import { Lensflare, LensflareElement} from './jsm/objects/Lensflare.js'
// import { random } from 'gsap/all';
// import './FlyControls';
// // import { FlatShading } from 'three';
// // import * as dat from 'dat.gui';
// // import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
// // import gsap from 'gsap'

let camera, scene, renderer, controls;

const clock = new THREE.Clock();

init();

function init(){
  //camera
  camera = new THREE.PerspectiveCamera(40, innerWidth/innerHeight, 1,18000);
  camera.position.z = 5000;

  //scene
  scene = new THREE.Scene();

  //geometry
  const size_base = 100;
  const material = new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    specular: 0xFFFFFF,
                    shininess: 50
                  });

  for (let i=0; i<1500; i++) {
    const geometry = new THREE.SphereGeometry( size_base + Math.random()*200, 50, 50 );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 8000 * (2 * Math.random() - 1);
    mesh.position.y = 8000 * (2 * Math.random() - 1);
    mesh.position.z = 8000 * (2 * Math.random() - 1);
    scene.add(mesh);
  }

  //lights
  const light = new THREE.DirectionalLight(0xFFFFFF, 0.03);
  scene.add(light);
  // addLight(0.996, 0.7, 0.5, 0, 0 , -1000);
  // addLight()
  //ye

  addLight(0.8472222, 0.9, 0.5, 0, 0 , -4000);

  for (let i=0; i<8; i++) {
    if (i%2==0) {
      addLight(0.8472222 + Math.random()*0.01, 0.9, 0.5, 8000 * (2 * Math.random() - 1), 8000 * (2 * Math.random() - 1), 8000 * (2 * Math.random() - 1));
    } else {
      addLight(0.5555555 + Math.random()*0.01, 1, 0.5, 8000 * (2 * Math.random() - 1), 8000 * (2 * Math.random() - 1), 8000 * (2 * Math.random() - 1));
    }
  }

  //point light
  function addLight(h, s, l, x, y, z){
    const pLight = new THREE.PointLight(0xFFFFFF, 2, 8000);
    pLight.color.setHSL(h, s, l);
    pLight.position.set(x, y, z);
    scene.add(pLight);

    //flares
    // const textureLoader = new THREE.TextureLoader();
    // const textureFlare = textureLoader.load('./textures/LensFlare.png');
    // const lensFlare = new Lensflare();
    // lensFlare.addElement(
    //   new LensflareElement(textureFlare, 700, 0, pLight.color)
    // )
    // scene.add(lensFlare);
  }

  //renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  //flycontrols
  controls = new FlyControls(camera, renderer.domElement);
  controls.movementSpeed = 8000;
  controls.rollSpeed = Math.PI/60;

  //animate
  animate();
  renderer.render(scene, camera);
}

function animate(){
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  controls.update(delta);
  renderer.render(scene, camera);
}























// // const raycaster = new THREE.Raycaster();
// // const scene = new THREE.Scene();
// // const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1,1000);
// // const renderer = new THREE.WebGLRenderer()

// // // console.log(domElement);
// // renderer.setSize(innerWidth, innerHeight);
// // renderer.setPixelRatio(devicePixelRatio);
// // new OrbitControls(camera, renderer.domElement)
// // camera.position.z = 100;

// // document.body.appendChild(renderer.domElement);

// console.log(THREE);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setPixelRatio(devicePixelRatio);
// document.body.appendChild( renderer.domElement );

// const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1,1000);
// camera.position.z = 10;
// // camera.position.set( 0, 0, 100 );
// // camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();

// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0,0,5);
// const backLight = new THREE.DirectionalLight(0xffffff, 1);
// backLight.position.set(0,0,-5);
// scene.add(light);
// scene.add(backLight);

// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry( 5, 50, 50 ),
//   new THREE.MeshBasicMaterial( {color: 0xFF0000} )
// )

// scene.add(sphere);

// function animate(){
//   requestAnimationFrame(animate);
//   renderer.render( scene, camera );
// }

// animate();

// // const geometry = new THREE.SphereGeometry( 15, 32, 16 );
// // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// // const sphere = new THREE.Mesh( geometry, material );
// // scene.add( sphere );

// // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// // const material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
// // const cube = new THREE.Mesh( geometry, material );
// // scene.add( cube );A