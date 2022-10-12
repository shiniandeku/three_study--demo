import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let sence, camera, mesh, render, axesHelper, controls
const width = window.innerWidth
const height = window.innerHeight
// 初始化函数
function init() {
  // 创建场景
  sence = new THREE.Scene()

  // 创建网格模型
  const geometry = new THREE.BoxGeometry(60, 40, 40) // 创建一个立方体，设置长宽高
  const meterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }) // 创建材质对象，使用基础材质
  mesh = new THREE.Mesh(geometry, meterial)

  // 设置光源
  // 点光源
  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(400, 200, 300)

  // 环境光
  const ambient = new THREE.AmbientLight(0x444444)

  // 添加辅助
  const axesHelper = new THREE.AxesHelper(150)

  //  网格对象，灯光， 辅助对象都需要添加到场景
  sence.add(mesh)
  sence.add(pointLight)
  sence.add(ambient)
  sence.add(axesHelper)

  // 相机

  const k = width / height
  const s = 75

  // 透视相机，近大远小，类似人眼
  camera = new THREE.PerspectiveCamera(s, k, 0.1, 1000)
  camera.position.set(400, 500, 400)
  camera.lookAt(sence.position) //设置相机方向(指向的场景对象)
  //
  render = new THREE.WebGL1Renderer()
  render.setSize(width, height) // 设置渲染尺寸
  document.body.appendChild(render.domElement) // render.domElement 其实就是一个  canvas

  //控制器
  controls = new OrbitControls(camera, render.domElement)
}

// 渲染函数
function renden() {
  mesh.rotation.y += 0.01
  render.render(sence, camera)
  requestAnimationFrame(renden)
}

init()
renden()
