const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

if (!isMainThread) {
  const { taskString } = workerData;

  const task = eval(`(${taskString})`);

  Promise.resolve(task())
    .then((result) => {
      parentPort.postMessage({ result });
    })
    .catch((error) => {
      parentPort.postMessage({ error: error.message });
    });
} else {
  class Thread {
    constructor(name) {
      this.name = name;
      this.worker = null;
      this.paused = false;
    }

    run(task) {
      return new Promise((resolve, reject) => {
        if (typeof task === 'function') {
          const taskString = task.toString();
          this.worker = new Worker(__filename, {
            workerData: { taskString },
          });

          this.worker.on('message', ({ result, error }) => {
            if (error) {
              reject(new Error(error));
            } else {
              resolve(result);
            }
          });

          this.worker.on('error', (error) => {
            reject(
              new Error(`Error from thread ${this.name}: ${error.message}`)
            );
          });

          this.worker.on('exit', (code) => {
            if (code !== 0) {
              reject(new Error(`Worker stopped with exit code ${code}`));
            }
          });
        } else {
          reject(new Error('Task should be a function.'));
        }
      });
    }

    pause() {
      return new Promise((resolve, reject) => {
        if (!this.worker) {
          reject(new Error('Thread worker not initialized.'));
          return;
        }
        if (this.paused) {
          resolve();
          return;
        }
        this.worker.postMessage({ action: 'pause' });
        this.paused = true;
        resolve();
      });
    }

    resume() {
      return new Promise((resolve, reject) => {
        if (!this.worker) {
          reject(new Error('Thread worker not initialized.'));
          return;
        }
        if (!this.paused) {
          resolve();
          return;
        }
        this.worker.postMessage({ action: 'resume' });
        this.paused = false;
        resolve();
      });
    }
  }

  module.exports = Thread;
}
