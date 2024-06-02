// threads.js
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

class Thread {
  constructor(name) {
    this.name = name;
  }

  run(task) {
    if (typeof task === 'function') {
      const taskString = task.toString();
      const workerCode = `
        const { parentPort } = require('worker_threads');
        parentPort.on('message', async (taskString) => {
          const task = eval('(' + taskString + ')');
          const result = await task();
          parentPort.postMessage(result);
        });
      `;
      const worker = new Worker(workerCode, { eval: true });
      worker.postMessage(taskString);
      worker.on('message', (result) => {
        console.log(`Result from thread ${this.name}: `, result);
      });
      worker.on('error', (error) => {
        console.error(`Error from thread ${this.name}: `, error);
      });
      worker.on('exit', (code) => {
        if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
      });
    } else if (typeof task === 'string') {
      const worker = new Worker(task);
      worker.on('message', (result) => {
        console.log(`Result from thread ${this.name}: `, result);
      });
      worker.on('error', (error) => {
        console.error(`Error from thread ${this.name}: `, error);
      });
      worker.on('exit', (code) => {
        if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
      });
    } else {
      console.error('Task should be a function or a file path.');
    }
  }
}

module.exports = Thread;
