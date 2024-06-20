const { Worker } = require('worker_threads');

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
        const workerCode = `
          const { parentPort } = require('worker_threads');
          let paused = false;
          parentPort.on('message', async (data) => {
            const { taskString, action } = data;
            if (action === 'pause') {
              paused = true;
            } else if (action === 'resume') {
              paused = false;
            } else if (action === 'execute') {
              const task = eval('(' + taskString + ')');
              try {
                const result = await task();
                parentPort.postMessage({ result });
              } catch (error) {
                parentPort.postMessage({ error: error.message });
              }
            }
          });
        `;
        this.worker = new Worker(workerCode, { eval: true });
        this.worker.on('message', ({ result, error }) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        });
        this.worker.on('error', (error) => {
          reject(new Error(`Error from thread ${this.name}: ${error.message}`));
        });
        this.worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });

        // Start executing the task
        this.executeTask(taskString);
      } else if (typeof task === 'string') {
        this.worker = new Worker(task);
        this.worker.on('message', ({ result, error }) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        });
        this.worker.on('error', (error) => {
          reject(new Error(`Error from thread ${this.name}: ${error.message}`));
        });
        this.worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
      } else {
        reject(new Error('Task should be a function or a file path.'));
      }
    });
  }

  executeTask(taskString) {
    this.worker.postMessage({ taskString, action: 'execute' });
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
