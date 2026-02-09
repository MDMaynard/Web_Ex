import { Engine, Scene, ArcRotateCamera, Vector3, VideoDome,  WebXRDefaultExperience } from "@babylonjs/core";

import "@babylonjs/loaders";

const canvas: any = document.getElementById("renderCanvas");
const engine: Engine = new Engine(canvas, true);

const createScene = () => {
       
    // This creates a basic Babylon Scene object (non-mesh)
    const scene: Scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    const camera: ArcRotateCamera = new ArcRotateCamera("camera1", -Math.PI /2, Math.PI / 2, 5, Vector3.Zero(), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // video Dome
    const videoDome = new VideoDome("videoDome", "./assets/photoDomes/solarProbeMission.mp4", { resolution: 32, clickToPlay: true }, scene );
    
    // XR enable.
    const xrHelper = scene.createDefaultXRExperienceAsync();
    

    return scene;
};
export default createScene

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});