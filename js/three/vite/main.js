// howdy yall
//@ts-check
import gsap from 'gsap'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { LoopOnce } from 'three';
//import { Light } from 'three';
const gui = new dat.GUI()
const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegments: 128,
    heightSegments: 128
  }
}
// width gui
gui.add(world.plane, 'width', 1, 64, ).onChange(generatePlane)
 //height gui 
gui.add(world.plane, 'height', 1, 64, ).onChange(generatePlane)
  //segments
gui.add(world.plane, 'widthSegments', 1, 128, ).onChange(generatePlane)  
gui.add(world.plane, 'heightSegments', 1, 128, ).onChange(generatePlane)  

const renderer = new THREE.WebGLRenderer()

//cameras & casters
const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75, 
  innerWidth / innerHeight,
  0.1,
  1000
  )

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const planeGeometry = new THREE.PlaneGeometry(
  world.plane.width,
  world.plane.height,
  world.plane.widthSegments,
  world.plane.heightSegments
  )
const planeMaterial = new THREE.MeshPhongMaterial({
    //color: 0xff0000,
    side: THREE.DoubleSide,
    flatShading: true,  //THREE.FlatShading
    vertexColors: true
  })
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(planeMesh)
generatePlane()

//lighting
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 1, 1)
scene.add(light)

const backLight = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, -1, -1)
scene.add(backLight)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})

const starVertices = []
for (let i = 0; i < 11000; i++) {
  const x = (Math.random() - .05) * 2000
  const y = (Math.random() - .05) * 2000
  const z = (Math.random() - .05) * 2000
  starVertices.push(x, y, z)
}

new OrbitControls(camera, renderer.domElement)
camera.position.z = 50


function generatePlane(){
  planeMesh.geometry.dispose()
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.height, 
    world.plane.height, 
    world.plane.widthSegments, 
    world.plane.heightSegments
    )
}
//vertice position randomization
const {array} = planeMesh.geometry.attributes.position
const randomValues = []
for (let i = 0; i < array.length; i ++) {
  if (i % 3 === 0) {
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]
  
  array[i] = x + (Math.random() -0.5) * 3
  array[i + 1] = y + (Math.random() -0.5) * 3
  array[i + 2] = z + (Math.random() -0.5) * 3
  }
  randomValues.push(Math.random() * Math.PI * 2)
} 

planeMesh.geometry.attributes.position.randomValues = randomValues
planeMesh.geometry.attributes.position.originalPosition =
planeMesh.geometry.attributes.position.array
//colorsnext

const colors = []
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
  colors.push(0, 0.19, 0.4)
}

planeMesh.geometry.setAttribute(
  'color',
  new THREE.BufferAttribute(new Float32Array(colors),3)
)
//}  ?



starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(
  starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial)
scene.add()  

console.log(starVertices);
console.log(starGeometry);
console.log(starMaterial);

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
for (let i = 0; i < array.length; i++) {
  const element = array[i];
  // x
  array[i] = originalPosition[i] + 
    Math.cos(frame + randomValues[i]) * 0.03
  // y
  array[i + 1] = originalPosition[i +1] + 
    Math.sin(frame + randomValues[i + 1]) * 0.03
}
planeMesh.geometry.attributes.position.needsUpdate = true

const intersects = raycaster.intersectObject(planeMesh)
if (intersects.length > 0) {
  const {color} = intersects[0].object.geometry.attributes

    //vertice 1
    color.setX(intersects[0].face.a, 0.1)
    color.setY(intersects[0].face.a, 0.3)
    color.setZ(intersects[0].face.a, 0.3)
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

  renderer.render(scene, camera)

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

  stars.rotation.x += 0.0005
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

gsap.to('#BradyChoate', {
  opacity: 1,
  duration: 2,
  y: 0,
  ease: 'expo'
})
gsap.to('#description', {
  opacity: 1,
  duration: 2,
  delay: 0.3,
  y: 0,
  ease: 'expo'
})
gsap.to('#button1', {
  opacity: 1,
  duration: 2,
  delay: 0.6,
  y: 0,
  ease: 'expo'
})

document.querySelector('#button1')?.addEventListener('click', (e) => {
  e.preventDefault()
  gsap.to('#container', {
    opacity: 0,
  })
})

gsap.to(camera.position, {
  z: 25,
  ease: 'power3.inOut',
  duration: 2
})
gsap.to(camera.rotation, {
  x: 1.57,
  ease: 'power3.inOut',
  duration: 2
})

gsap.to(camera.position, {
  y: 1025,
  ease: 'power3.in',
  duration: 1.5,
  delay: 2
})

addEventListener('resize', () => {
  console.log('resize')
})
