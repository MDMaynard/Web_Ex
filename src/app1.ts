import { Engine, Scene, ArcRotateCamera, Vector3, VideoDome, PhotoDome,  WebXRDefaultExperience, WebXRFeatureName,
    TransformNode } from "@babylonjs/core";

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

    // VideoDome
    // const videoDome = new VideoDome("videoDome", "./assets/photoDomes/solarProbeMission.mp4", { resolution: 32, clickToPlay: true }, scene );
    
    // PhotoDome
    const photoDome = new PhotoDome( "testDome", "assets/photoDomes/360photo.jpg", { resolution: 32, size: 1000, useDirectMapping: false }, scene );
    photoDome.fovMultiplier = 2.0;
        
    // XR enable.
    //const xrHelper = scene.createDefaultXRExperienceAsync();
    scene.createDefaultXRExperienceAsync({ disableTeleportation: true }).then((xr) => {
    
        const xrRoot = new TransformNode("xrRoot", scene);
        xr.baseExperience.camera.parent = xrRoot;
        xr.baseExperience.featuresManager.enableFeature( 
        WebXRFeatureName.WALKING_LOCOMOTION, "latest", { locomotionTarget: xrRoot });
    });
    

    return scene;
};
export default createScene

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});