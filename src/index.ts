import { Engine, Scene, FreeCamera, HemisphericLight, Vector3, MeshBuilder, Mesh,
     StandardMaterial, Color3, Texture, ImportMeshAsync } from "@babylonjs/core";

import "@babylonjs/loaders";
//import { registerBuiltInLoaders } from "babylonjs-loaders/dynamic";

const canvas: any = document.getElementById("renderCanvas");
const engine: Engine = new Engine(canvas, true);

let createScene = function () {

   // registerBuiltInLoaders();
    
    // This creates a basic Babylon Scene object (non-mesh)
    let scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    
    // Our built-in 'ground' shape.
    let ground = MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    const groundMaterial = new StandardMaterial("Ground Material", scene);
    groundMaterial.diffuseColor = Color3.Red();
    
    let groundTexture = new Texture("./assets/textures/checkerboard_basecolor.png", scene);
    groundMaterial.diffuseTexture = groundTexture;
    ground.material = groundMaterial;

    ImportMeshAsync("./assets/meshes/YetiSmall.glb", scene ).then(function( {meshes} ) { 
        
                meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
    });


    return scene;
};
export default createScene

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});