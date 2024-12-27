import * as THREE from 'three';


const canvas = document.getElementById('canvasu');


//creatng scene

const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
camera.position.z = 0;

//const box = new THREE.SphereGeometry(  );
//const material = new THREE.PointsMaterial({color:"#c2656d", emissive:'#c2656d', transparent: true,size:0.05});
const material2 = new THREE.PointsMaterial({size:0.02})
//const mesh = new THREE.Points(box, material);


const pg = new THREE.BufferGeometry;
const count = 1000;

const posArray = new Float32Array(count*3);
const velo = new Float32Array(count*3);

for(let i =0;i<count*5;i++){

    posArray[i] =(Math.random()-0.5) * 10;

    velo[i] = 0;

}

pg.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const sky = new THREE.Points(pg,material2);
scene.add(sky);

const light = new THREE.SpotLight(0x006769,100);
light.position.set(1,1,1);
scene.add(light);

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);




const position = pg.getAttribute('position');
let time = 0;
const gravity = -0.0001; // Downward force
const groundLevel = -5; // Level where particles stop


function animate(){
    requestAnimationFrame(animate);

    //mesh.rotation.y += 0.01;
    sky.rotation.y += -0.001;
    if(camera.position.z <1) {
      camera.position.z+=0.01;
    }

    const positions = position.array;
    const velocityArray = velo;

    for (let i = 0; i < count; i++) {
      const yIndex = i * 3 + 1; // y position index
  
      // Apply gravity to velocity
      velocityArray[yIndex] += gravity;
  
      // Update position with velocity
      positions[yIndex] += velocityArray[yIndex];
  
      // Reset particles if they hit the ground
      if (positions[yIndex] < groundLevel) {
        positions[yIndex] = (Math.random() - 0.5) * 10; // Randomize height
        velocityArray[yIndex] = 0; // Reset velocity
      }
    }

    position.needsUpdate = true;


    renderer.render(scene,camera);
    
}
animate();

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});