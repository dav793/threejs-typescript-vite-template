import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import { Scene } from './scene';

export class Engine {

    renderer: THREE.WebGLRenderer;
    stats: Stats;
    elapsedTime: number;
    clock = new THREE.Clock();

    scene: Scene;

    constructor( private config: {
        container: HTMLElement,
        width: number,
        height: number,
        devicePixelRatio: number
    } ) {

        this.stats = new Stats();
        this.config.container.appendChild( this.stats.dom );

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.NoToneMapping;

        this.renderer.setPixelRatio( this.config.devicePixelRatio );
        this.renderer.setSize( this.config.width, this.config.height );
        this.config.container.appendChild( this.renderer.domElement );

        this.elapsedTime = 0;
    }

    onResize(width: number, height: number) {
        this.config.width = width;
        this.config.height = height;
        
        if ( this.scene )
            this.scene.onResize();

        this.renderer.setSize( width, height );
    }

    renderFrame() {
        if ( this.scene )
            this.scene.renderFrame();

        if ( this.stats )
            this.stats.update();

        this.elapsedTime = this.clock.getElapsedTime();
    }

    startScene( scene: Scene ) {
        this.scene = scene;
    }

    get width() {
        return this.config.width;
    }

    get height() {
        return this.config.height;
    }

    get devicePixelRatio() {
        return this.config.devicePixelRatio;
    }
}