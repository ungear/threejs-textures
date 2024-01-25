import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { addAxes } from "./helpers";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdedede);

const camera = new THREE.PerspectiveCamera( 
  75, window.innerWidth / window.innerHeight, 0.1, 2000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

addAxes(scene, 1000);

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
box.position.set(300,300,0)
const edgesGeometry = new THREE.EdgesGeometry( boxGeometry );
const edgeColor = new THREE.Color(0x000000)
  //.multiplyScalar(Config.Block.EdgeColorMultiplier);
const edgesMaterial = new THREE.LineBasicMaterial( { color: edgeColor}); 
const edges = new THREE.LineSegments( edgesGeometry, edgesMaterial);
box.add(edges)
scene.add( box );

camera.position.set(800, 700, 500);
camera.lookAt(300,200,0);
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();


function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();