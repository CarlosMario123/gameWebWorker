import Titulo from "../components/titulo.js";
import Boton from "../components/boton.js";
import SelectScene from "./scenes.js";

export default class SceneStart {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.mouseCanvas = this.mouseCanvas.bind(this); 
    }

    sceneStart() {
        this.paintScene();
        this.getContentStatic();
        this.mouseCanvas(); 
    }

    paintScene() {
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas);

        this.context.fillStyle = '#69b400';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    getContentStatic() {
        const titulo = new Titulo(this.context);
        titulo.drawStyledText('El tanque', this.canvas.width / 2.5, this.canvas.height / 10, '48px', 'Arial', '#24250a');
    }

    mouseCanvas() {
        const botonStart = new Boton(this.context, this.canvas.width / 3, this.canvas.height / 2, 500, 50, 'Start', '#ffffff', '#12613b', 'black', () => {
            SelectScene('war')
        });

     
        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            botonStart.update(mouseX, mouseY);
        });


        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            botonStart.handleClick(mouseX, mouseY);
        });
    }

    cleanup() {
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('click', this.handleClick);
        window.removeEventListener('resize', this.resizeCanvas);
    }
}
