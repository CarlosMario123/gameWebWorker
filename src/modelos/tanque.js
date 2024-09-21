import Proyectil from "./proyectil.js";
import { playSound,randonPlusGun } from "../utils/sounds.js";
import SelectScene from "../scenes/scenes.js";
export default class Tanque {
    constructor(context, x, y, width, height,positionX) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

      
        this.imageLeft = new Image();
        this.imageLeft.src = "resource/tanqueReverse.png";

        this.imageRight = new Image();
        this.imageRight.src = "resource/tanque.png";

        this.currentImage = this.imageRight; 
        this.speed = 5;
        this.dx = 0; 
        this.proyectiles = [];
        this.tiempoDisparo = 0;
        this.lastDirection = 'right'; 

        this.cadenciaDisparo = 400;  //90--->potenciado
        this.velocidadProyectil = 1; //30
        this.soundChange = 0
        this.positionX = positionX
    }

    draw() {
       
        this.context.drawImage(this.currentImage, this.x, this.y, this.width, this.height);

        
        this.proyectiles.forEach(proyectil => proyectil.draw());
    }

    move() {
        this.x += this.dx;
        this.positionX(this.x)
        
        if (this.dx > 0) {
            this.currentImage = this.imageRight;
            this.lastDirection = 'right'; 
        } else if (this.dx < 0) {
            this.currentImage = this.imageLeft;
            this.lastDirection = 'left';
        }

      
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.context.canvas.width) this.x = this.context.canvas.width - this.width;
    }

    setDirection(direction) {
        this.dx = direction === 'left' ? -this.speed : (direction === 'right' ? this.speed : 0);
    }

    shoot() {
        const proyectilWidth = 10;
        const proyectilHeight = 5;

        if (Date.now() - this.tiempoDisparo > this.cadenciaDisparo) {
            let proyectilX;
            let proyectilSpeed;

        
            if (this.lastDirection === 'right') {
                proyectilX = this.x + this.width; 
                proyectilSpeed = this.velocidadProyectil; 
            } else if (this.lastDirection === 'left') {
                proyectilX = this.x - proyectilWidth; 
                proyectilSpeed = -this.velocidadProyectil;
            }

            this.proyectiles.push(new Proyectil(
                this.context,
                proyectilX,
                this.y + this.height / 2 - proyectilHeight / 2,
                proyectilWidth,
                proyectilHeight,
                proyectilSpeed
            ));
            
          
              

            this.sonar()
            this.tiempoDisparo = Date.now();
        }
    }

    updateProyectiles() {
        this.proyectiles = this.proyectiles.filter(proyectil => {
            proyectil.update();
            return proyectil.x >= 0 && proyectil.x <= this.context.canvas.width && !proyectil.isDestroyed;
        });
    }

    sonar(){
        if(this.soundChange < 10){
                
            playSound('disparo')
        
         }else if(this.soundChange == 10){
            
           randonPlusGun()
             setTimeout(() => {
                 this.soundChange = 0
             },1000)
         }
         this.soundChange++
    }

    destruir(){
        SelectScene('over')
    }

    potenciarShot(){
        this.cadenciaDisparo = 90;
        this.velocidadProyectil = 30;
    }

    configNormal(){
        this.cadenciaDisparo = 200;  
        this.velocidadProyectil = 10; 
    }

}
