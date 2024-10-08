import "./style.css"
import * as THREE from "three"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import space from "./space.jpg"
import moonPhoto from "./moon.jpg"
import moonNormal from "./normal.jpg"
import ainurPhoto from "./ainur.jpg"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 32, 32)
  const material = new THREE.MeshStandardMaterial({ color: "white" })
  const sphere = new THREE.Mesh(geometry, material)

  sphere.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50)

  scene.add(sphere)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load(space)
scene.background = spaceTexture

const ainurTexture = new THREE.TextureLoader().load(ainurPhoto)

const ainur = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: ainurTexture }))
scene.add(ainur)

const moonTexture = new THREE.TextureLoader().load(moonPhoto)
const normalTexture = new THREE.TextureLoader().load(moonNormal)
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
)
scene.add(moon)

moon.position.z = 30
moon.position.setX(-10)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  ainur.rotation.y += 0.01
  ainur.rotation.z += 0.01

  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.rotation.y = t * -0.0002
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()

  renderer.render(scene, camera)
}

animate()
