import Enemigo from "../enemy.js";

export default class MoustruoVerde extends Enemigo{
    constructor(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, direction) {
        
        const moustruoVerdeRight = new Image();
        moustruoVerdeRight.src = "resource/moustruoVerde.png"; 

        const moustruoVerdeLeft = new Image();
        moustruoVerdeLeft.src = "resource/moustruoVerdeR.png";
        
      
        const spriteImages = {
            right:moustruoVerdeRight,
            left: moustruoVerdeLeft
        };

        super(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, 1, direction, spriteImages, 4);
    }
}