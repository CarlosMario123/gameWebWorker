import Enemigo from "../enemy.js";
export default class Golem extends Enemigo{
    constructor(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, direction) {
        
        const golemRight = new Image();
        golemRight.src = "resource/golem.png"; 

        const golemLeft = new Image();
        golemLeft.src = "resource/golemR.png";
        
        const spriteImages = {
            right: golemRight,
            left: golemLeft
        };

        super(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, 0.5, direction, spriteImages, 50);
       


    }

}