import Tanque from "../modelos/tanque.js";
import { verifyDestroyEnemy, createEnemies } from "../utils/controllerEnemy.js";

export default class SceneWar {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');

        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.update = this.update.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
        this.setPositionTank = this.setPositionTank.bind(this);
        this.getPositionTank = this.getPositionTank.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        this.positionTank = 100;
        this.enemiesDestroyed = 0;
        this.boss = false;

        this.tanque = new Tanque(
            this.context,
            600,
            470,
            150,
            90,
            this.setPositionTank
        );

        this.scenePathImg = "resource/fondo-cosmico.jpg"

        this.enemies = [];
        this.enemyWorker = null;
        this.cronometroWorker = new Worker('src/webWorkers/bonusWorker.js');
        this.sceneWorker = new Worker('src/webWorkers/imageSceneWorker.js');
        this.InitcronometroWorker() 
        this.initChangeScene()
        

        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas);
        this.addEventListeners();

        window.requestAnimationFrame(this.update);
    }

    sceneStart() {
        this.paintScene();
    }

    paintScene() {
        const fondo = new Image();
        fondo.src = this.scenePathImg

        fondo.onload = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(fondo, 0, 0, this.canvas.width, this.canvas.height);
            this.tanque.draw();
            this.enemies.forEach(enemy => enemy.draw());

            this.drawEnemiesDestroyed();
            if (this.boss) {
                this.context.fillStyle = 'red';
                this.context.font = '48px Arial';
                this.context.textAlign = 'center';
                this.context.fillText('A todo Poder!', this.canvas.width / 2, this.canvas.height / 2);
                this.tanque.potenciarShot();
            } else {
                this.tanque.configNormal();
            }
        };

        fondo.onerror = () => {
            console.error('No se pudo cargar la imagen de fondo. Verifica la ruta de la imagen.');
        };
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.paintScene();
    }

    update() {
        this.paintScene();
        this.tanque.move();
        this.tanque.updateProyectiles();
        this.tanque.draw();
     
            this.controllerEnemy();
     
     
   
            requestAnimationFrame(this.update);
  
        
    }

    addEventListeners() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            this.tanque.setDirection('left');
        } else if (event.key === 'ArrowRight') {
            this.tanque.setDirection('right');
        } else if (event.key === ' ') {
            this.tanque.shoot();
        }
    }

    handleKeyUp(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            this.tanque.setDirection('stop');
        }
    }

    setPositionTank(positionX) {
        this.positionTank = positionX;
    }

    getPositionTank() {
        return this.positionTank;
    }

    controllerEnemy() {
        if (this.enemies.length === 0) {
            this.sceneWorker.postMessage({action:"sendImage",countEnemy:this.enemiesDestroyed});
        
            this.enemyWorker = createEnemies(this.context, this.canvas.width, this.canvas.height, this.getPositionTank, this.tanque.destruir, this.enemiesDestroyed, (newEnemies) => {
                this.enemies = newEnemies;
            });
        }

        this.enemies = verifyDestroyEnemy(this.enemies, this.tanque, () => {
            this.enemiesDestroyed++;
        });
    }

    drawEnemiesDestroyed() {
        this.context.font = '24px Arial';
        this.context.fillStyle = 'white';
        this.context.textAlign = 'right';
        this.context.fillText(`Enemigos destruidos: ${this.enemiesDestroyed}`, this.canvas.width - 50, 30);
    }

    handleResetTimer() {
        console.log("Timer reset.");
    }

    InitcronometroWorker() { 

        this.cronometroWorker.onmessage = (e) => {
            const { action, boss } = e.data;
            if (action === 'updateBoss') {
                this.boss = boss;
            } else if (action === 'resetTimer') {
                this.handleResetTimer();
            }
        };

        this.cronometroWorker.postMessage({ action: 'start' });
    }

    initChangeScene(){

        this.sceneWorker.onmessage = (e) => {
            const {action,imgPath} = e.data;

            if(action == "imageScene"){
           
                this.scenePathImg = imgPath
            }

        }
        
    }

    cleanup() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('resize', this.resizeCanvas);
        if (this.enemyWorker) {
            this.enemyWorker.terminate();
        }
        if (this.cronometroWorker) {
            this.cronometroWorker.terminate();
        }

        if(this.sceneWorker){
            this.sceneWorker.terminate()
        }
    }
}
