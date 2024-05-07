const fs = require('fs');
const readline = require('readline');
const { compile } = require('./compiler');

// Check command line arguments
const [, , fileName] = process.argv;

if (!fileName) {
  console.log('Usage: algo filename.alg');
  process.exit(1);
}

// Read the file
fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Prompt user for output type
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    'Select output type (js/1 for js file/output/2 for output): ',
    (outputType) => {
      if (!['js', 'output', '1', '2'].includes(outputType)) {
        console.log(
          'Invalid output type. Please choose either "js" or "output".'
        );
        rl.close();
        return;
      }

      compile(data, outputType);
      rl.close();
    }
  );
});
