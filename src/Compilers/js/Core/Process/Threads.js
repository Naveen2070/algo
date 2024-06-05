// threads.js
const { Worker } = require('worker_threads');

class Thread {
  constructor(name) {
    this.name = name;
  }

  run(task) {
    return new Promise((resolve, reject) => {
      if (typeof task === 'function') {
        const taskString = task.toString();
        const workerCode = `
          const { parentPort } = require('worker_threads');
          parentPort.on('message', async (taskString) => {
            const task = eval('(' + taskString + ')');
            try {
              const result = await task();
              parentPort.postMessage({ result });
            } catch (error) {
              parentPort.postMessage({ error: error.message });
            }
          });
        `;
        const worker = new Worker(workerCode, { eval: true });
        worker.postMessage(taskString);
        worker.on('message', ({ result, error }) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        });
        worker.on('error', (error) => {
          reject(new Error(`Error from thread ${this.name}: ${error.message}`));
        });
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
      } else if (typeof task === 'string') {
        const worker = new Worker(task);
        worker.on('message', ({ result, error }) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        });
        worker.on('error', (error) => {
          reject(new Error(`Error from thread ${this.name}: ${error.message}`));
        });
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
      } else {
        reject(new Error('Task should be a function or a file path.'));
      }
    });
  }
}

module.exports = Thread;
