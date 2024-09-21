export default class Proyectil {
    constructor(context, x, y, width, height, speed) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.isDestroyed = false
    }

    draw() {
        this.context.fillStyle = 'red'; 
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.speed; 
    }
}
