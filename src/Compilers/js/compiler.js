const fs = require('fs');
const { processFunction } = require('./processFunction');
const path = require('path');
const os = require('os');

function compileToJs(code, outputType, fileName, config) {
  // Split the code into lines
  const lines = code.split('\n');
  let jsCode = '';

  let currentFunction = { name: '', params: [] };

  for (let line of lines) {
    line = line.trim();
    jsCode += processFunction(line, currentFunction);
  }

  const logData = {
    timestamp: new Date().toISOString(),
    action: outputType === 'Convert' ? 'Conversion' : 'Execution',
    codeFileName: fileName || 'output',
    language: 'JavaScript',
    config: config,
    result: '',
    error: '',
  };

  if (
    outputType === 'Convert' ||
    outputType === 'convert' ||
    outputType === '1'
  ) {
    if (!fileName) fileName = 'output'; // Default file name
    fs.writeFileSync(`${fileName}.${config.Format.toLowerCase()}`, jsCode);
    console.log(
      `JavaScript file generated: ${fileName}.${config.Format.toLowerCase()}`
    );
    logData.result = `JavaScript file generated: ${fileName}.${config.Format.toLowerCase()}`;
  } else {
    // Create a temporary file
    const tempFolder = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder);
    }
    const tempFilePath = path.join(tempFolder, 'temp.js');
    fs.writeFileSync(tempFilePath, jsCode);

    // Execute the temporary file
    const { exec } = require('child_process');
    exec(`node ${tempFilePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing code: ${error.message}`);
        logData.error = `Error executing code: ${error.message}`;
        logToFile(logData);
        return;
      }
      if (stderr) {
        console.error(`Error output: ${stderr}`);
        logData.error = `Error output: ${stderr}`;
        logToFile(logData);
        return;
      }
      console.log('Result:', stdout);
      logData.result = stdout;

      // Delete the temporary file
      fs.unlinkSync(tempFilePath);

      logToFile(logData);
    });
  }
}

function logToFile(data) {
  const logFolder = path.join(__dirname, 'log');
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
  }
  const logFilePath = path.join(logFolder, 'log.json');
  const logEntry = JSON.stringify(data, null, 2);
  fs.appendFileSync(logFilePath, logEntry + os.EOL);
}

module.exports = { compileToJs };
