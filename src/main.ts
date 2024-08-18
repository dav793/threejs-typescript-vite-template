import { Engine } from './threejs/engine.js';
import { Scene } from './threejs/scene.js';

const engine = new Engine({
    container: document.getElementById('container'),
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
});

function startRenderLoop() {
    requestAnimationFrame( startRenderLoop );
    engine.renderFrame();
}
startRenderLoop();

const scene = new Scene( engine );
scene.start();

window.addEventListener( 'resize', () => {
    if ( engine )
        engine.onResize( window.innerWidth, window.innerHeight );
} );