

import SceneGameOver from "./sceneGameOver.js";
import SceneStart from "./sceneStart.js";
import SceneWar from "./sceneWar.js";

export default function SelectScene(id) {

    if (window.currentScene && typeof window.currentScene.cleanup === 'function') {
        window.currentScene.cleanup();
    }


    document.getElementById('gameCanvas').remove();
    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'gameCanvas';
    document.body.appendChild(newCanvas);

    const Scene = allScenes()[id];
    if (Scene) {
        const sceneInstance = new Scene();
        window.currentScene = sceneInstance; 
        sceneInstance.sceneStart();
    } else {
        console.error(`Escena con id "${id}" no encontrada.`);
    }
}

function allScenes() {
    return {
        'start': SceneStart,
        'war': SceneWar,
        'over': SceneGameOver
    };
}
