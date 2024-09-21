import Enemigo from "../enemy.js";
import { playSound,stopSound } from "../../utils/sounds.js";

export default class Jinete extends Enemigo {
    constructor(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, direction) {
        
        const jineRight = new Image();
        jineRight.src = "resource/jinete.png"; 

        const jineLeft = new Image();
        jineLeft.src = "resource/jineteR.png";
        
        const spriteImages = {
            right: jineRight,
            left: jineLeft
        };

        super(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, 1, direction, spriteImages, 2);
       

        this.jinetear();
    }

    jinetear() {
     this.sonar()
       
        
        const intervalId = setInterval(() => {
            this.speed += 1;
            
            if (this.x === 4) {
                clearInterval(intervalId);
            }
        }, 600);
    }

    checkCollision(proyectiles) {
        proyectiles.forEach(proyectil => {
            if (!this.enemyDestroy &&
                proyectil.x < this.x + this.width &&
                proyectil.x + proyectil.width > this.x &&
                proyectil.y < this.y + this.height &&
                proyectil.y + proyectil.height > this.y) {

                this.life -= 1;

                if (this.life <= 0) {
                    this.terminarSonar()
                    this.enemyDestroy = true;
                    console.log("Jinete destruido");
                     
                    
                }

                proyectil.isDestroyed = true;
            }
        });
    }
    plus(){
      
    }

    sonar(){
        playSound("galopeo")
       
    }
    terminarSonar(){
        stopSound("galopeo")
    
    }
    
}
