import Titulo from "../components/titulo.js";
import SelectScene from "./scenes.js";

export default class SceneGameOver {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this); 
    }

    sceneStart() {
        this.paintScene();
        this.getContentStatic();
        this.listenForKeyPress(); 
    }

    paintScene() {
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas);

        this.context.fillStyle = '#ff4d4d'; 
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    getContentStatic() {
        const titulo = new Titulo(this.context);
        titulo.drawStyledText('Game Over - Presiona "Enter" para reiniciar', this.canvas.width / 6, this.canvas.height / 4, '48px', 'Arial', '#ffffff');
    }

    listenForKeyPress() {
        
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(event) {
    
        if (event.code === 'Enter' || event.key === 'Enter') {
            window.location.reload()
        }
    }

    stopListeningForKeyPress() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
}
