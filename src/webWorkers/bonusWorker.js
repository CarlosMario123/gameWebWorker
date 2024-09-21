let intervalId = null;
let elapsedTime = 0;
let boss = false;

self.onmessage = function(e) {
    const { action } = e.data;

    if (action === 'start') {
        startTimer();
    } else if (action === 'stop') {
        stopTimer();
    } else if (action === 'reset') {
        resetTimer();
    }
};

function startTimer() {
    if (intervalId) return; 

    intervalId = setInterval(() => {
        elapsedTime += 1;
        
      
        if (elapsedTime % 10 === 0) {
            boss = !boss;
            self.postMessage({ action: 'updateBoss', boss });
        }

       
        if (elapsedTime % 4 === 0) {
            self.postMessage({ action: 'resetTimer' });
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetTimer() {
    elapsedTime = 0;
    self.postMessage({ action: 'updateBoss', boss });
}
