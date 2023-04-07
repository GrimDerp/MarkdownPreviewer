//howdy

//// @ts-check

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

import * as dat from 'dat.gui'
console.log(dat)
//node
import * as THREE from 'three';
import { Light } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';




const gui = new dat.GUI()
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10
  }
}


console.log(gui)
// width gui
gui.add(world.plane, 'width', 1, 64, ).onChange(generatePlane)
 //height gui 
gui.add(world.plane, 'height', 1, 64, ).onChange(generatePlane)
  //segments
gui.add(world.plane, 'widthSegments', 1, 128, ).onChange(generatePlane)  
gui.add(world.plane, 'heightSegments', 1, 128, ).onChange(generatePlane)  


function generatePlane(){
  planeMesh.geometry.dispose()
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.height, 
    world.plane.height, 
    world.plane.widthSegments, 
    world.plane.heightSegments
    )

  const {array} = planeMesh.geometry.attributes.position
for (let i = 0; i < array.length; i +=3) {
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]

  array[i + 2] = z + Math.random()
  //console.log(array[i])
  }
  console.log(world.plane.height);
}





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
    //gonna put something here at some point
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

/*
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(boxGeometry, material)
scene.add(mesh)
*/
new OrbitControls(camera, renderer.domElement)
camera.position.z = 5

const planeGeometry = new THREE.PlaneGeometry(15, 15, 30, 30)
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    flatShading: true  //THREE.FlatShading
  })
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(planeMesh)

//lighting
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 1)
scene.add(light)
//------------------
const backLight = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, -1)
scene.add(backLight)


console.log(planeMesh.geometry.attributes.position.array)

const {array} = planeMesh.geometry.attributes.position
//gonna adjust the plane's vertices; array length is 363
for (let i = 0; i < array.length; i +=3) {
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]

  array[i + 2] = z + Math.random()

  //console.log(array[i])
}




function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  mesh.rotation.x += 0.031987 * Math.random() +.02
  mesh.rotation.y += 0.0279 * Math.random()
  mesh.position.z += 0.0019 * Math.random()
 // planeMesh.rotation.x += .0279 
  
}
renderer.render(scene, camera)

animate()
