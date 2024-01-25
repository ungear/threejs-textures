import * as THREE from 'three';

const AXIS_X_COLOR = 0xff0000;
const AXIS_Y_COLOR = 0x00ff00;
const AXIS_Z_COLOR = 0x0000ff;

export function addAxes(scene, length = 30) {
  const materialX = new THREE.LineBasicMaterial({ color: AXIS_X_COLOR });
  const geometryX = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(length, 0, 0)
  ]);
  const xAxis = new THREE.Line(geometryX, materialX);
  xAxis.name = "xAxis";

  const materialY = new THREE.LineBasicMaterial({ color: AXIS_Y_COLOR });
  const geometryY = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, length, 0)
  ]);
  const yAxis = new THREE.Line(geometryY, materialY);
  yAxis.name = "yAxis";

  const materialZ = new THREE.LineBasicMaterial({ color: AXIS_Z_COLOR });
  const geometryZ =  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, length)
  ]);
  const zAxis = new THREE.Line(geometryZ, materialZ);
  zAxis.name = "zAxis";

  scene.add(xAxis);
  scene.add(yAxis);
  scene.add(zAxis);
}