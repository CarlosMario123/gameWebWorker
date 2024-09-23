

self.onmessage = function(e) {
    const { action,countEnemy} = e.data;
    let pathImage = "resource/fondo-cosmico.jpg"
    if (action === 'sendImage') {
        
        if (countEnemy > 33 && countEnemy < 70) {
            pathImage ="resource/desertico.png"
        }else if (countEnemy > 70 ) {
            pathImage = "resource/hellScene.jpg"
        }

        self.postMessage({
            action: 'imageScene',
            imgPath:pathImage})
    }
};
