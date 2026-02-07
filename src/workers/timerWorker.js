self.onmessage = function (event) {
    self.postMessage('Olá do timerWorker!');

    switch (event.data) {
        case 'Oi':
            self.postMessage('Oi recebido!');
            break;
        default:
            self.postMessage('Mensagem desconhecida: ' + event.data);
    }
}