import Enemigo from "../enemy.js";

export default class Zombie extends Enemigo {
    constructor(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, direction) {
        
        const zombieRight = new Image();
        zombieRight.src = "resource/zombie.png"; 

        const zombieLeft = new Image();
        zombieLeft.src = "resource/zombieR.png";
        
      
        const spriteImages = {
            right: zombieRight,
            left: zombieLeft
        };

        super(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, 2, direction, spriteImages, 1);
    }
}
