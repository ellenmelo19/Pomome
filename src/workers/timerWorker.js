let intervalId = null;

self.onmessage = function (event) {
    const { type, payload } = event.data;
    
    if (type === 'STOP') {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log('Worker: timer parado');
        }
        return;
    }
    
    if (type === 'START') {
        const { secondsRemaining } = payload;
        
        console.log('Worker: iniciando timer com', secondsRemaining, 'segundos');
        
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }

        let counter = secondsRemaining;
        
        self.postMessage(counter);
        
        intervalId = setInterval(() => {
            counter--;
            self.postMessage(counter);
            
            if (counter <= 0) {
                clearInterval(intervalId);
                intervalId = null;
                console.log('Worker: timer completado');
            }
        }, 1000);
    }
};