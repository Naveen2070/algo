const fs = require('fs');
const { processFunction } = require('./keywordChecker');

function compile(code, outputType) {
  // Split the code into lines
  const lines = code.split('\n');
  let jsCode = '';

  let currentFunction = { name: '', params: [] };

  for (let line of lines) {
    line = line.trim();
    jsCode += processFunction(line, currentFunction);
  }

  if (outputType === 'js' || outputType === '1') {
    fs.writeFileSync('output.js', jsCode);
    console.log('JavaScript file generated: output.js');
  } else {
    const func = new Function(jsCode);
    const result = func();
  }
}

module.exports = { compile };
