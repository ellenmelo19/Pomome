import type { TaskStateModel } from "../models/TaskStateModel";

let instance: timerWorkerManager | null = null;

export class timerWorkerManager {
    private worker: Worker;

    private constructor() {
        this.worker = new Worker(new URL("./timerWorker.ts", import.meta.url));
    }

    static getInstance() {
        if (!instance) {
            instance = new timerWorkerManager();
        }
        return instance;
    }

    postMessage(message: TaskStateModel) {
        this.worker.postMessage(message);
    }

    onmessage(cb: (event: MessageEvent) => void) {
        this.worker.onmessage = cb;
    }

    terminate() {
        this.worker.terminate();
        instance = null;
    }

}