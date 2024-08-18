import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Engine } from './engine.js';

const loadingManager = new THREE.LoadingManager();
const gltfLoader = new GLTFLoader( loadingManager );
const textureLoader = new THREE.TextureLoader( loadingManager );

export class Scene {

    engine: Engine;
    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;
    cameraControls: OrbitControls;
    directionalLight: THREE.DirectionalLight;
    directionalLightHelper: THREE.DirectionalLightHelper;

    constructor(engine: Engine) {
        this.engine = engine;
        this.scene = new THREE.Scene();
    }

    start() {

        const fov = 45;
        const clippingPlane = {
            near: 0.1,
            far: 1000
        };
        this.camera = new THREE.PerspectiveCamera( fov, this.engine.width / this.engine.height, clippingPlane.near, clippingPlane.far );
        this.camera.position.set( 0, 0, 0 );
        this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
        this.scene.add( this.camera );

        this.cameraControls = new OrbitControls( this.camera, this.engine.renderer.domElement );
        this.cameraControls.minDistance = 0.5;
        this.cameraControls.maxDistance = 500;
        this.cameraControls.update();

        this.engine.startScene( this );
        this.setupTestScene();
    }

    onResize() {
        if ( !this.camera )
            return;

        this.camera.aspect = this.engine.width / this.engine.height;
        this.camera.updateProjectionMatrix();
    }

    renderFrame() {
        if ( !this.scene || !this.camera )
            return;

        this.engine.renderer.render( this.scene, this.camera );
    }

    // set up your scene here
    private setupTestScene() {
        this.camera.position.set( -5, 5, -5 );
        this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
        this.directionalLight.position.set( -5, 10, -2.5 );
        this.directionalLight.lookAt( new THREE.Vector3( 0, 0, 0 ) );
        this.scene.add( this.directionalLight );

        this.directionalLightHelper = new THREE.DirectionalLightHelper( this.directionalLight, 1 );
        this.scene.add( this.directionalLightHelper );

        const mesh = new THREE.Mesh( 
            new THREE.BoxGeometry( 1, 1, 1 ), 
            new THREE.MeshPhongMaterial({ color: 0xffffff })
        );
        mesh.position.set( 0, 0, 0 );
        this.scene.add( mesh );
    }
}
