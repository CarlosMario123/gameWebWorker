export default class Enemigo {
    constructor(context, x, y, spriteWidth, spriteHeight, positionEnemy, acabar, speed, direction, spriteImages,life) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = spriteWidth;
        this.height = spriteHeight;

    
        this.spriteSheets = spriteImages; 

        this.positionEnemy = positionEnemy;
        this.attackRange = 130;
        this.acabar = acabar;
        this.enemyDestroy = false;
        this.proyectiles = [];
        this.speed = speed;
        this.direction = direction;
        this.life = life;
    }

    draw() {
        if (this.enemyDestroy) return;

    
        this.context.drawImage(this.spriteSheets[this.direction], this.x, this.y, this.width, this.height);

        if (this.direction === 'right') {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }

        
        if (this.isBeingAttacked()) {
            this.acabar();
        }
    }

    isBeingAttacked() {
        const enemyX = this.x;
        const tankX = this.positionEnemy();
        return Math.abs(tankX - enemyX) < this.attackRange;
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
                    this.enemyDestroy = true;
                }

                proyectil.isDestroyed = true;
            }
        });
    }
    plus(){
        //funcion para ejecutar algun plus del enemigo
    }
}
