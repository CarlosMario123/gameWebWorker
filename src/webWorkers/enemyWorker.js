import { getRandomInt } from "../utils/randonNumber.js";
import { generateNGolem } from "../utils/generateNumEnemies.js";

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

    let defaultY = 470;

    function createEnemies(number,typeEnemy,width,height) {
        const startX = -width; 
        for (let i = 0; i < number; i++) {
            let random = Math.random();
            let x = random > 0.5 ? startX + (separation * i) : endX - (separation * i - width);
            const direction = random > 0.5 ? "right" : "left";

            if(typeEnemy == "golem"){
                defaultY = 350
               x = random > 0.5 ? startX : endX ;
            }else{
                defaultY = 470
            }

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
    } else if (count <= 30) {
        createEnemies(getRandomInt(11, 14),"zombie",150,90);
        createEnemies(getRandomInt(2, 3),"miniDemon",150,90)
        createEnemies(getRandomInt(2, 3),"moustruoVerde",150,90)
    } else if (count >= 30 && count <= 43) {
        createEnemies(1,"jinete",150,90);
        createEnemies(getRandomInt(5, 10),"zombie",150,90);
    }else if(count >= 43 && count <= 70){
        createEnemies(1,"golem",250,300);
        createEnemies(getRandomInt(10, 15),"zombie",150,90);
    } else if (count > 70 ) {
        createEnemies(generateNGolem(count),"golem",250,300);
        createEnemies(generateNGolem(count) * 2,"jinete",150,90);
        createEnemies(generateNGolem(count) * 3,"miniDemon",150,90)
        createEnemies(generateNGolem(count) * 4,"moustruoVerde",150,90)
        createEnemies(generateNGolem(count) * 6,"zombie",150,90)

    }

    return enemies;
}



