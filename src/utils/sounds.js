const sounds = {
    disparo: new Audio('resource/sounds/disparo.mp3'),
    okay: new Audio('resource/sounds/disparookay.mp3'),
    okay2: new Audio('resource/sounds/okay2.mp3'),
    yaha: new Audio('resource/sounds/YAHA.mp3'),
    galopeo: new Audio('resource/sounds/galopeo.mp3'),
};

export function playSound(name) {
    if (sounds[name]) {
        sounds[name].currentTime = 0; 
        sounds[name].play();
    } else {
        console.error(`No se encontró el sonido ${name}`);
    }
}

export function randonPlusGun() {
    const plusSound = [sounds["okay2"], sounds["okay"], sounds["yaha"]];
    const randomIndex = Math.floor(Math.random() * plusSound.length);
    const selectedSound = plusSound[randomIndex];

    selectedSound.currentTime = 0; 
    selectedSound.play();
}

export function stopSound(name) {
    if (sounds[name]) {
        sounds[name].pause();   
        sounds[name].currentTime = 0;
    } else {
        console.error(`No se encontró el sonido ${name}`);
    }
}
