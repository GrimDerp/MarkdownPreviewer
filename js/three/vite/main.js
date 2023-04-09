// howdy yall
//@ts-check
import gsap from 'gsap'
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { Light } from 'three';
//says its broken but seems to work, i dunno
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//need three scene, then world
const scene = new THREE.Scene()

//cameras & casters
const raycaster = new THREE.Raycaster()

const camera = new THREE.PerspectiveCamera(
  75, 
  innerWidth / innerHeight,
  0.1,
  1000
  )


const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

renderer.render(scene, camera)

new OrbitControls(camera, renderer.domElement)
camera.position.z = 5

const gui = new dat.GUI()
const world = {
  plane: {
    width: 19,
    height: 19,
    widthSegments: 17,
    heightSegments: 17
  }
}

//gui action?
// width gui
gui.add(world.plane, 'width', 1, 64, ).onChange(generatePlane)
 //height gui 
gui.add(world.plane, 'height', 1, 64, ).onChange(generatePlane)
  //segments
gui.add(world.plane, 'widthSegments', 1, 128, ).onChange(generatePlane)  
gui.add(world.plane, 'heightSegments', 1, 128, ).onChange(generatePlane)  


//action?
function generatePlane(){
  planeMesh.geometry.dispose()
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.height, 
    world.plane.height, 
    world.plane.widthSegments, 
    world.plane.heightSegments
    )
}

const planeGeometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments, 19, 19, 17, 17)
const planeMaterial = new THREE.MeshPhongMaterial({
    //color: 0xff0000,
    side: THREE.DoubleSide,
    flatShading: true,  //THREE.FlatShading
    vertexColors: true
  })
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(planeMesh)

//vertice position randomization
const {array} = planeMesh.geometry.attributes.position
const randomValues = []
for (let i = 0; i < array.length; i ++) {
  if (i % 3 === 0) {
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]
  
  array[i] = x + (Math.random() -0.5)
  array[i + 1] = y + (Math.random() -0.5)
  array[i + 2] = z + Math.random()
  }
  randomValues.push(Math.random() - 0.5)
} 

planeMesh.geometry.attributes.position.randomValues = randomValues
planeMesh.geometry.attributes.position.originalPosition =
planeMesh.geometry.attributes.position.array

//color attribute addition
const colors = []
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
  colors.push(0, .19, 0.4)
}
planeMesh.geometry.setAttribute(
  'color', 
  new THREE.BufferAttribute(new Float32Array(colors), 3)
)
//lighting
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 1)
scene.add(light)

const backLight = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, -1)
scene.add(backLight)

const mouse = {
  x: undefined,
  y: undefined
}

let frame = 0
function animate(){
requestAnimationFrame(animate)
renderer.render(scene, camera)
//animation loop
raycaster.setFromCamera(mouse, camera)
frame += 0.01

const { 
  array,
  originalPosition,
  randomValues 
} = planeMesh.geometry.attributes.position
for (let i = 0; i < array.length; i+=3) {
  const element = array[i];
  // x
  array[i] = originalPosition[i] + 
    Math.cos(frame + randomValues[i]) * 0.003
// y
  array[i + 1] = originalPosition[i +1] + 
    Math.sin(frame + randomValues[i + 1]) * 0.003
}
planeMesh.geometry.attributes.position.needsUpdate = true

const intersects = raycaster.intersectObject(planeMesh)
if (intersects.length > 0) {
  const {color} = intersects[0].object.geometry.attributes

    //vertice 1
    color.setX(intersects[0].face.a, 0.1)
    color.setY(intersects[0].face.a, 0.5)
    color.setZ(intersects[0].face.a, 1)
    //vertice 2
    color.setX(intersects[0].face.b, 0.1)
    color.setY(intersects[0].face.b, 0.5)
    color.setZ(intersects[0].face.b, 1)
      //vertice 3
    color.setX(intersects[0].face.c, 0.1)
    color.setY(intersects[0].face.c, 0.5)
    color.setZ(intersects[0].face.c, 1)
  //needsUpdate = true
  intersects[0].object.geometry.attributes.color.needsUpdate = true






    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4
    }

    const hoverColor = {
      r: 0.1,
      g: 0.5,
      b: 1
    }

    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      onUpdate: () => {
        //vertice 1
      color.setX(intersects[0].face.a, hoverColor.r)
      color.setY(intersects[0].face.a, hoverColor.g)
      color.setZ(intersects[0].face.a, hoverColor.b)
      //vertice 2
      color.setX(intersects[0].face.b, hoverColor.r)
      color.setY(intersects[0].face.b, hoverColor.g)
      color.setZ(intersects[0].face.b, hoverColor.b)
        //vertice 3
      color.setX(intersects[0].face.c, hoverColor.r)
      color.setY(intersects[0].face.c, hoverColor.g)
      color.setZ(intersects[0].face.c, hoverColor.b)
      color.needsUpdate = true
      }
    })
  }
}


animate()



//listeners
addEventListener('mousemove', (event) => 
{
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = (event.clientY / innerHeight) * 2 + 1
  //console.log(event.clientY)
  //console.log(mouse)
})

