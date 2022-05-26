import * as THREE from './build/three.module.js';
import {FlyControls} from './jsm/controls/FlyControls.js';

let camera, scene, renderer, controls;
let index = 0;

const clock = new THREE.Clock();

init();

function init(){
  //camera
  camera = new THREE.PerspectiveCamera(40, innerWidth/innerHeight, 1,18000);
  camera.position.z = 5000;
  // camera.lookAt(new THREE.Vector3(0, 1, 4999));

  //scene
  scene = new THREE.Scene();

  //geometry
  const size_base = 100;
  const material = new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    specular: 0xFFFFFF,
                    // flatShading: THREE.FlatShading,
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
  }

  //renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  //flycontrols
  controls = new FlyControls(camera, renderer.domElement);
  controls.movementSpeed = 2000;
  controls.rollSpeed = Math.PI/60;

  console.log(scene.children[1499]);

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

// // canvas 要素の参照を取得する
// const canvas = document.querySelector('#myCanvas');
// // マウス座標管理用のベクトルを作成
const mouse = new THREE.Vector2();
// // マウスイベントを登録
// canvas.addEventListener('mousemove', handleMouseMove);


addEventListener( 'mousemove', (event) => {
  mouse.x = event.clientX / innerWidth *  2 - 1;
  mouse.y = - (event.clientY / innerHeight) *  2 + 1;;
})

// レイキャストを作成
const raycaster = new THREE.Raycaster();

tick();
// 毎フレーム時に実行されるループイベントです
function tick() {

  // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
  raycaster.setFromCamera(mouse, camera);

  // その光線とぶつかったオブジェクトを得る
  const intersects = raycaster.intersectObjects(scene.children);


  scene.children.forEach(element => {
    if (element.type == 'Mesh') {
      
      // console.log(element.position);
      element.position.y += 1;
      element.position.needsUpdate = true;

      if(intersects.length > 0){
        if (intersects[0].object == element) {
          generateCrystal(element);
        }
      }
    }
  });

  // レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

function generateCrystal(element){
  index++;
  if (index % 20 == 0) {
    scene.remove(element);
    const size = element.geometry.parameters.radius;
    const xyz = element.position;

    console.log(clock.elapsedTime);

    const material = new THREE.MeshPhongMaterial({
                      color: 0xFFFFFF,
                      specular: 0xFFFFFF,
                      // flatShading: THREE.FlatShading,
                      // shininess: 100,
                      wireframe: true
                    });

    const geometry = new THREE.SphereGeometry( size, Math.random()*30, Math.random()*30 );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = xyz.x;
    mesh.position.y = xyz.y;
    mesh.position.z = xyz.z;

    scene.add(mesh);
  }
}