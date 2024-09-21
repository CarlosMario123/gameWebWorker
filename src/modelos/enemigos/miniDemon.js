import Enemigo from "../enemy.js";
export default class MiniDemon extends Enemigo{
    constructor(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, direction) {
        
        const miniDemonRight = new Image();
        miniDemonRight.src = "resource/miniDemon.png"; 

        const miniDemonLeft = new Image();
        miniDemonLeft.src = "resource/miniDemonR.png";
        
      
        const spriteImages = {
            right:miniDemonRight,
            left: miniDemonLeft
        };

        super(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, 3, direction, spriteImages, 2);
    }
}