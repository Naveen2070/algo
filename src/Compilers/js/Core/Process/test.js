// Example usage in an ALG file
const Thread = require('./Threads');

const newThread = new Thread('MyThread');
newThread
  .run(() => {
    // Your function code here
    return 'This is running in a separate thread';
  })
  .then((result) => {
    console.log('Result from thread:', result);
  })
  .catch((error) => {
    console.error('Error from thread:', error.message);
  });

// Or run a file
newThread
  .run('./path/to/your/file.js')
  .then((result) => {
    console.log('Result from thread:', result);
  })
  .catch((error) => {
    console.error('Error from thread:', error.message);
  });
