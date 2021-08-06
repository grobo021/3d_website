import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Torus

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(10, 3, 16, 100),
    new THREE.MeshStandardMaterial({
        color: 0xFF6347
    })
);

scene.add(torus);

// Lighting

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
    );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

scene.background = new THREE.TextureLoader().load('./images/space.jpg');

// Objects with cool textures
const dice = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./images/dice.jpg')
    })
)
scene.add(dice);

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('./images/moon.jpg'),
        normalMap: new THREE.TextureLoader().load('./images/normal.jpg')
    })
)
scene.add(moon);

moon.position.z = 30;
moon.position.x = -10;

// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top
    moon.rotation.x += 0.05
    moon.rotation.y += 0.075
    moon.rotation.z += 0.5

    dice.rotation.y += 0.01
    dice.rotation.z += 0.01

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.rotation.y = t * -0.0002
}
document.body.onscroll = moveCamera;

// Animation Loop

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}
animate()
