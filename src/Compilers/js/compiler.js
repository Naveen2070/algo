const fs = require('fs');
const { processFunction } = require('./processFunction');

function compileToJs(code, outputType, fileName, config) {
  // Split the code into lines
  const lines = code.split('\n');
  let jsCode = '';

  let currentFunction = { name: '', params: [] };

  for (let line of lines) {
    line = line.trim();
    jsCode += processFunction(line, currentFunction);
  }

  if (outputType === 'js' || outputType === '1') {
    if (!fileName) fileName = 'output'; // Default file name
    fs.writeFileSync(`${fileName}.${config.Language.toLowerCase()}`, jsCode);
    console.log(
      `JavaScript file generated: ${fileName}.${config.Language.toLowerCase()}`
    );
  } else {
    const func = new Function(jsCode);
    const result = func();
  }
}

module.exports = { compileToJs };
