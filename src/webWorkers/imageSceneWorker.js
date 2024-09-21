

self.onmessage = function(e) {
    const { action,countEnemy} = e.data;
    let pathImage = "resource/fondo-cosmico.jpg"
    if (action === 'sendImage') {
        
        if (countEnemy > 33 && countEnemy < 66) {
            pathImage ="resource/desertico.png"
        }

        self.postMessage({
            action: 'imageScene',
            imgPath:pathImage})
    }
};
