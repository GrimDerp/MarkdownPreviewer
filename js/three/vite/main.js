/*import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
*/

/*document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
*/

//setupCounter(document.querySelector('#counter'))


//import * as THREE from 'https://unpkg.com/three@0.151.3/build/three.module.js'
// "three/addons/": "https://unpkg.com/three@<0.151.3>/examples/jsm/"


//node
import * as THREE from 'three';
import { Light } from 'three';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//const controls = new OrbitControls( camera, renderer.domElement );
//const loader = new GLTFLoader();

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75, 
  innerWidth / innerHeight,
  0.1,
   1000
   )

const renderer = new THREE.WebGLRenderer(

   )

/*console.log(scene)
console.log(camera)
console.log(renderer)
console.log(boxGeometry)
console.log(material)
console.log(mesh)
*/

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

/*const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(boxGeometry, material)
scene.add(mesh)
*/

camera.position.z = 5

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10)
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 1)

scene.add(planeMesh)
scene.add(light)
//console.log(planeMesh)



function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  //mesh.rotation.x += 0.01
  //mesh.rotation.y += 0.01
  planeMesh.rotation.x += 0.01
}
renderer.render(scene, camera)

animate()
