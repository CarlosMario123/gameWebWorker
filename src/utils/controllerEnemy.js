import FactoryEnemigos from "../modelos/enemigos/factoryEnemigos.js";


export function createEnemies(context,canvasWidth,canvasH, getPositionTank, acabar,enemiesDestroy, setEnemies) {
    const enemyWorker = new Worker("src/WebWorkers/enemyWorker.js", { type: 'module' });
  
    enemyWorker.onmessage = function(e) {
        const { action, enemies } = e.data;
        if (action === 'enemiesGenerated') {
            const enemiesInstances = generateEnemies(enemies.length, context, getPositionTank, acabar,enemies);
            setEnemies(enemiesInstances);
        }
    };



    enemyWorker.postMessage({ action: 'generateEnemies', data: { count: enemiesDestroy,canvasWidth,canvasH } }); 
    return enemyWorker;
}



function generateEnemies(count, context, getPositionTank, acabar,enemies) {
    let enemiesSend = [];
    let factoryEnemigos = new FactoryEnemigos();

    enemiesSend = factoryEnemigos.createEnemies(context,enemies,acabar,getPositionTank);
   

    return enemiesSend;
}



export function verifyDestroyEnemy(enemies, tanque, destroyEnemies) {
    enemies.forEach(enemy => {
        enemy.checkCollision(tanque.proyectiles);
    
    });

   
    enemies = enemies.filter(enemy => {
        if (enemy.enemyDestroy) {
            enemy.plus()
            destroyEnemies();
            console.log("Enemigo destruido");
            return false;
        }
       
        return true;
    });

    return enemies;
}