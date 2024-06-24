const Threads = require('./src/Compilers/js/Core/Process/Threads');
const Links = require('./src/Compilers/js/Core/State/Link');

async function Link() {
  // Test New Link
  const link = await Links.createLink('myLink');

  // Test Link To
  const myLink = await Links.getLink('myLink');

  // Test Set Link
  await myLink.set(12);

  // Test Get Link
  const linkValue = await myLink.get();
  console.log(linkValue);

  // Test Unlink
  await myLink.destroy();
}
Link();

// Test Create Thread
const thread = new Threads('myThread');

// Test Run Thread
const result = thread.run(() => {
  console.log('Running in thread');
  return 'Task completed';
});
console.log(result);
