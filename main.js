import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdedede);


const camera = new THREE.PerspectiveCamera( 
  75, window.innerWidth / window.innerHeight, 0.1, 2000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );

const axesHelper = new THREE.AxesHelper(1000)
scene.add(axesHelper)


// box
const boxTexture = new THREE.TextureLoader().load('/crate.gif');
boxTexture.repeat.set( 3,2 );
boxTexture.wrapT = THREE.RepeatWrapping;
boxTexture.wrapS = THREE.RepeatWrapping;
const boxGeometry = new THREE.BoxGeometry( 500, 500, 100 );
const boxMaterial = new THREE.MeshBasicMaterial( { 
  //color: 0x00ff00,
  map: boxTexture 
} );
const box = new THREE.Mesh( boxGeometry, boxMaterial );
box.position.set(-300,300,-100)
const edgesGeometry = new THREE.EdgesGeometry( boxGeometry );
const edgeColor = new THREE.Color(0x000000)
const edgesMaterial = new THREE.LineBasicMaterial( { color: edgeColor}); 
const edges = new THREE.LineSegments( edgesGeometry, edgesMaterial);
box.add(edges)
scene.add( box );

// box 2
const box2Texture = new THREE.TextureLoader().load('/limestone_flat_textured-Unity/limestone_flat_textured_Base_Color.png', () =>{
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  box2Material.envMap = pmremGenerator.fromEquirectangular(box2Texture).texture
  pmremGenerator.dispose()
});
const box2Normal = new THREE.TextureLoader().load('/limestone_flat_textured-Unity/limestone_flat_textured_Normal.png');
const box2AmbientTexture = new THREE.TextureLoader().load('/limestone_flat_textured-Unity/limestone_flat_textured_Ambient_Occlusion.png');
box2Texture.repeat.set( 1,1 );
box2Texture.repeat.set( 1,1 );
box2Texture.repeat.set( 1,1 );
box2Texture.wrapT = THREE.RepeatWrapping;
box2Texture.wrapS = THREE.RepeatWrapping;
const box2Geometry = new THREE.BoxGeometry(500, 500, 100 );
const box2Material = new THREE.MeshStandardMaterial( { 
  map: box2Texture,
  normalMap: box2Normal,
  aoMap: box2AmbientTexture,
} );
const box2 = new THREE.Mesh( box2Geometry, box2Material );
box2.position.set(750,250,0)
const edges2Geometry = new THREE.EdgesGeometry( box2Geometry );
const edge2Color = new THREE.Color(0x000000)
const edges2Material = new THREE.LineBasicMaterial( { color: edge2Color}); 
const edges2 = new THREE.LineSegments( edges2Geometry, edges2Material);
scene.add( box2 );

// box 3
const box3Texture = new THREE.TextureLoader().load('/brick-wall-unity/brick-wall_albedo.png', () =>{
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  box3Material.envMap = pmremGenerator.fromEquirectangular(box3Texture).texture
  pmremGenerator.dispose()
});
// const box3Texture = new THREE.CubeTextureLoader().load([
//   '/brick-wall-unity/brick-wall_albedo.png', 
//   '/brick-wall-unity/brick-wall_albedo.png', 
//   '/brick-wall-unity/brick-wall_albedo.png', 
//   '/brick-wall-unity/brick-wall_albedo.png', 
//   '/brick-wall-unity/brick-wall_albedo.png', 
//   '/brick-wall-unity/brick-wall_albedo.png', 
// ], () => {
//   const pmremGenerator = new THREE.PMREMGenerator(renderer)
//   box3Material.envMap = pmremGenerator.fromCubemap(box3Texture).texture
//   pmremGenerator.dispose()
// })
const box3Normal = new THREE.TextureLoader().load('/brick-wall-unity/brick-wall_normal-ogl.png');
const box3AmbientTexture = new THREE.TextureLoader().load('/brick-wall-unity/brick-wall_ao.png');
const box3DisplacementTexture = new THREE.TextureLoader().load('/brick-wall-unity/brick-wall_height_edited.png');
box3Texture.wrapT = THREE.RepeatWrapping;
box3Texture.wrapS = THREE.RepeatWrapping;
//const box3Geometry = new THREE.PlaneGeometry(500, 500, 100, 100 );
const box3Geometry = new THREE.BoxGeometry(500, 500, 500, 100, 100, 100 );
const box3Material = new THREE.MeshStandardMaterial( { 
  map: box3Texture,
  normalMap: box3Normal,
  aoMap: box3AmbientTexture,
  displacementMap: box3DisplacementTexture,
  displacementScale: 50,
  displacementBias: -25
} );
const box3 = new THREE.Mesh( box3Geometry, box3Material );
box3.position.set(-660,250,0);
box3.castShadow = true;
box3.receiveShadow = true;
scene.add( box3 );

const floorGeo = new THREE.PlaneGeometry(1000, 1000, 100, 100);
const floor = new THREE.Mesh(
  floorGeo,
  new THREE.MeshStandardMaterial( { 
    color: 0xaaaaaa,
  }),
);
floor.receiveShadow = true;
floor.castShadow = true;
scene.add( floor );

const sphereGeometry = new THREE.SphereGeometry( 15, 32, 32 );
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set(0,0,130)
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add( sphere );

const light = new THREE.PointLight(0xffffff, 1000000, 100000)
light.position.set(-550, 178, 399);
light.castShadow = true;
light.receiveShadow = true;
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 1000; // default

scene.add(light)

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();
camera.position.set(800, 700, 500);
camera.lookAt(300,300,0);
const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );
const gui = new GUI();
const lightFolder = gui.addFolder('Light');
lightFolder.add(light.position, 'x').min(-1000).max(1000);
lightFolder.add(light.position, 'y').min(-1000).max(1000)
lightFolder.add(light.position, 'z').min(-1000).max(1000)
lightFolder.open();

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();
