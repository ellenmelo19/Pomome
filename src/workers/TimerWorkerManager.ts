let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
    private worker: Worker;

    private constructor() {
        this.worker = new Worker("/src/workers/timerWorker.js");
        
    }

    static getInstance() {
        if (!instance) {
            instance = new TimerWorkerManager();
        }
        return instance;
    }

    startTimer(secondsRemaining: number) {
        this.worker.postMessage({
            type: 'START',
            payload: { secondsRemaining }
        });
    }

    stopTimer() {
        this.worker.postMessage({ type: 'STOP' });
    }

    onmessage(cb: (event: MessageEvent) => void) {
        this.worker.onmessage = cb;
    }

    terminate() {
        this.stopTimer();
        this.worker.terminate();
        instance = null;
    }
}