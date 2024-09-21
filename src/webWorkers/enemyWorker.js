import { getRandomInt } from "../utils/randonNumber.js";

self.onmessage = function(e) {
    const { action, data } = e.data;

    switch (action) {
        case 'generateEnemies':
            const enemies = generateEnemies(data.count, data.canvasWidth, data.canvasHeight);
            self.postMessage({ action: 'enemiesGenerated', enemies });
            break;

        default:
            console.error('Acción no reconocida en el Web Worker:', action);
    }
};

function generateEnemies(count, canvasWidth, canvasHeight) {
    const enemies = [];
    const separation = 10;

    const endX = canvasWidth; 
    const defaultY = 470;

    function createEnemies(number,typeEnemy,width,height) {
        const startX = -width; 
        for (let i = 0; i < number; i++) {
            let random = Math.random();
            const x = random > 0.5 ? startX + (separation * i) : endX - (separation * i - width);
            const direction = random > 0.5 ? "right" : "left";

            enemies.push({
                x: x,
                y: defaultY,
                width: width,
                height: height,
                direction: direction,
                type: typeEnemy
            });
        }
    }

    if (count === 0) {
        createEnemies(5,"zombie",150,90);
    } else if (count >= 5 && count < 9) {
        createEnemies(5,"zombie",150,90);
        createEnemies(4,"miniDemon",150,90)
    } else if (count <= 14) {
        createEnemies(getRandomInt(11, 14),"zombie",150,90);
        createEnemies(getRandomInt(2, 3),"miniDemon",150,90)
        createEnemies(getRandomInt(2, 3),"moustruoVerde",150,90)
    } else if (count >= 30 && count <= 40) {
        createEnemies(1,"jinete",150,90);
        createEnemies(getRandomInt(5, 10),"zombie",150,90);
    } else if (count > 35) {
        createEnemies(getRandomInt(5, 10),"zombie",150,90);
    }

    return enemies;
}
